angular.module('controllers.notifications', [])
	.controller('notifications', ['$rootScope','$interval','socketio', function(rootScope, interval, socketio){
	


	console.log("****79797878787878787878**********-****-------************"+typeof(socketio.on) + "**************-****-------************");


	

		socketio.on('emitmessage', function(data){
			console.log("message emited from the sever: " + data.notifi);
			rootScope.notificationList.push(data);

		}); 	

	





			rootScope.notificationList = [ 
										{notifi : "Train 001 Araived to the Station ex", id : "id001"},
										{notifi : "Train 002 Araived to the Station", id : "id002"},
										{notifi : "Train 003 Araived to the Station ex", id : "id003"},
										{notifi : "Train 004 Araived to the Station", id : "id004"},
										{notifi : "Train 005 Araived to the Station ex", id : "id005"},
										{notifi : "Train 006 Araived to the Station", id : "id006"}
							
													
									 ]	
			
		rootScope.counter = 0;
	
		rootScope.startTimeout = function(){console.log("#7");
				rootScope.timer = interval(function(){ console.log("#8"); //this line doesn't executes. callback doesn't calls. start debugging from here.
						 rootScope.counter++;
						 
						// rootScope.notifiMap  = new Map();
						// console.log("## " + typeof(rootScope.notifiMap));
								

									rootScope.notifiMap.forEach(function(value, key){
									console.log("#9");
									     if(rootScope.counter == value){console.log("#10");
											var msgIndex = rootScope.notificationList.map(function(el){
											console.log("#11");
													return el.id
												}).indexOf(key);			
														
												 rootScope.notificationList.splice(msgIndex, 1);
												 console.log(key + "removed from the list");console.log("#12");							
														
												 		//	socketio.emit('cmessage', {jsstr : "test json text"})
														}

										
													}, rootScope.notifiMap);
									
									console.log(rootScope.counter + " miliseconds passed");
										
															
				}, 1000);
				//rootScope.timerRef = rootScope.timer;
				console.log("#13" + typeof(timer));
				
			}
			
					rootScope.testTimerBool = false;
					rootScope.startTestTimer = function(){
							
							rootScope.testTimer = interval(function(){

									socketio.emit('cmessage', {jsstr : "test json text"})

							}, 3000);


					}

					rootScope.startTestTimer();



			
			rootScope.isTimerRunnig = false;
			rootScope.$watch("notificationList.length", function(newVal, oldVal){
					console.log("#1 " + oldVal + " " + newVal);
					if(newVal > 0 && !rootScope.isTimerRunnig){ //removed from the statment  && newVal > oldVal
					console.log("#2");
					//executes if only array has elements and no timer is running currently and upon increment. 
					rootScope.counter = 0;
					
					//map
					 rootScope.notifiMap  = new Map();
						 console.log("## " + typeof(rootScope.notifiMap));
					
					
					//map..
					
					
					
					for(i = 0; i < rootScope.notificationList.length; i++){ // initializing list.
					console.log("#3 " + i + " " + typeof(rootScope.notifiMap));
										rootScope.notifiMap.set(rootScope.notificationList[i].id,rootScope.counter + 7 );
											}
					
					
					rootScope.startTimeout();
					
					
					   rootScope.isTimerRunnig = true;
						}else if(oldVal > newVal && newVal==0){
								console.log("#4");
							interval.cancel(rootScope.timer);
							rootScope.isTimerRunnig = false;
							
							}else if(rootScope.isTimerRunnig && newVal > oldVal){
							console.log("#5");
								for(var j = oldVal-1; j < newVal ; j++ ){
										console.log("#6");
									rootScope.notifiMap.set(rootScope.notificationList[j].id, rootScope.counter + 7);
										
									}
							
							 
							
								}
					
					
					
				
					 
				});
			
			
			}]);