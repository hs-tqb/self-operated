<style lang="less">
  @import url(~assets/css/variable.less);
  @block-height:14.2857vw;
  #comp-calendar {
    .bgc(#fff);
    .flex-dir-row { .flow(row); }
    .flex-1 { .flex(1); }
    .cal-month { background:#fff; }
    .cal-month-title { 
      line-height:@block-height; background:#fff; 
      color:@color-text-primary;
    }
    // .cal-week { height:107px; }
    .cal-week-title { line-height:56px; text-align:center; border-bottom:2px solid #eee; color:@color-text-primary; }

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

    .cal-day .text { line-height:@block-height; }
    .cal-day .city { padding:0 0px; line-height:22px; }

    /* 选择 */
    .cal-day.selected { background:@color-primary; color:#fff; }


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
    #tips { position:relative; z-index:10; line-height:20px; font-size:12px; background:#fff; border-top:1px solid #eee; }
    .btn-wrapper { 
      line-height:40px; .bgc(#fff); 
      // .button { .radius(10px); }
      .button:disabled { background-color:@color-border-base; }
    }

    #content { height:calc(100vh - 120px); .scroll; }
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
        <div class="cal-month-title text-l text-center">
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
      <span v-if="showTips==='discontinuity'">保障计划必须日期连续哦</span>
      <span v-else-if="showTips==='empty'">保障计划至少 1 天</span>
      <template v-else-if="showTips==='valid'">
        <span v-if="orderDateCount===1">{{orderDateStart}}，共1天行程</span>
        <span v-else>
          {{orderDateStart}} 至 {{orderDateEnd}}, 共{{orderDateCount}}天行程
        </span>
      </template>
    </div>
    <div class="btn-wrapper">
      <input type="button" class="button block primary" :disabled="!orderable" value="确定" @click="confirmSelection">
    </div>
  </div>
</template>

<script>
export default {
  props:['config'],
  data() {
    return {
      today      : null,
      monthList  : [],

      showTips  : 'valid',                // 下单操作的小贴士, 值为: default/discontinuity/valid, 对应 默认/选择不连续/有效 状态的不同文案提示
      orderable : true,                    // 是否可下单

      orderDateStart:'',
      orderDateEnd  :'',
      orderDateCount:1,
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
        let temp = +new Date(year, month, day);
        if ( 
          temp < (+today) + (this.config.orderTimeLimitMin-1) * 86400000   
          || temp >= (+today) + this.config.orderTimeLimitMax * 86400000
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

      dayObj.selected = !dayObj.selected;

      this.selectedDay = dayObj;
      this.selectedDayIdxs = dayIdxs;
      this.refreshMonthList(dayIdxs, dayObj);

      this.selections = this.getSelections();

      if ( this.selections.length === 0 ) {
        this.showTips = 'empty';
        this.orderable = false;
      } else {
        if ( this.checkOrderable() ) {
          this.orderDateStart = this.getShortDate(this.selections[0]);
          this.orderDateEnd   = this.getShortDate(this.selections[this.selections.length-1]);
          this.orderDateCount = this.selections.length;
          this.showTips       = 'valid';
          this.orderable      = true;
        } else if (this.selections.length) {
          // this.showTips = 'discontinuity';
          // this.orderable = false;
          if ( dayObj.selected ) {
            this.makeContinuity();
            this.orderDateStart = this.getShortDate(this.selections[0]);
            this.orderDateEnd   = this.getShortDate(this.selections[this.selections.length-1]);
            this.orderDateCount = this.selections.length;
            this.showTips       = 'valid';
            this.orderable      = true;
          } else {
            this.showTips = 'discontinuity';
            this.orderable = false;
          }
        }
      }

    },
    getSelections() {
      let selections = [];
      this.monthList.forEach(month=>{
        month.data.forEach(week=>{
          week.forEach(day=>{
            if (day.selected === true) {
              selections.push(day);
            }
          })
        })
      });
      return selections;
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
    confirmSelection() {
      this.selections.sort((c,n)=>(c.year*1000+c.month*100+c.day)-(n.year*1000+n.month*100+n.day));
      this.$emit('dateChange', this.selections[0], this.selections[this.selections.length-1]);
    },
    checkOrderable() {
      // 对比毫秒数
      let selections = this.selections
      let dayMS   = 24 * 60 * 60 * 1000;
      let currDay = 0;
      let prevDay = (function(day) {
        return + new Date(day.year, day.month, day.day);
      } (selections[0]));
      if ( selections.every((day,i)=>{
        if ( i===0 ) return true;
        currDay = +new Date(day.year, day.month, day.day);
        if (currDay-prevDay === dayMS) {
          prevDay = currDay;
          return true;
        }
      }) ) {
        return true;
      }
    },
    checkOrderable2() {
      let selections = this.selections,
          result     = false;
      // 如果天数不够
      if (selections.length < this.config.orderDaysLimitMin ) {
        this.showTips  = 'default';
        this.orderable = false;
      } 
      // 如果是有效(连续)选择
      else {
        this.showTips = 'valid';
        this.orderable = true;
        this.selections.sort((c,n)=>(c.year*1000+c.month*100+c.day)-(n.year*1000+n.month*100+n.day));
        this.orderDateStart = this.getShortDate(this.selections[0]);
        this.orderDateEnd   = this.getShortDate(this.selections[this.selections.length-1]);
        this.orderDateCount = this.selections.length;
        
        result = true;
      } 

      return result;
    },
    getShortDate(d) {
      return (d.month+1>9?d.month+1:'0'+(d.month+1)) + '-' + 
        (d.day>9?d.day:'0'+d.day)
    },
    // 检测订单的有效性
    // 检查选择的连续性
    // 提示非连续性
    // 列表去重
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
      let intervalMin = (this.config.orderTimeLimitMin-1) * 86400000;
      // let intervalMax = this.config.orderTimeLimitMax;
      let temp = null;
      // 过滤掉老的缓存, 老的缓存不涉及未来, 所以不做最大的对比
      return (JSON.parse(localStorage.getItem('_selectedDays')||'[]')).filter(d=>{
        return todayMs + intervalMin < new Date(d.year, d.month, d.day).getTime();
          // || todayMs + intervalMax > new Date(d.year, d.month, d.day).getTime();
      });
    },
  },
  created() {
    // this.config.calendarPage = this;
    let date  = new Date();
    date.setHours(0); // 置为0点

    this.today = new Date(+date); // 重新new一个对象, 确保 data 里的数据保持独立

    let monthList = this.getMonthList(date, this.config.monthOnShow);
    // 当月只剩最后一周的时候, 下月的前补足会把今日日期也给补上
    // monthList = this.clearRepeatDays(monthList);
    // 恢复已选城市
    // monthList = this.restoreCitySelection(monthList);
    let {dateFrom, dateTo} = this.config;
    let d1 = this.initDayObject(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate(), 'normal');
    let d2 = this.initDayObject(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate(), 'normal');
    let selections = [];


    monthList.forEach(m=>{
      if ( 
        (m.date.year!==d1.year||m.date.month!==d1.month) && 
        (m.date.year!==d2.year||m.date.month!==d2.month)
      ) return;
      m.data.forEach(d=>{
        if ( d.type==='normal' && (d.day===d1.day||d.day===d2.day) ) {
          d.selected = true;
          selections.push( d );
        }
      })
    })
    
    this.orderDateStart = this.getShortDate(selections[0]);
    this.orderDateEnd   = this.getShortDate(selections[selections.length-1]);
    this.orderDateCount = selections.length;
    this.selections     = selections;

    
    // 因为用flex布局, 给月份内部再加一个周分组会更好处理
    monthList = this.groupMonthByWeek(monthList);

    this.monthList = monthList;
    
    // 检查是否可以下单
    // this.checkOrderable('fromCache', monthList);
    // this.makeContinuity();
    // this.checkOrderable2();
  }
}
</script>
