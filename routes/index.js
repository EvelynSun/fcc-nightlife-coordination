
var yelp = require('node-yelp');
var dotenv = require('dotenv')



 /**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
 
 dotenv.config({silent: true});
dotenv.load({ path: '.env' });

var consumer_key = process.env.YELP_COMSUMER_KEY;
var consumer_secret = process.env.YELP_COMSUMER_SECRET;
var token = process.env.YELP_TOKEN;
var token_secret = process.env.YELP_TOKEN_SECRET;

module.exports = function(app) {
    app.get('/',function(req,res,next){
        res.render('home',{
            title:'test'
        });
    });
    
    app.post('/search',function(req,res,next){
        
        
        
        console.log('post sea');
        console.log('consumer_key'+ token_secret);
        
        var client = yelp.createClient({
              oauth: {
                "consumer_key": consumer_key,
                "consumer_secret": consumer_secret,
                "token": token,
                "token_secret": token_secret
              },
                
              // Optional settings: 
              httpClient: {
                maxSockets: 10  // ~> Default is 10 
              }
            });
            
            client.search({
                terms: "cafe",
                location: req.body.location
            }).then(function (data) {
                
                 var businesses = data.businesses;
                 var location = data.region;
             
              console.log('searchdata'+data.region.span.latitude_delta)
              console.log('url'+businesses[1].id)
              res.render('home',{
            title:'test3',
            infos:data.region.span.latitude_delta,
            businesses:businesses,
            
        })
            });
 
 
       
    })
}