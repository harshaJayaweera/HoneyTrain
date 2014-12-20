var express = require('express');
var io = require('socket.io');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

  var routes = require('./routes/index'); // this is the router object.
  var users = require('./routes/user');


  var app     = express(),
      server  = require('http').createServer(app),
      sio     = io.listen(server); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', routes);
app.use('/users', users);
 

app.use('/Scripts', express.static(__dirname + '/TrainTrackingWebApp/Scripts'));
app.use('/sampleVids', express.static(__dirname + '/TrainTrackingWebApp/sampleVids'));

var inc = 0;

  sio.on('connection', function(socket){     
    
      console.log("Connection has been established.");

      socket.on('cmessage', function(msg){
inc++;
var concStr = "id".concat(inc.toString());

          socket.emit('emitmessage', {notifi : "test json text", id:concStr });

          console.log("message from client is : " + msg.jsstr);

      });


      });


  app.get('/', function(req, res){

        res.sendFile(__dirname + '/TrainTrackingWebApp/playerApp.html');

    });

  app.post('/p', function(req, res){

          console.log("received from post: " + req.body);

     // sio.on('connection', function(socket){     
        //  console.log("connected to socket");
     // });

      

        //  socketS.emit('nmessage', {jsstr : "test json text"});

        


    });

  app.use('/', express.static(__dirname + '/TrainTrackingWebApp'));


   // sio.on('connection', function(socket){
     
     //   console.log("connected to socket");

  //  });

   //please uncomment    mongoose.connect('mongodb://localhost:27017/notifiListDb');

   //please uncomment         var notifiListDbSchema = mongoose.Schema({

//please uncomment                notifi : String,
               //please uncomment id : String

 //please uncomment               });



//please uncomment           var Notif = mongoose.model('Notif', notifiListDbSchema);

//please uncomment  routes.get('/data', function(req, res){
//please uncomment             Notif.find(function(err, notifics){

 //please uncomment               if(err)
//please uncomment                    res.send(err);

 //please uncomment                res.send(notifics);   
//please uncomment             });   
//please uncomment            });

 //please uncomment routes.post('/', function(req, res){
   //please uncomment             var NotifInstant = new Notif();
   //please uncomment              NotifInstant.notifi = req.body.notifi;
   //please uncomment              NotifInstant.id     = req.body.id;

                 /*saving to the database*/

   //please uncomment              NotifInstant.save(function(err){

     //please uncomment               if (err)
       //please uncomment                 res.send(err);
      //please uncomment              res.send({message : "Saved to database successfully."});
          //please uncomment          });

       //     });   








/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


app.set('server', server); 

module.exports = app;