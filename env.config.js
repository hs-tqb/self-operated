let config = {
  development: {
    baseURL: 'http://test.selfrain.baotianqi.cn/'
    // baseURL: 'http://192.168.1.159:8008/'
  },
  test: {
    baseURL: 'http://test.selfrain.baotianqi.cn/'
    // baseURL: 'http://192.168.1.159:8008/'
  },
  production: {
    baseURL: 'http://api.selfrain.baotianqi.cn/'
  }
}

export default config[process.env.RUN_ENV || process.env.NODE_ENV]
