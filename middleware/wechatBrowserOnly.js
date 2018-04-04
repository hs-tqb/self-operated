export default function ( { req, redirect} ) {
  let userAgent = process.server? req.headers['user-agent']: navigator.userAgent;
  // 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器  
  if (userAgent.match(/MicroMessenger/i) != 'MicroMessenger') {
    // 这里警告框会阻塞当前页面继续加载  
    redirect('/wechatBrowserOnly');
  }
};
