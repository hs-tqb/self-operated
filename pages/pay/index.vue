<style lang="less">
  @import url('~assets/css/variable.less');
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
      .flow(); .align(stretch); padding:10px 20px 10px 0;
      a { width:60px; line-height:30px; text-align:center; font-size:20px; font-weight:bold; }
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
      .flow(column);
      .panel { margin:0; } .scroll;
      height:100%; 
      // max-height:100%;
      background-color:#fff; .radius(); 
      h3 { font-size:15px; line-height:1.3; }
      img + h3 { margin-top:10px; }
      .tips { margin-top:10px; padding-top:15px; font-size:12px; line-height:1.4; text-align:justify; .border(top); }
      .info {
        .flex(1); display:flex; flex-direction:column; width:100%;
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
          .flex(1); display:flex; flex-direction:column; .align(center); .justify(center);
          margin:15px; min-height:40px;
          .button { .radius(); height:40px; }
        }
      }
    }
  }
  @bgc:#fefefe;
  .radius() { border-radius:6px; }
  .inputGap() { padding:0 10px; }
  .commonInput() { height:40px; .inputGap(); .border(around); .radius(); }
  #page-home {
    background:@bgc no-repeat center 0;
    background-size:100% auto;
    h5 { margin-bottom:15px; font-size:12px; }
    h4 { margin-bottom:15px; font-size:14px; }
    .panel { 
      position:relative; z-index:10; margin:15px 20px 0 20px; padding:15px; 
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
    #bg-lay {
      position:absolute; top:0; left:0; z-index:0; 
      width:100%; height:100%;
      // background:rgba(0,0,0,0.4);
      pointer-events:none;
      div { 
        position:absolute; top:0; left:0; 
        width:100%; height:100%;
        background:no-repeat; background-size:100% auto;
        opacity:0; transition-duration:500ms; 
        &.show { opacity:1; }
      }
    }
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
      .explain { margin-top:12px; font-size:12px; line-height:1.2; }
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
        input[type=text],input[type=number],input[type=tel] { width:100%; .commonInput(); }
        input:disabled { color:#999; }
        // .button { position:absolute; right:0; top:0; height:40px; }
        .group { 
          .flow(); margin-top:10px; width:100%;
          .iw1 { .flex(1); }
          .iw2 { margin-left:10px; width:120px; }
          input { width:100%; }
          // input[type=text] { display:block; .flex(1); }
          .button { .commonInput(); padding:0; }
        }
        p { margin-top:7px; width:100%; font-size:12px; line-height:1.4; text-align:center; color:@color-info; } 
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
      position:fixed; bottom:15px; left:0; z-index:10;
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
    <!-- <div id="gift">
      <a class="icon" href="javascript:void(0)"></a>
    </div> -->
    <div id="bg-lay">
      <div 
        :class="contractInfo.threshold>15?'show':''" 
        :style="`background-image:url(${bgs[2]});`"></div>
      <div 
        :class="contractInfo.threshold>5&&contractInfo.threshold<=15?'show':''" 
        :style="`background-image:url(${bgs[1]});`"></div>
      <div 
        :class="contractInfo.threshold<=5?'show':''" 
        :style="`background-image:url(${bgs[0]});`"></div>
    </div>
    <div id="options" class="panel">
      <a href="javascript:void(0)" class="large" @click="showCityList">{{orderInfo.city.name}} > </a>
      <h5>保障时间</h5>
      <div class="large" @click="calendarDialog.show=true">
        <a href="javascript:void(0)">
          {{computedDateFrom}}
        </a> 
        <template v-if="computedDateTo!==computedDateFrom">
          <span> &gt; </span>
          <a href="javascript:void(0)">
            {{computedDateTo}}
          </a>
        </template>
      </div>
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
      <p class="explain">如果{{orderInfo.city.name}}保障日期内，任意当日累计降水量大于 {{contractInfo.threshold}} mm，则赔付现金红包 {{computedPayout}} 元。降水量以{{orderInfo.city.name}}气象站（{{orderInfo.city.id.replace(/cn/gi,'')}}）测量数据为准</p>
    </div>
    <div id="cart" class="panel card">
      <ul>
        <li class="">
          <h4>单价</h4>
          <p> <span class="large color-danger">{{computedPrice}}</span> 元</p>
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
        <template v-if="!!userInfo.mobile">
          <input type="text" disabled :value="userInfo.mobile" />
          <p>如果这不是您的手机号，请在天气宝公众号留言联系客服</p>
        </template>
        <template v-else>
          <input type="tel" placeholder="您的手机号" v-model.trim="orderInfo.mobile" />
          <div class="group">
            <div class="inner-wrapper iw1">
              <input type="number" placeholder="获取验证码" v-model.trim="orderInfo.vfCode" />
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
          <p>手机号验证将会绑定您的微信号，下次购买无须验证</p>
        </template>
      </div>
    </div>
    <div id="coupon" class="panel" :class="!coupon.collapsed?'card':''" v-if="false">
      <h4>
        <span class="text-left" v-if="!coupon.collapsed">优惠码</span>
        &nbsp;
        <a 
          href="javascript:void(0)" :class="`text-${coupon.collapsed?'init':coupon.state}`" 
          @click.stop="toggleCouponCodeInput">
          {{ 
            coupon.collapsed? 
              coupon.text.init: 
              coupon.text[coupon.state].replace('$value', coupon.value)
            }}
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
          <a href="javascript:void(0)" @click="citySelectorDialog.show=false">&lt;</a>
          <input type="text" :value="citySelectorDialog.keyword" placeholder="城市搜索" @input="searchCity">
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
          <li><label>保障时间</label>
            <template v-if="formatDateString(orderInfo.date.from)===formatDateString(orderInfo.date.to)">
              {{formatDateString(orderInfo.date.from)}}
            </template>
            <template v-else>
              {{formatDateString(orderInfo.date.from)}} 至 {{formatDateString(orderInfo.date.to)}}
            </template>
          </li>
          <li><label>保障条件</label>任意单日降水量 > {{contractInfo.threshold}}mm</li>
          <li><label>保障金额</label>{{computedPayout}}元</li>
          <li><label>手机号</label>{{userInfo.mobile}}元</li>
          <li><label>单价</label>{{computedPrice}} 元</li>
          <li><label>份数</label>{{orderInfo.quantity}}</li>
          <!-- <li><label>优惠金额</label>{{coupon.collapsed?0:(coupon.value||0)}} 元</li> -->
          <li><label>支付总价</label>{{computedPayFee}} 元</li>
        </ul>
        <div class="btn-wrapper">
          <input type="button" class="button block primary" value="确认支付" @click="addOrder">
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
            <ul v-if="orderInfo.outTradeNo">
              <li><label>订单号</label>{{orderInfo.outTradeNo}}</li>
              <li><label>保障城市</label>{{orderInfo.city.name}}</li>
              <li><label>保障时间</label>
                <template v-if="formatDateString(orderInfo.date.from)===formatDateString(orderInfo.date.to)">
                  {{formatDateString(orderInfo.date.from)}}
                </template>
                <template v-else>
                  {{formatDateString(orderInfo.date.from)}} 至 {{formatDateString(orderInfo.date.to)}}
                </template>
              </li>
              <li><label>保障条件</label>任意单日降水量 > {{contractInfo.threshold}}mm</li>
              <li><label>保障金额</label>{{computedPayout}}元</li>
              <li><label>单价</label>{{computedPrice}} 元</li>
              <li><label>份数</label>{{orderInfo.quantity}}</li>
              <!-- <li><label>优惠金额</label>{{coupon.collapsed?0:(coupon.value||0)}} 元</li> -->
              <li><label>支付总价</label>{{computedPayFee}} 元</li>
            </ul>
            <div class="btn-wrapper">
              <!-- <input type="button" class="button primary block" value="返回" @click="(paymentResultDialog.show=false)||(orderInfo.outTradeNo='')"> -->
              <input type="button" class="button primary block" value="返回" @click="reload">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import calendarViewer from '~/components/calendar.vue'
// import pinyinUtil from '~/static/js/pinyinUtil.js'
import axios from '~/plugins/axios';

import bg1 from '~/assets/img/banner/bg1.jpg'
import bg2 from '~/assets/img/banner/bg2.jpg'
import bg3 from '~/assets/img/banner/bg3.jpg'

export default {
  async asyncData(ctx) {
    // let conf = await axios.post('getConfig');
    // let config = {
    //   orderTimeLimitMax:30,
    //   orderTimeLimitMin:1,
    //   orderDaysLimitMin:1
    // };

    let openid = ctx.query.openid  || 'opb1Ft61n4QEwe29QyorjApHAnO8';
    let mobile;
     if ( openid ) {
      // await axios.post('getMobile', {openId:openid})
      //   .then(resp=>{
      //     if (resp.state !== 1) return;
      //     mobile = resp.data.mobile;
      //   })
    }

    return { userInfo:{openid, mobile} };
  },
  data () {
    return {
      bgs      :[bg1,bg2,bg3],
      ready    :true,
      cities   :[],
      allCities:[],
      hotCities:[],
      orderInfo: {
        city: {
          name:'定位中',
          // id:''
          id:'CN54511'
        },
        date: {
          from:new Date(),
          to:((d)=>{return d.setDate(d.getDate()+3)})(new Date()),
        },
        quantity:1,
        mobile:'',
        orderId:' ',
      },
      contractInfo: {
        payoutFee:0,
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
          'success':'立减 $value 元',
          'failure':'优惠码无效'
        }
      },
      // 选择器
      citySelectorDialog: {
        show:false,
        // show:true,
        searching:false,
        keyword:'',
        timer  :-1,
      },
      calendarDialog: {
        show:false,
        // show:true,
        config: {
          orderTimeLimitMax:30, 
          orderTimeLimitMin:1, 
          orderDaysLimitMin:1,
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
        threshold: { name:'threshold', value:0},
      },
      mounted: false
    }
  },
  computed: {
    computedMobile() {
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
      return parseInt(this.contractInfo.payoutFee * this.orderInfo.quantity /100 );
    },
    computedPrice() {
      return this.contractInfo.price/100;
    },
    // 支付
    computedAmount() {
      return this.computedPrice * this.orderInfo.quantity
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
      // 合约 + （已绑手机号 || 未绑手机号+验证码）
      return ( this.contractInfo.innerOrderId ) &&
          ( this.userInfo.mobile || 
            ( /^1\d{10}$/.test(this.orderInfo.mobile) && this.orderInfo.vfCode )
          )
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
      }
      this.animateNumber('payout',  parseInt(this.contractInfo.payoutFee * this.orderInfo.quantity /100) );
    },
    sendSMSVFCode() {
      let mobile = this.orderInfo.mobile
      // 验证手机号
      if ( !/^1\d{10}$/.test(mobile) ) {
        return this.$store.commit('showMessageDialog', {type:'failure', text:'无效的手机号',delay:400000000});
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
        if ( resp.state!==1 ) return this.resetVfCodeSetting();
      })
    },
    resetVfCodeSetting() {
      clearInterval( this.vfCode.timer );
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
          mobile:this.computedMobile,
          coupons:coupon.code, 
          productId:10012
        })
        .then(resp=>{
          if ( resp.state!==1 ) return this.$store.commit('showMessageDialog', {type:'failure', text:resp.message})
          coupon.state = resp.data.discountAmount? 'success': 'failure';
          coupon.value = resp.data.discountAmount? (resp.data.discountAmount/100): 0;
        })
      }, coupon.delay)
    },
    dateChange(from, to) {
      // console.log( this.orderInfo.date );
      // console.log( new Date(from.year, from.month, from.day),  new Date(to.year, to.month, to.day));
      // return;
      this.calendarDialog.show = false;
      
      // 日期不改则不做请求
      let currFrom = this.orderInfo.date.from;
      let currTo   = this.orderInfo.date.to;
      if ( 
        (currFrom.getFullYear()===from.year&&currFrom.getMonth()===from.month&&currFrom.getDate()===from.day)&&
        (currTo.getFullYear()===to.year&&currTo.getMonth()===to.month&&currTo.getDate()===to.day)
      ) {
        return;
      }

      this.orderInfo.date.from = new Date(from.year, from.month, from.day);
      this.orderInfo.date.to   = new Date(to.year, to.month, to.day);
      // this.calendarDialog.show = false;
      this.orderInfo.innerOrderId = '';
      this.orderInfo.outTradeNo   = '';
      this.getContract();
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
        startTime:this.parseDateForParam(this.orderInfo.date.from),
        endTime:this.parseDateForParam(function(d) {
          d = new Date(+d);
          d.setDate(d.getDate()+1);
          return d;
        } (this.orderInfo.date.to)),
        openId:this.userInfo.openid
      })
      .then(resp=>{
        if ( resp.state !== 1 ) {
          this.contractInfo = {
            payoutFee:0,
            price:0,
            threshold:0
          };
          this.animation.payout.value    = 0;
          this.animation.threshold.value = 0;
          return;
        }
        //  this.$store.commit('showMessageDialog', {type:'failure', text:resp.message})
        this.contractInfo = resp.data;
        // console.log(resp.data.payoutFee * this.orderInfo.quantity / 100)
        
        this.animateNumber('payout', parseInt(resp.data.payoutFee * this.orderInfo.quantity / 100));
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
        this.orderInfo.innerOrderId = '';
        this.orderInfo.outTradeNo   = '';
        this.getContract();
      }
      this.citySelectorDialog.show = false;
    },
    searchCity(e) {
      clearTimeout(this.citySelectorDialog.timer);
      this.citySelectorDialog.timer = setTimeout(()=>{
        if( !(this.citySelectorDialog.keyword = e.target.value.trim()) ) {
          this.$nextTick(()=>{
            this.initCityListScroll()
          });
        }
      }, 300);
    },
    scrollToAnchor (s, i) {
      this.stopScrollEvent = true;

      this.stopScrollIndex = i;
      this.$refs.fixedAnchor.textContent = s.letter;

      this.$refs['letter-'+s.letter][0].scrollIntoView()
      // this.stopScrollEvent = false;
    },
    async loadCityData() {
      await this.$http.post('getCities')
      .then(resp => {
        if ( resp.state !== 1 ) throw resp.message;

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
    addOrder() {

      if ( this.orderInfo.outTradeNo ) {
        return this.wechatPay();
      }

      this.$http.post('addOrder', {
        innerOrderId:this.contractInfo.innerOrderId,
        buyCount:this.orderInfo.quantity,
        verifyCode:this.orderInfo.vfCode,
        mobile:this.computedMobile,
        openid:this.userInfo.openid,
      })
      .then(resp=>{
        if ( resp.state !== 1 ) return;
        this.orderInfo.outTradeNo = resp.data.outTradeNo;
        this.orderInfo.totalFee   = resp.data.totalFee;
        this.orderInfo.body       = resp.data.body;
        this.wechatPay();
      })
    },
    async wechatPay() {
      let option = (await this.$http.post('getPaymentOption', {
          outTradeNo: this.orderInfo.outTradeNo,
          totalFee  : this.orderInfo.totalFee,
          // totalFee  : 1,
          body      : this.orderInfo.body,
          returnUrl : 'w.baotianqi.cn',
          openid    : this.userInfo.openid,
        })).data;

      let vm = this;
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
          option,
          function(res){
            if(res.err_msg === "get_brand_wcpay_request:ok" ) {
              vm.paymentResultDialog.show = true;
            } else {
              vm.orderInfo.outTradeNo = '';
              vm.getContract();
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
      // }, 1000/Math.abs(val-o.value));
      }, 30 );
    },
    reload() {
      location.reload();
    }
  },
  created () {
    let config  = this.calendarDialog.config;
    let dateFrom = new Date(),
        dateTo   = new Date();
    dateFrom.setDate(dateFrom.getDate() + config.orderTimeLimitMin );
    dateTo.setDate(dateTo.getDate() + config.orderTimeLimitMin +  config.orderDaysLimitMin -1);



    this.orderInfo.date.from = dateFrom;
    this.orderInfo.date.to   = dateTo;

    config.dateFrom = dateFrom;
    config.dateTo   = dateTo;


    // this.calendarDialog.config = {
      // ...this.calendarDialog.config,
      // orderTimeLimitMax:config.orderTimeLimitMax,
      // orderTimeLimitMin:config.orderTimeLimitMin,
      // orderDaysLimitMin:config.orderDaysLimitMin,
    //   dateFrom,
    //   dateTo
    // };
  },
  async mounted() {
    this.mounted = true;
    await this.loadCityData();

    let script = document.createElement('script');
    let timer  = -1;
    let hasSet = false;
    // 获取地址，做自动初始化
    script.setAttribute('async', 'false');
    document.body.appendChild(script);
    script.src = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
    script.addEventListener('load', ()=>{
      clearTimeout(timer);
      if ( hasSet ) return console.log('');
      let localCityName = remote_ip_info.city;
      // 如果在我们的城市列表里没有对应的city，则使用北京
      if ( !this.allCities.some(c=>{
          if ( c.value===localCityName ) {
            this.orderInfo.city = {name:localCityName, id  :c.id};
            return true;
          }
      })) {
        this.orderInfo.city = {
          name:'北京',
          id:'CN54511'
        }
      }
      this.getContract();
    });

    // 如果三秒时间还没取到城市，则去掉读取
    timer = setTimeout(()=>{
      hasSet = true;
      this.orderInfo.city = {
        name:'北京',
        id:'CN54511'
      }
      this.getContract();      
    }, 3000);
    


    this.$http.post('getMobile', {openId:this.userInfo.openid})
        .then(resp=>{
          if (resp.state !== 1) return;
          this.userInfo.mobile = resp.data.mobile;
        })

    // this.getContract();

    // if ( process.env.RUN_ENV==='development' ) {
      // eruda.init();
    // }
  },
  components: {
    calendarViewer
  }
}
</script>