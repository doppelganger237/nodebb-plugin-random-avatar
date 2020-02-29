'use strict';

/* 全局定义了 $, app, socket, define */

define('admin/plugins/random-avatar', ['settings', 'admin/modules/colorpicker'], function (Settings,colorpicker) {
	var ACP = {};

	ACP.init = function () {


    Settings.load('random-avatar', $('.random-avatar-settings'));


		$('#save').on('click', function () {
			Settings.save('random-avatar', $('.random-avatar-settings'), function () {
				app.alert({
					type: 'success',
					alert_id: 'random-avatar-saved',
					title: 'Settings Saved',
					message: 'Click to restart your nodebb.',
					clickfn: function () {
						socket.emit('admin.reload');
					},
				});
			});
		});
	};




	return ACP;
});
