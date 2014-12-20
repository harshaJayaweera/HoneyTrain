'use strict';
angular.module('webPlayer', [

		"ngSanitize",
		"com.2fdevs.videogular",
		"com.2fdevs.videogular.plugins.controls",
		"com.2fdevs.videogular.plugins.overlayplay",
		"com.2fdevs.videogular.plugins.buffering",
		"com.2fdevs.videogular.plugins.poster",
		'controllers.notifications'
		

	]).controller('playerController',
						["$sce","$scope","EditModel", "$rootScope", function($sce,scope,ser,rS){
							
							this.config = {

								sources : [
									{src: $sce.trustAsResourceUrl("sampleVids/1.mp4"), type: "video/mp4"}


								],

								tracks: [
										{	
										src: "Scripts/videogular-master/app/assets/subs/pale-blue-dot.vtt",
										kind: "subtitles",
										srclang: "en",
										label: "English",
										default: ""
										}
									],
								

								theme: "Scripts/videogular-master/app/styles/themes/default/videogular.css",
								plugins: {

									poster: "Scripts/videogular-master/app/assets/images/videogular.png"
								}


							}; 
							
							
							scope.doUpdateScp = function(){
							console.log("ng-ckick works. from controller");
							rS.doUpdateModel();
							
							}
							
							
							


								}]

		)
		.factory('EditModel', ["$rootScope", function(rootScope){
		
		
			rootScope.incre = 40; //remove later, temporary id generator for testing purposes.	
				
			rootScope.doUpdateModel = function(){
			
			console.log("ng-ckick works. from service");
			console.log(rootScope.notificationList[0]);
			rootScope.incre++;
			var strVal = (rootScope.incre);
			console.log("str val: " + strVal);
			rootScope.notificationList.push({notifi : "Train xxx Araived to the Station", id : "id"+strVal});
			console.log({notifi : "Train xxx Araived to the Station", id : "id"+strVal}.id + " manually updated");
			
			//notificationList[0] = {notifi : "111111"};
			
			}
		
		
		}]).factory('socketio', ['$rootScope', function(rS){

				console.log("*****************+++++++++******++++" + typeof(io.connect)+"222222222fffffffff22222222");

			var socket = io.connect('http://localhost:3000');

			return{

				on:function(eventName, callback){

					socket.on(eventName, function(){
						var args = arguments;
						rS.$apply(function(){
							if (callback) {
								callback.apply(socket, args);
								};

							});

							});

				},

				emit: function(eventName, data, callback){
					socket.emit(eventName, data, function(){
						var args = arguments;
						rS.$apply(function(){
								if (callback) {
								callback.apply(socket, args);

								}	
						});


					});

				}


				
			} 
	



		}])
		.directive(
	 "vgOnloadApp",
	 ["VG_STATES", function(VG_STATES){
		 return {
		 restrict: "E",
		 require: "^videogular",
		 
		 link: function(scope, elem, attr, API){
			console.log(typeof(API));
	
		API.toggleFullScreen();
			console.log("executed");
			
			
	 
			}
		  }
		}]);