let config = {
  development: {
    baseURL: 'http://localhost:5555/'
  },
  test: {
    baseURL: 'http://ts.baotianqi.cn/'
  },
  production: {
    baseURL: 'http://web.baotianqi.cn/'
  }
}

export default config[process.env.RUN_ENV || process.env.NODE_ENV]
