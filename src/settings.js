(function (Settings) {
  'use strict';

  var meta = require.main.require('./src/meta')
  var settingsCache = null,
      defaults      = {
        customAvatar:'https://cdn.jsdelivr.net/gh/yunluo/GitCafeApi/avatar/{1,1999}.jpg'
      };

  Settings.init = function (done) {
      meta.settings.get('random-avatar', function (error, settings) {
          if (error) {
              return done(error);
          }
          settingsCache = Object.assign(defaults, settings);
          done(null);
      });
  };



  Settings.getData = function (done) {
      done(null, settingsCache);
  };

  // 保存配置
  Settings.save = function (settings, done) {
      settingsCache = Object.assign(settingsCache, settings);
      meta.settings.set('random-avatar', settingsCache, function (error) {
          done(error, settingsCache);
      });
  };

})(module.exports);
