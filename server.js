/**
 * Module dependencies.
 */
var express = require('express');

var crypto = require('crypto');
//var https = require('https');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var logger = require('morgan');
var dotenv = require('dotenv');
var passport = require('passport');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();


app.use(express.bodyParser());
/**
 * define routes
 */

var routes = require('./routes/index');

routes(app);

var api = require('./api/index');

//app.use('/api',api);


/**
 * express configuration
 */
 
 app.set('views',path.join(__dirname,'views'));
 app.set('view engine','pug');

 
 app.use(express.static(path.join(__dirname,'public')));
 
   /**
     * connect to MongoDB
     *
     */
     mongoose.Promise = global.Promise
     //var mongouri = process.env.MONGODB_URI || process.env.MONGOLAB_URI;
     
     //var mongouri = process.env.MONGOLAB_URI
    var mongouri = 'mongodb://localhost:27017/test';
     mongoose.connect(mongouri,function(){
      console.log('MongoDB now is connected to'+ mongouri);
     });
     
     
     mongoose.connection.on('error',()=>{
       console.log('MongoDB Connection Error.Please make sure that the MONGODB is running');
       
       process.exit(1);
     });
     
 var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
  module.exports =app;