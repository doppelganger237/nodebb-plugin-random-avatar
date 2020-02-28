'use strict'

var async = require('async'),
  plugin = {},
  avatarCache = {}

plugin.usersGet = function(users, callback) {
  async.map(
    users,
    function(userObj, next) {
      if (!userObj) {
        return next(null, userObj)
      }

      if (userObj.picture === null || userObj.picture === '') {
        var avatar = avatarCache[userObj.uid]
        if (avatar) {
          userObj.picture = avatar
        }else{
          userObj.picture =avatarCache[userObj.uid]= getRandomAvatar()
        }

        next(null, userObj)
      } else {
        setImmediate(next, null, userObj)
      }
    },
    callback
  )
}

function getGravatarUrl() {
  var baseUrl = getRandomAvatar()
  return baseUrl
}

//随机头像,直接用的云落的镜像
function getRandomAvatar($) {
  var avatarsrc = 'https://cdn.jsdelivr.net/gh/yunluo/GitCafeApi/avatar/' + parseInt(Math.random() * (1999 - 1 + 1) + 1, 10) + '.jpg'
  return avatarsrc
}

plugin.buildHeader = function(data,callback) {


    avatarCache[data.req.uid] = getGravatarUrl()

    callback(null, data);
  

  
}

module.exports = plugin
