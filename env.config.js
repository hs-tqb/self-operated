let config = {
  development: {
    baseURL: 'http://test.selfrain.baotianqi.cn/'
  },
  test: {
    baseURL: 'http://test.selfrain.baotianqi.cn/'
  },
  production: {
    baseURL: 'http://web.baotianqi.cn/'
  }
}

export default config[process.env.RUN_ENV || process.env.NODE_ENV]
