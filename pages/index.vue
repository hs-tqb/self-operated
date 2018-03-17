<style lang="less">
  @import url(~assets/css/variable.less);
  #dialog-cities {
    @gap-s:5px;
    @gap-n:15px;
    @gap-outer:20px;
    .outer-wrapper {
      position:relative;
      // height:calc(~"100vh - 20px * 2");
      height:100%;
      overflow:hidden;
    }
    .inner-wrapper {
      position:relative;
      background-color:#fff;
      padding:25px 0;
      height:100%;
      .scroll;
    }
    h3 { padding:0 @gap-n; line-height:26px; background-color:@color-border-lighter; }
    #hot-cities {
      ul { 
        .flow(row,wrap); padding:@gap-s 0; 
        // border-bottom:1px solid @color-border-base;
        li { margin:@gap-s 7px; padding:@gap-s @gap-n; border-radius:@gap-n; border:1px solid @color-border-light; }
      }
    }
    #all-cities {
      .list { 
        padding:0 @gap-n; 
        li { 
          padding:@gap-n 0; 
          &:not(:last-child) { border-bottom:1px solid @color-border-base; }
        }
      }
    }
    #anchors { 
      position:absolute; right:0; top:50%; transform:translate3d(0,-50%,0);
      li {
        width:30px; height:30px; line-height:30px; text-align:center;
        font-size:12px; border-radius:15px;
        color:@color-text-secondary;
      }
    }
  }
  #page-home {
    h5 { margin-bottom:15px; font-size:12px; }
    .panel { margin:15px 20px 0 20px; padding:10px; }
    .large { font-size:26px; color:@color-text-primary; }
    .huge  { font-size:48px; color:@color-text-primary; }
    .text-center { text-align:center; }
    #options {
      margin-top:0; 
      padding:15px 0 0 0;
      a { 
        display:inline-block;
        margin-bottom:15px; 
        min-height:26px; line-height:26px; 
        .border(bottom);
        span {
          position:relative; .large; 
          input { 
            // -webkit-appearance:none; border:0 none; outline:0 none; 
            position:absolute; top:0; left:0; width:100%; height:100%; opacity:0;
          }
        }
      }
    }
    #payout {
      padding:10px; .border(around);
      #condition { 
        .flow; 
        li { .flex(1); }
      }
      .explain { margin-top:10px; line-height:1.4; }
    }
    #cart {
      padding:10px; .border(around);
      ul { .flow; }
      li { 
        .flex(1);
        p, div { height:40px; line-height:40px; }
        input { 
          height:40px; .text-center;
          &[type=text] { width:70px; -webkit-appearance:none; outline:0 none; .border(around); }
        }
      }
      .input {
        .relative; .flow(column); margin-top:20px;
        input[type=text] { width:100%; height:40px; .border(bottom); border-radius:0; }
        .coupon { 
          .relative; .bgc(red);
          &::after { position:absolute; right:0; top:0; content:'输入验证码' }
        }
        .button { position:absolute; right:0; top:0; height:40px; }
      }
      .number-wrapper {
        // .flow;
        .button { min-width:auto; width:40px; }
      }
    }
    #coupon { 
      // margin-top:0; padding-top:0; 
      margin:0; padding:0;
      p { text-align:right; }
      a { display:inline-block; padding:15px 20px; }
      .input-wrapper { 
        margin:0 20px 20px; 
        input { width:100%; height:30px; .border(bottom); }
      }
    }
    #btn-wrapper {
      margin-top:0; padding:0;
    }
  }
</style>
<template>
  <div id="page-home" @click="eventTest" v-if="ready">
    <div id="options" class="panel">
      <a href="javascript:void(0)" class="large">{{safeguard.city.name}}</a>
      <h5>保障时间</h5>
      <!-- <a href="javascript:void(0)">{{safeguard.date.from}} > {{safeguard.date.to}}</a> -->
      <a href="javascritp:void(0)">
        <span class="large">
          {{computedDateFrom}}
          <input type="date" v-model="safeguard.date.from" @change="eventTest">
        </span> > 
        <span class="large">
          {{computedDateTo}}
          <input type="date" v-model="safeguard.date.to">
        </span>
      </a>
    </div>
    <div id="payout" class="panel">
      <ul id="condition">
        <li class="text-center">
          <h5>保障金（元）</h5>
          <p><span class="huge">{{safeguard.price*safeguard.quantity}}</span> 元</p>
        </li>
        <li class="text-center">
          <h5>降水量触发条件</h5>
          <p> <span class="huge">{{totalAmount}}</span> mm</p>
        </li>
      </ul>
      <p class="explain">如果北京保障日期内，任意当日累计降水量大于15 mm，则赔付现金红包{{safeguard.price*safeguard.quantity}}元</p>
    </div>
    <div id="cart" class="panel">
      <ul>
        <li class="text-center">
          <h5>单价</h5>
          <p> <span class="large">{{safeguard.price}}</span>元 </p>
        </li>
        <li class="text-center">
          <h5>份数</h5>
          <div class="number-wrapper">
            <input type="button" class="button" value="-" @click="safeguard.quantity>1&&(safeguard.quantity-=1)"/>
            <input type="text" min="1" :value="safeguard.quantity" @change="quantityChange"/>
            <input type="button" class="button" value="+" @click="safeguard.quantity+=1"/>
          </div>
        </li>
      </ul>
      <div class="input">
        <input type="text" placeholder="您的手机号" v-model.trim="safeguard.mobile" />
        <input type="text" placeholder="验证码" v-model.trim="safeguard.vfCode" />
        <input type="text" class="coupon" placeholder="优惠码" v-model.trim="coupon.code" />
        <input type="button" 
          class="button text primary" 
          :disabled="vfCode.disabled" 
          :value="vfCode.text"
          @click="sendSMSVFCode"
        >
      </div>
    </div>
    <div id="coupon" class="panel">
        {{coupon.state}}, {{coupon.text[coupon.state]}}
      <p>
        <a 
          href="javascript:void(0)" :class="`text-${coupon.state}`" 
          @click.stop="coupon.collapsed=!coupon.collapsed">
          {{ coupon.collapsed? coupon.text.init: coupon.code+coupon.text[coupon.state]+(coupon.value||'') }}
        </a>
      </p>
      <div class="input-wrapper" v-if="!coupon.collapsed">
        <input type="text" @input="couponInput">
      </div>
    </div>
    <div id="btn-wrapper" class="panel">
      <input type="button" class="button block" :value="`支付${totalAmount}`">
    </div>

    <div id="dialog-cities" class="dialog-container" :class="citySelectorDialog.show?'show':''">
      <div class="outer-wrapper">
        <div class="inner-wrapper">
          <div id="hot-cities">
            <h3>热门城市</h3>
            <ul class="list">
              <li v-for="(c,i) in hotCities" :key="`hc${i}`" @click.stop="selectCity(c.cityId)">
                {{c.cityName}}
              </li>
            </ul>
          </div>
          <div id="all-cities">
            <template v-for="(s,i) in cities">
              <h3 :ref="`letter-${s.letter}`" :key="`act${i}`">{{s.letter}}</h3>
              <ul class="list" :key="`acl${i}`">
                <li v-for="(c,j) in s.data" :key="`acc${j}`" @click.stop="selectCity(c.id)">
                  {{c.name}}
                </li>
              </ul>
            </template>
          </div>
        </div>
        <ul id="anchors">
          <li v-for="(s,i) in cities" 
            @click="scrollToAnchor(s.letter)"
            :key="`aca${i}`"
          >{{s.letter}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import pinyinUtil from '../static/js/pinyinUtil.js'
export default {
  data () {
    return {
      ready    :true,
      cities   :[],
      hotCities:[],
      safeguard: {
        city: {
          name:'北京',
          id:''
        },
        date: {
          from:'2017-08-03',
          to:'2017-08-29',
        },
        price:20,
        quantity:1,
        mobile:'',
        vfCode:'',
      },
      orderInfo: {
      },
      vfCode: {
        disabled:false,
        text :'发送验证码',
        time :60,
        timer:-1,
      },
      coupon: {
        value:0,
        code:'',
        state:'empty',
        collapsed:true,
        delay:500,
        text: {
          'init' :'我有优惠码',
          'empty':'优惠金额将在支付时直接抵扣',
          'success':'，优惠码金额 ￥',
          'failure':'，优惠码无效'
        }
      },
      // 选择器
      citySelectorDialog: {
        show:false,
        city:{}
      }
    }
  },
  computed: {
    computedDateFrom() {
      // console.log( new Date(this.safeguard.date.from) );
      return this.parseDateToString(new Date(this.safeguard.date.from));
    },
    computedDateTo() {
      return this.parseDateToString(new Date(this.safeguard.date.to));
    },
    computedQuantity() {

    },
    computedPrice() {

    },
    // 
    totalAmount() {
      return this.safeguard.price * this.safeguard.quantity;
    },
  },
  methods: {
    getFirstLetter (word) {
      return pinyinUtil.getFirstLetter(word)
    },
    eventTest(e) {
      // this.$store.commit('showMessageDialog', {text:'sdf'})
      this.citySelectorDialog.show = true;
      // console.log(e.target.value)
    },
    parseDateToString(date) {
      let year=date.getFullYear(), month=date.getMonth()+1, day=date.getDate();
      return `${year}-${month>9?month:'0'+month}-${day>9?day:'0'+day}`
    },
    quantityChange(e) {
      let value = +e.target.value.trim();
      if ( isNaN(value) || value<1 ) {
        e.target.value = this.safeguard.quantity;
        if ( value<1 ) {
          this.$store.commit('showMessageDialog', {text:'份数最小为：1'})
        }
        return;
      }
      e.target.value = value;
      this.safeguard.quantity = value
    },
    sendSMSVFCode() {
      let mobile = this.safeguard.mobile
      // 验证手机号
      if ( !/^1\d{10}$/.test(mobile) ) {
        return this.$store.commit('showMessageDialog', {text:'手机号无效'});
      }
      // 重新发送倒计时
      this.vfCode.disabled = true;
      this.vfCode.text = (this.vfCode.time--)+'s后重新发送';
      this.vfCode.timer = setInterval(()=>{
        this.vfCode.text = (this.vfCode.time--)+'s后重新发送';
        if ( this.vfCode.time === 0 ) {
          this.resetVfCodeSetting();
          clearInterval( this.vfCode.timer );
        }
      }, 1000);

      // 发送验证码
      this.$http.post('getSMSVFCode', {mobile})
      .then(resp=>{
        if ( resp.state!==1 ) throw resp.message;
      })
      .catch(err=>{
        this.$store.commit('showMessageDialog', {text:err})
        this.resetVfCodeSetting();
      })
    },
    resetVfCodeSetting() {
      console.log('zzz');
      this.vfCode.time = 60;
      this.vfCode.disabled = false;
      this.vfCode.text = '发送验证码';
    },
    couponInput(e) {
      // console.log( this.coupon.code )
      let target = e.target,
          coupon = this.coupon;
      if ( !target.value.trim() ) {
        coupon.code  = '';
        coupon.state = 'empty';
        return;
      }
      clearTimeout(coupon.timer);
      coupon.timer = setTimeout(()=>{
        coupon.code = target.value;
        this.$http.post('checkCouponCode', { 
          mobile:this.safeguard.mobile, 
          coupons:coupon.code, 
          productId:10012
        })
        .then(resp=>{
          if ( resp.state!==1 ) return this.$store.commit('showMessageDialog', {text:resp.message})
          coupon.state = resp.data.discountAmount? 'success': 'failure';
          coupon.value = resp.data.discountAmount? (resp.data.discountAmount/100).toFixed(2): 0;
        })
      }, coupon.delay)
    },
    // 订单相关
    getContract() {
      this.$http.post('getContract', {})
      .then(resp=>{
        if ( resp.state !== 1 ) return this.$store.commit('showMessageDialog', {text:resp.message})
        this.orderInfo = resp.data;
        console.log( this.orderInfo )
      })
    },
    // 城市相关
    selectCity (name) {
      // city.name||city.cityName; city.id||city.cityId;
      this.citySelectorDialog.show = false;
      console.log(name)
    },
    scrollToAnchor (name) {
      this.$refs['letter-'+name][0].scrollIntoView()
    },
    loadCityData() {
      // Promise.all([
      //   this.$http.post('getHotCities'),
      //   this.$http.post('getCities')
      // ])
      // .then(resps => {
          let resps = [{"state":1,"message":null,"data":{"list":[{"cityId":"t2101","cityName":"雅虎"},{"cityId":"t2102","cityName":"网景"},{"cityId":"CN54511","cityName":"北京"},{"cityId":"CN54512","cityName":"深圳"},{"cityId":"JA47771","cityName":"冲绳"},{"cityId":"TW59554","cityName":"台北"},{"cityId":"TW58968","cityName":"高雄"},{"cityId":"MY48647","cityName":"吉隆坡"},{"cityId":"JA47671","cityName":"东京"},{"cityId":"HK45007","cityName":"香港"},{"cityId":"JA47412","cityName":"大阪"},{"cityId":"JA47855","cityName":"北海道"},{"cityId":"TW46746","cityName":"基隆"},{"cityId":"TW59358","cityName":"金门"}]},"serverTime":1521099197552},{"state":1,"message":null,"data":{"areaList":[{"id":"1000","name":"新马泰","children":[{"id":"1100","name":"泰国","children":[{"id":"1101","name":"曼谷","children":[]},{"id":"1102","name":"普吉岛","children":[]},{"id":"1103","name":"清迈","children":[]}]},{"id":"1200","name":"马来西亚","children":[{"id":"1201","name":"吉隆坡","children":[]},{"id":"1202","name":"马六甲","children":[]},{"id":"1203","name":"沙巴","children":[]},{"id":"1204","name":"第二行","children":[]},{"id":"1205","name":"好多字好多字好多字","children":[]}]}]},{"id":"t3000","name":"测试3","children":[{"id":"t3100","name":"城市组","children":[{"id":"t3101","name":"有id城市","children":[]},{"id":"","name":"无id城市","children":[]}]}]},{"id":"t1000","name":"测试1-没有数据的试试","children":[]},{"id":"t2000","name":"测试2-公司","children":[{"id":"t2100","name":"互联网那些没落的公司","children":[{"id":"t2101","name":"雅虎","children":[]},{"id":"t2102","name":"网景","children":[]},{"id":"t2103","name":"人人网","children":[]},{"id":"t2104","name":"开心网","children":[]}]},{"id":"t2200","name":"无数据城市组","children":[]},{"id":"t2300","name":"还有一组","children":[{"id":"t2301","name":"小城市一个","children":[]}]}]},{"id":"t4000","name":"测试4-占位","children":[{"id":"t4010","name":"占位组","children":[{"id":"t4011","name":"占位城市","children":[]}]},{"id":"t4020","name":"占位组","children":[{"id":"t4021","name":"占位城市","children":[]}]},{"id":"t4030","name":"占位组","children":[{"id":"t4031","name":"占位城市","children":[]}]},{"id":"t4040","name":"占位组","children":[{"id":"t4041","name":"占位城市","children":[]}]},{"id":"t4050","name":"占位组","children":[{"id":"t4051","name":"占位城市","children":[]}]},{"id":"t4060","name":"占位组","children":[{"id":"t4061","name":"占位城市","children":[]}]},{"id":"t4070","name":"占位组","children":[{"id":"t4071","name":"占位城市","children":[]}]},{"id":"t4080","name":"占位组","children":[{"id":"t4081","name":"占位城市","children":[]}]},{"id":"t4090","name":"占位组","children":[{"id":"t4091","name":"占位城市","children":[]}]},{"id":"t4100","name":"占位组","children":[{"id":"t4101","name":"占位城市","children":[]}]},{"id":"t4110","name":"占位组","children":[{"id":"t4111","name":"占位城市","children":[]}]},{"id":"t4120","name":"占位组","children":[{"id":"t4121","name":"占位城市","children":[]}]},{"id":"t4130","name":"占位组","children":[{"id":"t4131","name":"占位城市","children":[]}]}]}]},"serverTime":1521099197555}]
        // if ( resps.some(r=>r.state!==1) ) throw 'data error'
        this.hotCities = resps[0].data.list
        let allCities    = []
        let allCitiesMap = {}
        let letters      = ''
        let letter       = ''
        // 按首字母摘取
        resps[1].data.areaList.forEach((area)=> { // 区域
          (area.children || []).forEach(contry => { // 国家
            (contry.children || []).forEach(city => { // 城市
              letters = this.getFirstLetter(city.name)
              letter  = letters[0]
              city.firstLetter = letters
              allCitiesMap[letter] = allCitiesMap[letter] || {letter, data:[]},
              allCitiesMap[letter].data.push(city)
            })
          })
        })
        // 转成有序数组
        for( let key in allCitiesMap ) {
          allCities.push( allCitiesMap[key] )
        }
        // 外排序
        allCities.sort((c,n)=>c.letter.charCodeAt(0)-n.letter.charCodeAt(0));
        // 内排序
        allCities.forEach((s)=>{
          s.data.sort((c,n)=>{
            return c.firstLetter.split('').reduce((acc,c,idx)=>acc+c.charCodeAt(0)*Math.pow(10,-idx),0) - 
              n.firstLetter.split('').reduce((acc,c,idx)=>acc+c.charCodeAt(0)*Math.pow(10,-idx),0)
          })
        })
        this.cities = allCities;
      // })
      // .catch(err => {
        // console.log(err)
      // })
    },
  },
  created () {
    if ( typeof window === 'object' && typeof window.document === 'object' ) {
      // this.ready = true;
      // this.safeguard.city.name = '深圳';
    }
    this.loadCityData();
    this.getContract();
  }
}
</script>