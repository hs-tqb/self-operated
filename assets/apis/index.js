module.exports = {
  getConfig: 'selfrain/init/',
  getCities: 'selfrain/getCitys/',
  getContract:'selfrain/getContract',
  addOrder: 'selfrain/addOrder',
  getMobile:'http://192.168.1.159:8008/selfrain/getUserMobile',
  getSMSVFCode: 'selfrain/getCode',

  checkCouponCode:'sellerMerchant/findCoupons',
  getOpenId:'http://m.baotianqi.cn/weixin/getOpenid',
  getPaymentOption: 'http://pay.baotianqi.cn/wxpay/toJsapipay/',
  pay_wechat:'http://pay.baotianqi.cn/wxpay/jsapipay/',
}