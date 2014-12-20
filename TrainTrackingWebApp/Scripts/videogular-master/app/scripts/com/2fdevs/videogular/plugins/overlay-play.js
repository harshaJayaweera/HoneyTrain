/**
 * @license Videogular v0.7.1 http://videogular.com
 * Two Fucking Developers http://twofuckingdevelopers.com
 * License: MIT
 */
/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.plugins.overlayplay:vgOverlayPlay
 * @restrict E
 * @description
 * Shows a big play button centered when player is paused or stopped.
 *
 * ```html
 * <videogular vg-theme="config.theme.url" vg-autoplay="config.autoPlay">
 *    <vg-video vg-src="sources"></vg-video>
 *
 *    <vg-overlay-play></vg-overlay-play>
 * </videogular>
 * ```
 *
 */
"use strict";
angular.module("com.2fdevs.videogular.plugins.overlayplay", ["controllers.notifications"])
	.directive(
	"vgOverlayPlay",
	["VG_STATES", function (VG_STATES) {
		return {
			restrict: "E",
			require: "^videogular",
			controller : "notifications",
			template: "<div class='overlayPlayContainer' ng-click='onClickOverlayPlay()'>" +
			"<style type=\"text\/css\">tr{ background-color: #006699; font-size:50pt;} </style>"
			+"<div class='iconButton' ng-class='overlayPlayIcon' id='overlayWrapper' ng-switch='overlayPartial'> <div ng-switch-when='showOverlay'> <div ng-include=\"'dashboard.html'\"></div> </div> </div>" +
				"</div>",
						link: function (scope, elem, attr, API) {
							function onComplete(target, params) {
								scope.overlayPlayIcon = {play: true};
							}

							function onPlay(target, params) {
								scope.overlayPlayIcon = {};
							}

							function onChangeState(newState) {
								switch (newState) {
									case VG_STATES.PLAY:
										scope.overlayPlayIcon = {};
										break;

									case VG_STATES.PAUSE:
										scope.overlayPlayIcon = {play: true};
										break;

									case VG_STATES.STOP:
										scope.overlayPlayIcon = {play: true};
										break;
								}
							}

							scope.overlayPartial = "DontshowOverlay";
							
							scope.onClickOverlayPlay = function onClickOverlayPlay(event) {
							API.toggleFullScreen();
							
								API.playPause();
							//	var testPara = document.createElement("p");
								//var paraText  = document.createTextNode("appending inner html");
								//testPara.appendChild(paraText);
								//document.getElementById("overlayWrapper").appendChild(testPara);
								scope.overlayPartial = "showOverlay";
							};
							
							//controller for notification ng-repeat.
							//test updating model for dynamic updating, ng-repeat should be updated accordingly.
							//scope.notificationList = [  {notifi : "Train 001 Araived to the Station"},
								//						{notifi : "Train 002 Araived to the Station"},
									//					{notifi : "Train 003 Araived to the Station"},
									//					{notifi : "Train 004 Araived to the Station"},
										//				{notifi : "Train 005 Araived to the Station"},
											//			{notifi : "Train 006 Araived to the Station"}
							
													
												//	]

							
							
							scope.overlayPlayIcon = {play: true};

							scope.$watch(
								function () {
									return API.currentState;
								},
								function (newVal, oldVal) {
									if (newVal != oldVal) {
										onChangeState(newVal);
									}
								}
							);
							
							
						}
	

		}
		
		
		
						
							
	}
	]);




	
	
