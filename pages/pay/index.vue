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
      background-color:#fff;
      overflow:hidden;
      .fixedAnchor { 
        position:fixed; top:50px; left:0; z-index:10; width:100%; opacity:0;
        &.show { opacity:1; }
      }
    }
    .inner-wrapper {
      position:relative;
      background-color:#fff;
      .scroll;
      height:calc(100% - 50px);
      padding-bottom:25px;
      // &.list-wrapper {
      //   padding:25px 0;
      // }
    }
    h3 { padding:0 @gap-n; line-height:26px; background-color:@color-border-lighter; }
    #city-search-box {
      padding:10px 15px; 
      input { width:100%; .commonInput(); height:30px; }
    }
    #hot-cities {
      ul { 
        .flow(row,wrap); justify-content:center; padding:@gap-s 0; 
        // border-bottom:1px solid @color-border-base;
        li { margin:3px 5px; padding:@gap-s @gap-n; border-radius:@gap-n; border:1px solid @color-border-light; }
      }
    }
    .search-wrapper,
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
      position:absolute; right:0; top:50%; z-index:20; 
      max-height:90%; transform:translate3d(0,-50%,0);
      .flow(column);
      li {
        padding-left:20px; width:42px; line-height:22px; text-align:center;
        font-size:12px; border-radius:15px;
        color:@color-text-secondary;
      }
    }
  }
  #dialog-payment {
    .outer-wrapper { position:absolute; left:0; bottom:0; width:100%; .bgc(#fff); transform:translate3d(0,100%,0); transition-duration:300ms; }
    &.show .outer-wrapper { transform:translate3d(0,0,0); }
    h3 { line-height:44px; font-size:16px; text-align:center; .border(bottom); }
    ul { padding:10px 20px; padding-bottom:0; }
    li { 
      line-height:26px;
      label { display:inline-block; width:100px; }
    }
    .btn-wrapper { 
      margin:15px 20px; 
      .button { .radius(); }
    }
  }
  #dialog-paymentResult {
    background-color:@color-primary;
    img.border { display:block; width:100%; }
    .outer-wrapper { height:100%; padding:30px; }
    .inner-wrapper { 
      .panel { margin:0; } .scroll;
      height:100%; 
      // max-height:100%;
      background-color:#fff; .radius(); 
      h3 { font-size:15px; line-height:1.3; }
      img + h3 { margin-top:10px; }
      .tips { margin-top:10px; padding-top:15px; font-size:12px; line-height:1.4; text-align:justify; .border(top); }
      .info {
        h3 { 
          @c:#689eff;
          .flow; align-items:center;
          .border { 
            position:relative; flex:1; height:1px; background-color:@c; 
            &::after { position:absolute; top:-1px; width:3px; height:3px; .radius(); content:'\200b'; background-color:@c; }
            &:first-child::after { right:0; }
            &:last-child::after { left:0; }
          }
          .text { margin:0 12px; color:@c; }
        }
        ul { margin-top:12px; .border(around); }
        li { 
          line-height:30px; font-size:12px;
          &:not(:last-child) {.border(bottom);} 
          label { display:inline-block; margin-right:12px; width:100px; text-indent:20px; background-color:#f5f5f5; .border(right); }
        }
        .btn-wrapper {
          margin:15px; margin-bottom:0;
          .button { .radius(); }
        }
      }
    }
  }
  @bgc:#fefefe;
  .radius() { border-radius:6px; }
  .inputGap() { padding:0 10px; }
  .commonInput() { height:40px; .inputGap(); .border(around); .radius(); }
  #page-home {
    background:@bgc url(~assets/img/banner/bg1.jpg) no-repeat center 0;
    background-size:100% auto;
    h5 { margin-bottom:15px; font-size:12px; }
    h4 { margin-bottom:15px; font-size:14px; }
    .panel { 
      margin:15px 20px 0 20px; padding:15px; 
      &.card { 
        background-color:@bgc; border-radius:7px; 
        box-shadow:0 0 25px 1px #ddd;
      }
    }
    .large { font-size:26px; color:@color-text-primary; }
    .huge  { font-size:48px; color:@color-text-primary; }
    .text-center { text-align:center; }
    .text-right  { text-align:right; }
    .text-left   { text-align:left; }
    .color-primary { color:@color-primary; }
    .color-danger { color:@color-danger; }
    #options {
      margin-top:0; 
      padding:25px 0 0 0;
      color:#fff;
      .large { font-size:18px; color:inherit; }
      h5 { margin-top:5px; margin-bottom:5px; }
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
      // padding:10px; 
      box-shadow:0 80px 25px 1px #e0e0e0;
      #condition { 
        .flow; 
        li:first-child { .flex(1); }
      }
      .explain { margin-top:10px; line-height:1.4; }
    }
    #cart {
      // padding:10px; 
      ul { .flow; }
      li { 
        &:first-child { .flex(1); }
        p, div { height:40px; line-height:40px; }
        input { 
          height:40px; .text-center;
          &[type=text] { width:42px; -webkit-appearance:none; outline:0 none; .border(around); background-color:#fff; }
        }
      }
      .input {
        .relative; .flow(column); margin-top:20px;
        input[type=text] { width:100%; .commonInput(); }
        // .button { position:absolute; right:0; top:0; height:40px; }
        .group { 
          .flow(); margin-top:10px; width:100%;
          .iw1 { .flex(1); }
          .iw2 { margin-left:10px; width:120px; }
          input { width:100%; }
          // input[type=text] { display:block; .flex(1); }
          .button { .commonInput(); padding:0; }
        }
      }
      .number-wrapper {
        // .flow;
        .button { min-width:auto; width:40px; }
      }
    }
    #coupon { 
      position:relative;
      &:not(.card) { padding:0; }
      a { position:absolute; top:0; right:0; padding:15px 20px; }
      .text-init { color:#f78a09; }
      .input-wrapper { 
        margin:0; 
        input { width:100%;  .commonInput(); }
      }
    }
    padding-bottom:75px;
    #btn-wrapper {
      position:fixed; bottom:15px; left:0; 
      padding:0 20px;
      width:100%;
      .button {
        .radius();
      }
    }
  }
  #gift { 
    a {
      position:absolute; right:5px; top:15px; z-index:50;
      width:50px; height:50px;
      background:url(~/assets/img/icons/gift.png) no-repeat center;
      background-size:15px auto;
    }
  }
</style>
<template>
  <div id="page-home" @click="" v-if="ready">
    <a href="http://m.baotianqi.cn/weixin/getOpenid"><br>测试链接</a>
    <div id="gift">
      <a class="icon" href="javascript:void(0)"></a>
      <!-- <img src="~/assets/img/icons/gift.png" alt=""> -->
    </div>
    <div id="options" class="panel">
      <a href="javascript:void(0)" class="large" @click="showCityList">{{orderInfo.city.name}}</a>
      <h5>保障时间</h5>
      <a href="javascritp:void(0)" @click="calendarDialog.show=true">
        <span class="large">
          {{computedDateFrom}}
        </span> > 
        <span class="large">
          {{computedDateTo}}
          <!-- <input type="date" v-model="orderInfo.date.to"> -->
        </span>
      </a>
    </div>
    <div id="payout" class="panel card">
      <ul id="condition">
        <li class="text-left">
          <h5>降水量触发条件</h5>
          <p > <span class="large ">{{animation.threshold.value}}</span> mm</p>
        </li>
        <li class="text-right">
          <h5>保障红包</h5>
          <p class="text-left"><span class="large color-primary">{{animation.payout.value}}</span> 元</p>
        </li>
      </ul>
      <p class="explain">如果北京保障日期内，任意当日累计降水量大于 {{contractInfo.threshold}} mm，则赔付现金红包 {{computedPayout}} 元</p>
    </div>
    <div id="cart" class="panel card">
      <ul>
        <li class="">
          <h4>单价</h4>
          <p> <span class="large color-danger">{{contractInfo.price}}</span> 元</p>
        </li>
        <li class="">
          <h4>份数</h4>
          <div class="number-wrapper">
            <input type="button" class="button" value="-" @click="quantityChange('-')"/>
            <input type="text" min="1" max="2" disabled :value="orderInfo.quantity" @change="quantityChange"/>
            <input type="button" class="button" value="+" @click="quantityChange('+')"/>
          </div>
        </li>
      </ul>
      <div class="input">
        <h4>购买信息</h4>
        <input type="text" placeholder="您的手机号" :disabled="!!userInfo.mobile" v-model.trim="orderInfo.mobile" />
        <div class="group" v-if="!userInfo.mobile">
          <div class="inner-wrapper iw1">
            <input type="text" placeholder="验证码" v-model.trim="orderInfo.vfCode" />
          </div>
          <div class="inner-wrapper iw2">
            <input type="button" 
              class="button text primary" 
              :disabled="vfCode.disabled" 
              :value="vfCode.text"
              @click="sendSMSVFCode"
            >
          </div>
        </div>
      </div>
    </div>
    <div id="coupon" class="panel" :class="!coupon.collapsed?'card':''">
      <h4>
        <span class="text-left" v-if="!coupon.collapsed">优惠码</span>
        &nbsp;
        <a 
          href="javascript:void(0)" :class="`text-${coupon.collapsed?'init':coupon.state}`" 
          @click.stop="toggleCouponCodeInput">
          {{ coupon.collapsed? coupon.text.init: coupon.code+coupon.text[coupon.state]+(coupon.value||'') }}
        </a>
      </h4>
      <div class="input-wrapper" v-if="!coupon.collapsed">
        <input type="text" ref="couponCode" @input="couponCodeInput" :value="coupon.code" spellcheck="false">
      </div>
    </div>
    <div id="btn-wrapper">
      <input 
        type="button" class="button block" 
        :class="orderable?'primary':''"
        :value="`支付 ${computedPayFee}元`"
        :disabled="!orderable"
        @click="paymentDialog.show=true"
      >
    </div>
    <!-- 弹窗 -->
    <div id="dialog-cities" class="dialog-container" :class="citySelectorDialog.show?'show':''">
      <div class="outer-wrapper">
        <div id="city-search-box">
          <input type="text" :value="citySelectorDialog.keyword" @input="searchCity">
        </div>
        <!-- 搜索 -->
        <template v-if="citySelectorDialog.keyword.length">
          <div class="inner-wrapper search-wrapper">
              <ul class="list">
                <li 
                  v-for="(c,i) in searchedCities" :key="`scsc${i}`" 
                  @click.stop="selectCity(c)"
                  :class="c.id===orderInfo.city.id?'text-primary':''"
                >
                  {{c.name}}
                </li>
              </ul>
          </div>
        </template>
        <template v-else>
          <h3 class="fixedAnchor" ref="fixedAnchor"></h3>
          <div class="inner-wrapper list-wrapper" ref="cityList">
            <div id="hot-cities">
              <h3>热门城市</h3>
              <ul class="list">
                <li 
                  v-for="(c,i) in hotCities" :key="`hc${i}`" 
                  :class="c.id===orderInfo.city.id?'text-primary':''"
                  @click.stop="selectCity(c)">
                  {{c.name}}
                </li>
              </ul>
            </div>
            <div id="all-cities">
              <template v-for="(s,i) in cities">
                <h3 :ref="`letter-${s.letter}`" :key="`act${i}`">{{s.letter}}</h3>
                <ul class="list" :key="`acl${i}`">
                  <li 
                    v-for="(c,j) in s.data" :key="`acc${j}`" 
                    :class="c.id===orderInfo.city.id?'text-primary':''"
                    @click.stop="selectCity(c)"
                  >
                    {{c.name}}
                  </li>
                </ul>
              </template>
            </div>
          </div>
          <ul id="anchors">
            <li v-for="(s,i) in cities" 
              @click="scrollToAnchor(s, i)"
              :key="`aca${i}`"
            >{{s.letter}}</li>
            <!-- <li v-for="(s,i) in 26" 
              :key="`aca-${i}`"
            >{{s}}</li> -->
          </ul>
        </template>
      </div>
    </div>
    <div id="dialog-calendar" class="dialog-container" :class="calendarDialog.show?'show':''" v-if="mounted">
      <div class="outer-wrapper">
        <calendar-viewer :config="calendarDialog.config" @dateChange="dateChange" />
      </div>
    </div>
    <div id="dialog-payment" class="dialog-container" :class="paymentDialog.show?'show':''" @click="paymentDialog.show=false">
      <div class="outer-wrapper">
        <h3>订单确认</h3>
        <ul>
          <li><label>保障城市</label>{{orderInfo.city.name}}</li>
          <li><label>保障时间</label>{{formatDateString(orderInfo.date.from)}} 至 {{formatDateString(orderInfo.date.to)}}</li>
          <li><label>保障条件</label>任意单日降水量 > {{contractInfo.threshold}}mm</li>
          <li><label>保障金额</label>{{computedPayout}}元</li>
          <li><label>手机号</label>{{mobile}}</li>
          <li><label>单价</label>{{contractInfo.price}} 元</li>
          <li><label>份数</label>{{orderInfo.quantity}}</li>
          <li><label>优惠金额</label>{{coupon.collapsed?0:(coupon.value||0)}} 元</li>
          <li><label>支付总价</label>{{computedPayFee}} 元</li>
        </ul>
        <div class="btn-wrapper">
          <input type="button" class="button block primary" value="确认支付" @click="wechatPay">
        </div>
      </div>
    </div>
    <div id="dialog-paymentResult" class="dialog-container" :class="paymentResultDialog.show?'show':''">
      <div class="outer-wrapper">
        <div class="inner-wrapper">
          <div class="panel preview text-center">
            <img src="~/assets/img/icons/success-bg.png" width="50">
            <h3 class="text-primary">购买成功</h3>
            <h3 class="text-danger">共支付 {{computedPayFee}}元</h3>
            <p class="tips">保障期结束后次日，天气宝自动获取来自气象局的天气数据，判定合约是否触发。判定合约触发后，保障红包将在3个工作内转账到您的微信账户中。</p>
          </div>
          <img src="~/assets/img/icons/border.jpg" alt="" class="border">
          <div class="panel info">
            <h3>
              <span class="border"></span>
              <span class="text">保障信息</span>
              <span class="border"></span>
            </h3>
            <ul>
              <li><label>订单号</label>{{orderInfo.orderId}}</li>
              <li><label>保障城市</label>{{orderInfo.city.name}}</li>
              <li><label>保障时间</label>{{formatDateString(orderInfo.date.from)}} 至 {{formatDateString(orderInfo.date.to)}}</li>
              <li><label>保障条件</label>任意单日降水量 > {{contractInfo.threshold}}mm</li>
              <li><label>保障金额</label>{{computedPayout}}元</li>
              <li><label>单价</label>{{contractInfo.price}} 元</li>
              <li><label>份数</label>{{orderInfo.quantity}}</li>
              <li><label>优惠金额</label>{{coupon.collapsed?0:(coupon.value||0)}} 元</li>
              <li><label>支付总价</label>{{computedPayFee}} 元</li>
            </ul>
            <div class="btn-wrapper">
              <input type="button" class="button primary block" value="返回" @click="paymentResultDialog.show=false">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pinyinUtil from '~/static/js/pinyinUtil.js'
import calendarViewer from '~/components/calendar.vue'
// import axios from '~/plugins/axios';

export default {
  async asyncData(ctx) {
    // let conf = await axios.post('getConfig');
    let config = {
      orderTimeLimitMax:60,
      orderTimeLimitMin:10,
      orderDaysLimitMin:3
    };

    let openid = ctx.query.openid;

    return { config, openid }
  },
  data () {
    return {
      ready    :true,
      cities   :[],
      hotCities:[],
      userInfo : {
        mobile :'13',
        openId :'',
      },
      orderInfo: {
        city: {
          name:'北京',
          id:'CN54511'
        },
        date: {
          from:new Date(),
          to:new Date(),
        },
        quantity:1,
        mobile:'13131313131',
        orderId:' ',
      },
      contractInfo: {
        payout:0,
        price:0,
        threshold:0
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
        searching:false,
        keyword:'',
        timer  :-1,
      },
      calendarDialog: {
        show:false,
        config: {
          orderTimeLimitMin:10, 
          orderTimeLimitMax:60, 
          orderDaysLimitMin:3,
          monthOnShow:3,
          dateFrom:new Date(),
          dateTo:new Date()
        }
      },
      paymentDialog: {
        show:false
      },
      paymentResultDialog: {
        show:false
      },

      animation: {
        timer  : {},
        payout : { name:'payout', value:0 },
        payment: { name:'payment', value:0 },
        threshold: { name:'thresold', value:0},
      },
      mounted: false
    }
  },
  computed: {
    mobile() {
      return this.orderInfo.mobile || this.userInfo.mobile;
    },
    // 城市
    searchedCities() {
      let cs = this.allCities;
      let kw = this.citySelectorDialog.keyword;
      return kw? cs.filter(c=>c.searchKey.indexOf(kw) >= 0): cs;
    },
    // 订单
    computedDateFrom() {
      return this.parseDateToString(new Date(this.orderInfo.date.from));
    },
    computedDateTo() {
      return this.parseDateToString(new Date(this.orderInfo.date.to));
    },
    // 合约
    computedPayout() {
      return this.contractInfo.payout * this.orderInfo.quantity;
    },
    // 支付
    computedAmount() {
      return this.contractInfo.price * this.orderInfo.quantity
    },
    computedPayFee() {
      // 跟是否使用优惠码,和优惠码的额度有关
      return this.coupon.collapsed? 
        this.computedAmount: 
        ((fee)=>{
          return fee>0? fee:0;
        })( (this.computedAmount * 100 - this.coupon.value * 100)/100 )
    },
    orderable() {
      return /^1\d{10}$/.test(this.orderInfo.mobile) && (this.userInfo.mobile?true:this.orderInfo.vfCode)
    },
  },
  methods: {
    // getFirstLetter (word) {
    //   return pinyinUtil.getFirstLetter(word)
    // },
    eventTest(e) {
    },
    parseDateToString(date) {
      let month=date.getMonth()+1, day=date.getDate();
      return `${month>9?month:'0'+month}-${day>9?day:'0'+day}`
    },
    formatDateString(d) {
      return `${d.getFullYear()}-${this.prefix0(d.getMonth()+1)}-${this.prefix0(d.getDate())}`;
    },
    quantityChange(u) {
      let orderInfo = this.orderInfo;
      if ( u==='-' && orderInfo.quantity>1 ) {
        orderInfo.quantity-=1
      } else if ( u==='+' && orderInfo.quantity<2 ) {
        orderInfo.quantity+=1
      } else {
        return;
      }
      this.animateNumber('payout', this.contractInfo.payout * this.orderInfo.quantity);
    },
    sendSMSVFCode() {
      let mobile = this.orderInfo.mobile
      // 验证手机号
      if ( !/^1\d{10}$/.test(mobile) ) {
        return this.$store.commit('showMessageDialog', {type:'failure', text:'手机号无效'});
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
        this.$store.commit('showMessageDialog', {type:'failure', text:err})
        this.resetVfCodeSetting();
      })
    },
    resetVfCodeSetting() {
      this.vfCode.time = 60;
      this.vfCode.disabled = false;
      this.vfCode.text = '发送验证码';
    },
    toggleCouponCodeInput() {
      // 除了作展开动作, 还作聚/失焦
      if ( !(this.coupon.collapsed=!this.coupon.collapsed) ) {
        this.$nextTick(()=>{
          this.$refs.couponCode.focus()
        })
      } else {
        this.$refs.couponCode.blur()
      }
    },
    couponCodeInput(e) {
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
          mobile:this.orderInfo.mobile, 
          coupons:coupon.code, 
          productId:10012
        })
        .then(resp=>{
          if ( resp.state!==1 ) return this.$store.commit('showMessageDialog', {type:'failure', text:resp.message})
          coupon.state = resp.data.discountAmount? 'success': 'failure';
          coupon.value = resp.data.discountAmount? (resp.data.discountAmount/100).toFixed(2): 0;
        })
      }, coupon.delay)
    },
    dateChange(from, to) {
      this.orderInfo.date.from = new Date(from.year, from.month, from.day);
      this.orderInfo.date.to   = new Date(to.year, to.month, to.day);
      this.calendarDialog.show = false;
    },
    parseDateForParam(d) {
      return `${d.getFullYear()}${this.prefix0(d.getMonth()+1)}${this.prefix0(d.getDate())}`;
    },
    prefix0(n) {
      return n>9?n:'0'+n;
    },
    // 订单相关
    getContract() {
      this.$http.post('getContract', {
        cityId:this.orderInfo.city.id,
        startTime:+this.orderInfo.date.from,
        endTime:+this.orderInfo.date.to,
      })
      .then(resp=>{
        if ( resp.state !== 1 ) return this.$store.commit('showMessageDialog', {type:'failure', text:resp.message})
        this.contractInfo = resp.data;
        this.animateNumber('payout', resp.data.payout);
        this.animateNumber('threshold', resp.data.threshold);
      })
    },
    // 城市相关
    showCityList() {
      this.citySelectorDialog.show = true;
    },
    selectCity (c) {
      if ( this.orderInfo.city.id !== (c.id||c.cityId) ) {
        this.orderInfo.city = {id:c.id||c.cityId, name:c.name||c.cityName};
        this.getContract();
      }
      this.citySelectorDialog.show = false;
    },
    searchCity(e) {
      clearTimeout(this.citySelectorDialog.timer);
      this.citySelectorDialog.timer = setTimeout(()=>{
        this.citySelectorDialog.keyword = e.target.value.trim();
      }, 300);
    },
    scrollToAnchor (s, i) {
      this.stopScrollEvent = true;
      this.stopScrollIndex = i;
      this.$refs.fixedAnchor.textContent = s.letter;
      this.$refs['letter-'+s.letter][0].scrollIntoView()
      // this.stopScrollEvent = false;
    },
    loadCityData() {
      this.$http.post('getCities')
      .then(resp => {
        // if ( resp.state !== 1 ) throw resp.message;
        resp = { data:{ cityList:resp.cityList } };

        let allCities    = [];
        let hotCities    = resp.data.cityList.filter(c=>c.hot=='1');
        let allCitiesMap = {}
        let letter       = ''
        // 按首字母摘取
        resp.data.cityList.forEach((city)=> { // 区域
          letter  = city.py[0].toUpperCase();
          city.name = city.value;
          city.firstLetter = city.py;
          allCitiesMap[letter] = allCitiesMap[letter] || {letter, data:[]},
          allCitiesMap[letter].data.push(city)
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
        
        this.allCities = resp.data.cityList;
        this.cities    = allCities;
        this.hotCities = hotCities;

        this.$nextTick(()=>{
          this.initCityListScroll()
        });
      })
      .catch(err => {
        console.log(err)
      })
    },
    initCityListScroll() {
      let wrapper = this.$refs.cityList,
          anchors = [].map.call(
            wrapper.querySelectorAll('#all-cities h3'), 
            (e,i)=>true&& {elem:e,top:e.offsetTop,idx:i}
          ),
          fixedAnchor = this.$refs.fixedAnchor;

      let prevTop=0, currTop=0, idx=-1, maxIdx=anchors.length-1, timer;
      wrapper.addEventListener('scroll', (e)=> {
        if ( this.stopScrollEvent ) {
          this.stopScrollEvent=false;
          idx = this.stopScrollIndex;
          return;
        }
        clearTimeout(timer);
        currTop = wrapper.scrollTop;
        if ( currTop>prevTop ) { 
          // 向上滑动
          if ( idx<maxIdx && currTop>=anchors[idx+1].top ) {
            fixedAnchor.classList.add('show');
            fixedAnchor.textContent = anchors[++idx].elem.textContent;
          }
        } else { 
          // 向下滑动
          if ( currTop<anchors[idx].top ) {
            if ( idx === 0 ) {
              fixedAnchor.classList.remove('show');
            } else {
              fixedAnchor.textContent = anchors[--idx].elem.textContent;
            }
          }
        }
        prevTop = currTop;

        // 做个补偿
        clearTimeout(timer);
        timer = setTimeout(compensator, 50);
      });
      // 补偿
      function compensator() {
        currTop = wrapper.scrollTop;
        // 取一个
        if (!anchors.some((a,i)=>{
          if (a.top > currTop) {
            idx=i-1;
            if (idx===-1) {
              fixedAnchor.classList.remove('show');
            } else {
              fixedAnchor.textContent = anchors[idx].elem.textContent;
            }
            return true;
          }
        // 如果取不到，肯定是到最后了，野做一个补偿
        })) {
          idx = maxIdx;
          fixedAnchor.textContent = anchors[idx].elem.textContent;
        }
        prevTop = currTop;
      }
    },
    async wechatPay() {
      
      // if ( !this.orderInfo.openId ) {
      //   await this.$http.get('getOpenId')
      //   .then(resp=>{
      //     if ( resp.state !== 1 ) 
      //     return this.$store.commit('showMessageDialog', {type:'failure', text:resp.message});
      //     this.orderInfo.openId = resp.data.openid;
      //   })
      //   .catch(err=>{
      //     // this.$store.commit('showMessageDialog', {type:'failure', text:JSON.stringify(err)});
      //     alert( err );
      //   })
      // }

      let option = await this.$http.post('getPaymentOption', {
          outTradeNo:(Math.random()+'').split('.')[1],
          totalFee  : 10,
          body      : '自营降雨',
          returnUrl : 'w.baotianqi.cn',
          openid    : this.openid,
        });


      alert( typeof option.data==='object'? JSON.stringify(option.data): option.data );

      function onBridgeReady(){
        WeixinJSBridge.invoke(
          // 'getBrandWCPayRequest', {
          //     "appId":'${appId}',     //公众号名称，由商户传入     
          //     "timeStamp":'${timeStamp}',         //时间戳，自1970年以来的秒数     
          //     "nonceStr":'${nonceStr}', //随机串     
          //     "package":'${package}',    
          //     "signType":"MD5",         //微信签名方式：     
          //     "paySign":'${paySign}' //微信签名 
          // },
          'getBrandWCPayRequest', 
          { ...option.data },
          function(res){
            alert(str);
            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
              window.location.href = "${returnUrl}";
            }     
            // 使用以上方式判断前端返回, 微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
          }
        );
      }
      
      if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        }else if (document.attachEvent){
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
      }else{
        onBridgeReady();
      }




      // window.open(
      //   `http://pay.baotianqi.cn/wxpay/jsapipay/?` + 
      //   `outTradeNo=${(Math.random()+'').split('.')[1]}&body=test&totalFee=10&openid=${this.openid}&returnUrl=m.baotianqi.cn`
      // );
      
      // return;

      // this.$http.get('pay_wechat', {
      //   params: {
      //     outTradeNo:(Math.random()+'').split('.')[1],
      //     totalFee  : 10,
      //     body      : '自营降雨',
      //     returnUrl : 'w.baotianqi.cn',
      //     openid    : this.openid,
      //   }
      // })
      // .then(resp=>{
      //   // alert(resp);
      //   var frame = document.createElement('frame');
      //   frame.innerHTML = resp;
      //   document.body.append(frame);
      // })

      return;

      this.$http.post('pay_wechat', {
          // outTradeNo: this.contractInfo.contractId,
          // totalFee  : this.computedPayFee * 100,
          outTradeNo:(Math.random()+'').split('.')[1],
          totalFee  : 10,
          body      : '自营降雨',
          returnUrl : 'w.baotianqi.cn',
          openid    : this.openid,
        })
        .then(resp=>{
          // console.log( resp )
          if ( resp.state === 1 ) {
            this.paymentResultDialog.show = true;
          } else {
            return this.$store.commit('showMessageDialog', {type:'failure', text:'支付失败'});
          }


          // this.payment.wechat.qrcode = resp.data.code_url;
          // this.$nextTick(()=>{
          //   CountDown.closeBySign('wxQrcodeLifeCycle');
          //   CountDown.openTimeCountBySeconds({
          //       Ele: this.$refs.wxQrcodeLifeCycle,
          //       CountDownSeconds:30,
          //       Divider: ':',
          //       Sign   : 'wxQrcodeLifeCycle',
          //       EndFunc: function () {
          //       }
          //   });
          // });
        })
    },
    animateNumber(name, val) {
      let a = this.animation,
          o = a[name];
      clearInterval( a.timer[o.name] );
      a.timer[o.name] = setInterval(()=>{
        if ( o.value === val ) {
          clearInterval( a.timer[o.name] );
        } else if ( o.value > val ) {
          o.value -= 1;
        } else {
          o.value += 1;
        }
      }, 1000/Math.abs(val-o.value));
    }
  },
  created () {
    // this.loadCityData();
    // this.getContract();

    let config  = this.config;
    let dateFrom = new Date(),
        dateTo   = new Date();
    dateFrom.setDate(dateFrom.getDate() + config.orderTimeLimitMin + 1);
    dateTo.setDate(dateTo.getDate() + config.orderTimeLimitMin +  config.orderDaysLimitMin);


    this.orderInfo.date.from = dateFrom;
    this.orderInfo.date.to   = dateTo;

    this.calendarDialog.config = {
      ...this.calendarDialog.config,
      orderTimeLimitMax:config.orderTimeLimitMax,
      orderTimeLimitMin:config.orderTimeLimitMin,
      orderDaysLimitMin:config.orderDaysLimitMin,
      dateFrom,
      dateTo
    };
  },
  mounted() {
    this.mounted = true;
    this.loadCityData();
    this.getContract();

    // this.$http.get('getOpenId')
    //   .then(resp=>{
    //     if ( resp.state === 1 ) {
    //       this.openId = resp.data;
    //     }
    //   })
    //   .catch(err=>{
    //     console.err(err);
    //   })

  },
  components: {
    calendarViewer
  }
}
</script>