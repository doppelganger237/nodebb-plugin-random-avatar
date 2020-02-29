'use strict'
// 系统函数库
// const user = require.main.require('./user')
// const db = require.main.require('../src/database')
// const meta = require.main.require('./meta')
// const utils = require.main.require('../public/src/utils')

// 常用模块
// const async = require.main.require('async')
// const nconf = require.main.require('nconf')
// const winston = require.main.require('winston')
// const path = require.main.require('path')

// 载入依赖模块
// const _ = require('lodash')
// const callbackify = require('../callbackify')
const settings = require('./settings')
const Controllers = {}

// 获得设置
Controller.getSettings = function(done) {
  async.waterfall(
    [
      async.apply(settings.getData),
      function(settings, callback) {
        callback(null, settings)
      }
    ],
    done
  )
}



module.exports = Controllers
module.exports.Controllers = Controllers
