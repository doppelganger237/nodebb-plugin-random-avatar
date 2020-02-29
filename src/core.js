'use strict'

var async = require.main.require('async'),
  cache = require('node-cache'),
  Core = {},
  Settings = require('./settings'),
  avatarCache = new cache({ stdTTL: 1800, checkperiod: 600 })

Core.init = function(params, callback) {
  /*   meta.settings.get('random-avatar', function(err, settings) {
    if (err) {
      console.log('error')
      return callback(err)
    }

    Settings = settings
  })
 */

  const pluginUri = '/admin/plugins/random-avatar'

  var renderAdmin = function(req, res, next) {
    res.render(pluginUri.substring(1), {})
  }
  const router = params.router
  const hostMiddleware = params.middleware
  router.get(pluginUri, hostMiddleware.admin.buildHeader, renderAdmin)
  router.get('/api' + pluginUri, renderAdmin)

  async.parallel(
    {
      Settings: async.apply(Settings.init)
    },
    callback
  )
}
Core.addAdminNavigation = function(header, callback) {
  header.plugins.push({
    route: '/plugins/random-avatar',
    icon: 'fa-tint',
    name: 'Random Avatar'
  })
  callback(null, header)
}
Core.usersGet = function(users, callback) {
  async.map(
    users,
    function(userObj, next) {
      if (!userObj) {
        return next(null, userObj)
      }
      if (userObj.picture === null || userObj.picture === '' || userObj.uploadedpicture === null) {
        if (avatarCache.has(userObj.uid)) {
          userObj.picture = avatarCache.get(userObj.uid)
        } else {
          getRandomAvatar(function(error, random) {
            if (error) {
              return next(null, userObj)
            }
            avatarCache.set(userObj.uid, random)
            userObj.picture = random
          })
        }

        next(null, userObj)
      } else {
        setImmediate(next, null, userObj)
      }
    },
    callback
  )
}

//Random Avatar, Unsafe
function getRandomAvatar(done) {
  async.waterfall(
    [
      async.apply(Settings.getData),

      function(cachedSettings, next) {
        if (cachedSettings.customAvatar) {
          var reg = /{(\d+),(\d+)}/g
          var n = reg.exec(cachedSettings.customAvatar)
          var r = getRandomNumber(parseInt(n[1], 10), parseInt(n[2], 10))
          return next(null, cachedSettings.customAvatar.replace(reg, r))
        }

        var avatarsrc = 'https://cdn.jsdelivr.net/gh/yunluo/GitCafeApi/avatar/' + parseInt(Math.random() * (1999 - 1 + 1) + 1, 10) + '.jpg'
        next(null, avatarsrc)
      }
    ],
    done
  )
}

function getRandomNumber(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min, 10)
}

Core.buildHeader = function(data, callback) {
  async.waterfall(
    [
      async.apply(Settings.getData),
      function(cachedSettings, next) {

        if (cachedSettings.generateOnRefreash === 'on') {
          getRandomAvatar(function(err, random) {
            if (err) return next(err)
            avatarCache.set(data.req.uid, random)
          })
        }

        next(null, data)
      }
    ],
    callback(null, data)
  )

  // callback(null, data)
}

module.exports = Core
module.exports.Core = Core
