export default function ( { req, redirect} ) {
  // 测试环境不做跳转
  if ( process.env.NODE_ENV === 'development' ) return;
  // 正式环境下, 只允许微信打开  
  let userAgent = process.server? req.headers['user-agent']: navigator.userAgent;
  if ( userAgent.match(/MicroMessenger/i) != 'MicroMessenger') {
    redirect('/wechatBrowserOnly');
  }
};
