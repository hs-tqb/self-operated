<style lang="less">
  @import url(~assets/css/variable.less);
  #comp-calendar {
    .bgc(#fff);
    .flex-dir-row { .flow(row); }
    .flex-1 { .flex(1); }
    .cal-month { background:#fff; }
    .cal-month-title { 
      line-height:60px; background:#fff; 
    }
    // .cal-week { height:107px; }
    .cal-week-title { line-height:56px; text-align:center; border-bottom:2px solid #eee; }

    .cal-month { border-bottom:1px solid #eee; } 
    .cal-week-title,
    .cal-week { border-top:1px solid #eee; }
    .cal-day:not(:last-child) { border-right:1px solid #eee; }
    .cal-day.today  { color:#fd5e47; } 
    .cal-day.today,
    .cal-day.limit,
    .cal-day.prefix { background-color:#eee; }
    .cal-day.limit,
    .cal-day.prefix { color:#aaa; }

    .cal-day.incontinuous { background:pink; color:#fff; }

    .cal-day.suffix { background-color:#eee; } 

    .cal-day .text { line-height:57px; }
    .cal-day .city { padding:0 0px; line-height:22px; }

    /* 选择 */
    .cal-day.selected { background:#fd5e47; color:#fff; }


    /* 操作栏 */
    .cal-day { position:relative; }
    .operation-bar { position:absolute; left:-65px; top:-88px; z-index:100; width:241px;height:91px; }
    .operation-bar .operation-bar-bg { width:241px; height:73px; }
    .operation-bar .operation-bar-arrow { margin:0 auto; width:27px; height:18px; }
    .operation-bar .btns { position:absolute; top:0; left:0; width:100%; line-height:73px; color:#fff; }
    .cal-day:first-child .operation-bar { left:0; }
    .cal-day:last-child  .operation-bar { left:auto; right:0; }
    .cal-day:first-child .operation-bar .operation-bar-arrow { margin-left:40px; }
    .cal-day:last-child .operation-bar  .operation-bar-arrow { margin-left:175px; }



    /*  小贴士  */
    /* .cal-month:last-child { padding-bottom:60px; } */
    #tips { position:relative; z-index:10; line-height:40px; background:#fff; border-top:2px solid #eee; }

    #content { height:calc(100vh - 100px); .scroll; }
  }
</style>

<template>
  <div id="comp-calendar" class="comp-container">
    <div class="cal-week-title flex-dir-row" >
      <span
        v-for="(d,i) in ['一','二','三','四','五','六','日']" 
        class="flex-1" 
        :class="i>=5?'text-danger':''"  
        :key="`wt${i}`"
      >{{d}}</span>
    </div>
    <div id="content">
      <!--  -->
      <div class="cal-month-list" v-for="(month,mi) in monthList" :key="`m${mi}`">
        <div class="cal-month-title text-danger text-l text-center">
          <span>{{month.date.year}} 年 {{month.date.month<10?'0':''}}{{month.date.month+1}} 月</span>
        </div>
        <div class="cal-month text-center">
          <div
            class="cal-week flex-dir-row"
            v-for="(week,wi) in month.data"
            :key="`w${wi}`"
          >
            <div 
              class="cal-day flex-1"
              :class="[day.type, day.selected?'selected':(day.incontinuous?'incontinuous':'')]" 
              v-for="(day,di) in week" :key="`d${di}`"
              :data-year="day.year" :date-month="day.month" :date-day="day.day" 
              :data-selectable="day.selectable"
              :data-idxs="`[${mi},${wi},${di}]`"
              @click="selectDay"
            > 
              <span class="text text-l">{{day.day||''}}</span>
              <span class="city text-s">{{day.city?day.city.cityName:''}}</span>
            </div>  
          </div>
        </div>
      </div>
    </div>
    <div id="tips" class="text-center text-danger">
      <span v-if="showTips==='discontinuity'">旅游计划必须日期连续哦</span>
      <span v-else-if="showTips==='default'">旅游计划至少 3 天</span>
      <span v-else="showTips==='valid'">{{orderDateStart}} 至 {{orderDateEnd}}, 共{{orderDateCount}}天行程</span>
    </div>
  </div>
</template>

<script>
export default {
  props:['app'],
  data() {
    return {
      today      : null,
      monthOnShow: 3,                       // 显示几个月份
      monthList  : [],

      showTips  : 'default',                // 下单操作的小贴士, 值为: default/discontinuity/valid, 对应 默认/选择不连续/有效 状态的不同文案提示
      orderable : false,                    // 是否可下单

      orderDateStart:'',
      orderDateEnd  :'',
      orderDateCount:0,
      orderCityCount:0,

      hasReadGuide:true,

      selections     : null,
      selectedDay    : null,
      selectedDayIdxs: null,
    }
  },
  methods: {
    /**
     * 内部 属性 和 函数
     * tips: 月份和星期从0开始
     */
    // 获取月份列表数据
    getMonthList(date, len) {
      let list = [];
      
      for (let i=0; i<len; i++) {
        list.push({
          date: { year:date.getFullYear(), month:date.getMonth(), day:date.getDate() }, 
          data: this.getDayList(date)
        });
        // 下一月的循环, 从一日开始算起
        date.setDate( 1 );
        date.setMonth( date.getMonth()+1 );
      }
      
      return list;
    },
    // 获取日期列表数据
    getDayList(date) {
      
      let list = [];
      let year = date.getFullYear(), month = date.getMonth();
      for ( let i=date.getDate(); i<this.getMonthLastDay(date)+1; i++ ) {
        list.push( this.initDayObject(year, month, i, 'normal') );
      }

      // 如果是从周日开始
      let prefixLen = date.getDay();
      let suffixLen = 6 - this.getMonthLastWeekday(date);
      // 我们的需求是从周一开始, 所以前后补足的长度需要做个处理
      prefixLen = prefixLen === 0? 6: prefixLen-1;
      suffixLen = suffixLen === 6? 0: suffixLen+1;

      list = this.getDaysPrefix(date, prefixLen)
              .concat(list)
              .concat( this.getNextMonthDaysSuffix(date, suffixLen) );

      return list;
    },
    // 将月份按照星期进行再分组
    groupMonthByWeek(monthList) {
      var arrMonthList = [];
      var arrMonth;
      var arrWeek;
      monthList.forEach(month=>{
        arrMonth = [];
        month.data.forEach((day,i)=>{        
          if ( i % 7 === 0 ) {
            arrWeek = [];          
            arrMonth.push(arrWeek);
          }
          arrWeek.push(day);
        });
        arrMonthList.push({date:month.date, data:arrMonth})
      });
      return arrMonthList;
    },
    // 清除重复天数
    clearRepeatDays(monthList) {
      let currM = monthList[0],
          nextM = monthList[1];
      if ( currM.data.length < 8 ) {
        nextM.data.some((item,i)=>{
          return item.type==='prefix'? (item.day=''): true
        });
      } 
      return monthList;
    },
    // ( 从缓存 )恢复已选择城市
    restoreCitySelection(monthList) {
      let selectedDays = this.getSelectedDaysStorage();
      let selections   = [];
      selectedDays.forEach(d=>{
        monthList.filter(m=>{
          return m.date.year===d.year && m.date.month===d.month;
        }).forEach(m=>{
          m.data.some(d2=>{
            if ( d2.year===d.year && d2.month===d.month && d2.day===d.day ) {
              d2.city = d.city;
              d2.selected = true;
              selections.push( d2 );
              return true;
            }
          })
        });
      });
      this.selections = selections;
      return monthList;
    },
    // 获取月份最后一天的日期
    getMonthLastDay(date) {
      date = new Date(+date);
      date.setDate( 1 );
      date.setMonth( date.getMonth()+1 );
      date.setDate( 0 );
      return date.getDate();
    },
    // 获取月份最后一天的星期
    getMonthLastWeekday(date) {
      date = new Date(+date);
      date.setMonth(date.getMonth() + 1);
      date.setDate(0);
      return date.getDay();
    },
    // 补足前日期
    getDaysPrefix(date, len) {
      let arr = [];
      if ( date.getDate()-len > 1 ) {
        // 如果长度在本月范围内
        let year = date.getFullYear(), month = date.getMonth();
        for ( let i=0; i<len; ) {
          i++;
          arr.unshift( this.initDayObject(year, month, date.getDate()-i, 'prefix') );
        }
      } else {
        // 如果长度涉及上个月
        arr = this.getPrevMonthDaysPrefix(date, len);
      }
  
      return arr;
    },
    // 补足上月
    getPrevMonthDaysPrefix(date, len) {
      let arr = [];
      date = new Date( +date );
      date.setDate(0);
      let year = date.getFullYear(), month = date.getMonth();
      for (let i=len; i>0; i--) {
        arr.push( this.initDayObject(year, month, date.getDate()-i+1, 'prefix') );
      }
      return arr;
    },
    // 补足下月
    getNextMonthDaysSuffix(date, len) {
      let arr = [];
      date = new Date( +date );
      date.setMonth( date.getMonth()+1 );
      let year = date.getFullYear(), month = date.getMonth();
      for ( let i=0; i<len; i++ ) {
        arr.push( this.initDayObject(year, month, undefined, 'suffix' ) );
      }
      return arr;
    },
    // 统一的day对象处理, year 和 month 主要是为了做日期判定
    // type 有: today, prefix, suffix, limit(合理但受限的)
    initDayObject (year, month, day, type) {
      // 是否可选
      var selectable = true;

      // 做筛选
      let today  = this.today;
      let tYear  = today.getFullYear(),
          tMonth = today.getMonth(),
          tDay   = today.getDate();

      if ( type === 'normal' ) {
        // 对3日内做处理 ( 未来3日内不能选定 )
        let temp = +new Date(year, month, day);
        if ( 
          temp < (+today) + this.app.orderTimeLimitMin * 86400000   
          || temp >= (+today) + this.app.orderTimeLimitMax * 86400000
        ) {
          type = "limit";
          selectable = false;
        }
        // 对今日做处理
        if (year === tYear && month === tMonth && day === tDay ) {
          day  = '今日';
          type = 'today';
        } 
      } else {
        selectable = false;
      }
      return { year, month, day, type, selectable };
    },
    // 根据下标获取当前日期对象
    getDayObject(idxs) {
      return this.monthList[+idxs[0]]['data'][+idxs[1]][+idxs[2]];
    },
    // 检测是否同一天 ( 因为 setData 的时候所有对象会被替换, 所以不能用 === 做比较 )
    isSameDay(d1, d2) {
      return d1.year===d2.year 
          && d1.month===d2.month
          && d1.day === d2.day;
    },
    // 刷新数据
    refreshData(name) {
      // let obj = {};
      // obj[name] = this[name];
      // this.setData(obj);

    },
    refreshMonthList(idxs,obj) {
      this.monthList[idxs[0]].data[idxs[1]].splice( [idxs[2]],1, obj );
    },

    /**
     * 事件绑定
     */
    // 选定某一天
    selectDay(e) {
      let target  = e.currentTarget;

      // 如果不可选, 直接返回
      if ( target.getAttribute('data-selectable')!=='true' ) return;


      let prevDay = this.selectedDay,
          dayIdxs = JSON.parse(target.getAttribute('data-idxs')),
          dayObj  = this.getDayObject(dayIdxs);

      dayObj.selected = true;

      this.selectedDay = dayObj;
      this.selectedDayIdxs = dayIdxs;

      if ( this.selections.length === 1 ) {
        this.selections.push( dayObj );
        this.refreshMonthList(dayIdxs, dayObj);
      } else if ( this.selections.length > 1 ) {
        this.selections.forEach( s=>{
          s.selected = false;
        });
        dayObj.selected = true;
        this.refreshMonthList(dayIdxs, dayObj);
        this.selections = [dayObj];
      }
      this.makeContinuity();
      this.checkOrderable();
    },
    makeContinuity() {
      // console.log( this.selections );
      let selections    = [],
          selectionIdxs = [],
          data          =  this.monthList;

      data.forEach((m,mi)=>{
        m.data.forEach((w,wi)=>{
          w.forEach((d,di)=>{
            d.incontinuous = false;
            if ( d.selected ) {
              selections.push( d );
              selectionIdxs.push(`${mi}-${wi}-${di}`);
            }
          });
        })
      });
      
      if ( !selections.length ) return;

      let headMost = selections[0];
      let backMost = selections[selections.length-1];
      let headMostTime = + new Date(headMost.year, headMost.month, headMost.day);   // 获取毫秒值, 用于比较
      let backMostTime = + new Date(backMost.year, backMost.month, backMost.day);
      let dayTime      = 0;


      selections = [];
      data.forEach((m,mi)=>{
        m.data.forEach((w,wi)=>{
          w.forEach((d,di)=>{
            dayTime = new Date(d.year, d.month, d.day).getTime();
            if ( !d.selectable || d.selected || dayTime<headMostTime || dayTime>backMostTime ) return;
              selections.push( d );
              d.selected = true;
          })
        });
      });

      this.selections = (this.selections||[]).concat(selections);
      this.setSelectedDaysStorage( this.selections )

      return data;
    },
    checkOrderable2() {
      let selections = this.selections;
      // 如果天数不够
      if (selections.length < this.app.orderDaysLimitMin ) {
        this.showTips  = 'default';
        this.orderable = false;
      } 
      // 如果是有效(连续)选择
      else {
        this.showTips = 'valid';
        this.orderable = true;
        console.log('zzz');
        console.log( selections[0], selections[selections.length-1] )
        console.log('zzz');
        // this.orderDateStart =result.dates[0];
        // this.orderDateEnd = result.dates[ result.dates.length-1 ];
        // this.orderDateCount = result.dates.length;
      } 

      console.log( this.showTips, this.orderable );
    },
    // 更新选定城市
    updateSelect(e) {
      let dayObj = this.getDayObject( this.selectedDayIdxs );
      // dayObj.showOperationBar = false;
      // this.selectCity(this.selectedDay);
      // this.refreshData('monthList');
      this.refreshMonthList(this.selectedDayIdxs, dayObj);


      // 埋点
      // this.app.tdsdk.event({
      //   id: 'ChangePla'
      // });
    },
    // 检测订单的有效性
    checkOrderable(fromCache) {
      let monthList     = this.monthList;
      let selections    = [];
      let selectionIdxs = [];
      if ( fromCache ) {
        selections = this.getSelectedDaysStorage();
        selections.forEach(s=>{
          monthList.forEach((m,mi)=>{
            if ( m.date.year!==s.year || m.date.month!==s.month ) return;
            m.data.forEach((w,wi)=>{
              w.forEach((d,di)=>{
                if ( d.day === s.day ) {
                  selectionIdxs.push(`${mi}-${wi}-${di}`);
                }
              });
            })
          });
        });
      } else {
        monthList.forEach((m,mi)=>{
          m.data.forEach((w,wi)=>{
            w.forEach((d,di)=>{
              d.incontinuous = false;
              if ( d.selected ) {
                selections.push( d );
                selectionIdxs.push(`${mi}-${wi}-${di}`);
              }
            });
          })
        });
      }

      // 
      let data   = {};
      let result = null; 

      // 如果天数不够
      if (selections.length < this.app.orderDaysLimitMin ) {
        this.showTips  = 'default';
        this.orderable = false;
        this.monthList = this.markIncontinuousDays(selections);
      } 
      // 如果是有效(连续)选择
      else if ( result=this.checkSelectionContinuity(selections) ) {
        this.showTips = 'valid';
        this.orderable = true;
        this.orderDateStart =result.dates[0];
        this.orderDateEnd = result.dates[ result.dates.length-1 ];
        this.orderDateCount = result.dates.length;
        this.monthList = this.markIncontinuousDays(selections)
      } 
      // 如果不是有效(连续)选择, 则做相应提示
      else {
        this.showTips  = 'discontinuity';
        this.orderable = false;
        this.monthList = this.markIncontinuousDays(selections)
      }

      console.log('_________________是否可下单_______________')
      console.log(result);
      console.log('_________________是否可下单_______________')

      this.selections = selections;
      this.setSelectedDaysStorage(selections);
    },
    // 检查选择的连续性
    checkSelectionContinuity(selections) {
      let t  = selections[0],
          d1 = null,
          d2 = null,
          r  = {dates:[]},
          s  = 86400000;    // 一天的时间间隔(ms)

      if ( !selections.length ) return false;

      for (let i=0,len=selections.length-1; i<len; i++) {
        d1 = selections[i];
        d2 = selections[i+1];
        // r.cities.push( d1.city );
        r.dates.push( this.prefixZero(1+d1.month)+'-'+this.prefixZero(d1.day) );

        if ( new Date(d1.year,d1.month,d1.day).getTime() + s < new Date(d2.year,d2.month,d2.day).getTime() ) {
          return false;
        }
      }
      // r.cities.push(d2.city);
      r.dates.push(this.prefixZero(1+d2.month) + '-' + this.prefixZero(d2.day) );
      // r.cities = this.keepUniItem( r.cities , 'cityId');
      return r;
    },
    // 提示非连续性
    markIncontinuousDays(selections, data) {
      data = data || this.monthList;
      if ( !selections.length ) return data;
      let headMost = selections[0];
      let backMost = selections[selections.length-1];
      let headMostTime = + new Date(headMost.year, headMost.month, headMost.day);   // 获取毫秒值, 用于比较
      let backMostTime = + new Date(backMost.year, backMost.month, backMost.day);
      let dayTime      = 0;

      data.forEach((m,mi)=>{
        m.data.forEach((w,wi)=>{
          w.forEach((d,di)=>{
            dayTime = new Date(d.year, d.month, d.day).getTime();
            if ( !d.selectable || d.selected || dayTime<headMostTime || dayTime>backMostTime ) return;
            d.incontinuous = true;
          })
        });
      });

      return data;
    },
    // 列表去重
    keepUniItem(list,name) {
      let map = {};
      return true;
      return list.filter(item=>{
        if (map['_' + item.cityId] ) return false;
        map['_' + item.cityId] = true;
        return true;
      });
    },
    getRandomStr(len, str) {
      str = str || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
      let l = str.length, 
          r = [];
      for (let i=0; i<len; i++) {
        r.push( str[Math.floor(Math.random()*l)] )
      }
      return r.join('');
    },
    // 提交订单
    submitOrder(e) {
      // 如果是不可点击状态, 则不作处理
      // if ( !e.currentTarget.dataset.orderable ) return;
      if ( e.currentTarget.getAttribute('data-orderable')!=='true' ) return;
      
      
      let selections = this.selections || this.getSelectedDaysStorage();
      let times = [], cityIds = [];
      selections.forEach(item=>{
        times.push(`${item.year}-${this.prefixZero(item.month+1)}-${this.prefixZero(item.day)}`);
        cityIds.push( item.city.cityId );
      });

      // return wx.navigateTo({
      //   url: "../../detail/detail",
      // });

      // 点击下单则清空已选城市缓存
      // this.setSelectedDaysStorage(null);
    },
    // 补足0
    prefixZero(n) {
      return n>9?n:'0'+n;
    },
    // 储存已选城市的数据
    setSelectedDaysStorage(selections=[]) {
      // wx.setStorageSync("_selectedDays",selections)
      localStorage.setItem('_selectedDays', JSON.stringify(selections));
    },
    // 获取已选城市数据
    getSelectedDaysStorage() {
      let todayMs     = +this.today;
      let intervalMin = this.app.orderTimeLimitMin * 86400000;
      // let intervalMax = this.app.orderTimeLimitMax;
      let temp = null;
      // 过滤掉老的缓存, 老的缓存不涉及未来, 所以不做最大的对比
      return (JSON.parse(localStorage.getItem('_selectedDays')||'[]')).filter(d=>{
        return todayMs + intervalMin < new Date(d.year, d.month, d.day).getTime();
          // || todayMs + intervalMax > new Date(d.year, d.month, d.day).getTime();
      });
    },
  },
  created() {
    // this.app.calendarPage = this;
    let date  = new Date();
    date.setHours(0); // 置为0点

    this.today = new Date(+date); // 重新new一个对象, 确保 data 里的数据保持独立

    let monthList = this.getMonthList(date, this.monthOnShow);
    // 当月只剩最后一周的时候, 下月的前补足会把今日日期也给补上
    monthList = this.clearRepeatDays(monthList);
    // 恢复已选城市
    monthList = this.restoreCitySelection(monthList);
    // 因为用flex布局, 给月份内部再加一个周分组会更好处理
    monthList = this.groupMonthByWeek(monthList);

    this.monthList = monthList;
    
    // 检查是否可以下单
    // this.checkOrderable('fromCache', monthList);
    this.makeContinuity();
    this.checkOrderable2();
  }
}
</script>
