
(function (Sockets) {
  'use strict';


  var sockets = require.main.require('./src/socket.io/plugins');

  Sockets.init = function (callback) {
      sockets['random-avatar'] = {};
      //Acknowledgements
      sockets['random-avatar'].getSettings = Sockets.getSettings;
      sockets['random-avatar'].saveSettings = Sockets.saveSettings;
      callback();
  };


  Sockets.getSettings = function (socket, payload, callback) {
      controller.getSettings(callback);
  };



/*   Sockets.saveSettings = function (socket, payload, callback) {
      controller.saveSettings(payload, callback);
  }; */

})(module.exports);
