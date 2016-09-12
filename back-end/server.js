// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var rp = require('request-promise');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var ramda = require('ramda');

mongoose.connect('mongodb://localhost/prototype'); // connect to our database
console.log(mongoose.connection.readyState);


 
mongoose.Promise = global.Promise;
var User     = require('./app/models/user');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var Promise = require('bluebird');

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();     



app.use(function(req, res, next) {
  console.log("a");
   res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

var router = express.Router();
router.use(function(req, res, next) {
 console.log("r");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
 
 next();
  });


         // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/users')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
    	 console.log(mongoose.connection.readyState);
     
    });


router.route('/user')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .post(function(req, res) {
   var promise = User.findOne({'email':'rahul.fakir@gmail.com'}).exec();

promise.then(function(user) {
  user.accessTokens = [
  {
  	"accessTokenId": 0, 
  	"accessTokenValue": "6ekgAnCmvIAAAAAAAAAAC-nNibbCvq7wlH5waEXsbrlRFaM1LAr_sjt7ukv7jMfX"
  },
  {
  	"accessTokenId": 1, 
  	"accessTokenValue": "fL1xV1lBqlAAAAAAAAAABwawUX6RxkJYBSljmQkXQ4i8wpe91dMe-7cL9FWFJi4P"
  },
  {
  	"accessTokenId": 2, 
  	"accessTokenValue": "L7-t8I_NsxAAAAAAAAAACAk0sf_H8n65v98_XdzYr6yEMyrlUD3V9xd0P_BTJz2W"
  },
  {
  	"accessTokenId": 3, 
  	"accessTokenValue": "_JpEqbVkXOAAAAAAAAAACErcfxX4s8FUeJ6ggiNzuo4Ed6pwMytEBMwjegqcLBi5"
  },
  {
  	"accessTokenId": 4, 
  	"accessTokenValue": "W1qj_2qR_6AAAAAAAAAAB1sKdkqQb5Chi3hryB95Ndlm5ewZ9__EEl9D1NMmQdKx"
  },
    {
  	"accessTokenId": 5, 
  	"accessTokenValue": "MZN_SQ0CMcAAAAAAAAAACEWzOBv5HHfkRp-yxkN95S-ONtHLauiVE20JZbPYZAJk"
  }
  ];
  //6ekgAnCmvIAAAAAAAAAAC-nNibbCvq7wlH5waEXsbrlRFaM1LAr_sjt7ukv7jMfX
console.log(user);
  return user.save(); // returns a promise
})
.then(function(user) {

  console.log('updated user: ' + user.name);
  // do something with updated user
})

    });


router.route('/save')
.post(function(req, res) {
  function co_Save(){}

  co_Save.prototype.getPrinters = Promise.coroutine(function* () {
	   var options = null;
	var promise = yield User.findOne({"email": "rahul.fakir@gmail.com"}).exec();
	var tokenCount = promise.tokenCount;
	var accessTokens = promise.accessTokens;
	var accessTokenToUse = null;
	for (i = 0; i < tokenCount; i++) { 
    var currentAccessToken = "Bearer " + accessTokens[i]["accessTokenValue"];
    console.log(currentAccessToken);
     options = {
    uri: 'https://api.dropboxapi.com/2/users/get_space_usage',
    method: "POST",
    headers: {
        'Authorization': currentAccessToken
    },
    json: true // Automatically parses the JSON string in the response 
};
 
var spaceAvailible = yield rp(options)
    .then(function (repos) {
       // console.log('User has %d repos', repos.length);
     
         //console.log(repos["allocation"]["allocated"] - repos["used"]);
        console.log(parseInt(req.body.size));
        return repos["allocation"]["allocated"] - repos["used"] > parseInt(req.body.size) ;
    })
    .catch(function (err) {
        // API call failed... 
        res.send(err);
    });


console.log(spaceAvailible);
     if (spaceAvailible) {
     	accessTokenToUse = currentAccessToken;
    	break;
}
}
console.log(accessTokenToUse  == null);

if (accessTokenToUse = null) {

} else {
	options = {
    uri: 'https://api.dropboxapi.com/2/files/save_url' + "/" + req.body.file_name,
    method: "POST",
    headers: {
        'Authorization': currentAccessToken,
     
    },
    body: {
    	'path': '/data.png',
    	'url': req.body.url

    },
    json: true // Automatically parses the JSON string in the response 
};
 
var status = yield rp(options)
    .then(function (repos) {
       // console.log('User has %d repos', repos.length);
     //console.log(repos);
        
        return repos ;
    })
    .catch(function (err) {
        // API call failed... 
        console.log(err);
        res.send(err);
    });

console.log(status);
}

  

});
  var save = new co_Save();
  var save_file = save.getPrinters();
  save_file.then(function(result){
    res.json(result);
});

})

router.route('/getFileList')
.post(function(req, res) {
  function co_GetFiles(){}

  co_GetFiles.prototype.getAllFiles = Promise.coroutine(function* () {
	
	  
	var promise = yield User.findOne({"email": "rahul.fakir@gmail.com"}).exec();
	
	var tokenCount = promise.tokenCount;
	var accessTokens = promise.accessTokens;
	var accessTokenToUse = null;
	var returnFileList = [];
	var returnDownloadList = [];
	for (i = 0; i < tokenCount; i++) { 
    var currentAccessToken = "Bearer " + accessTokens[i]["accessTokenValue"];
	options = {
    uri: 'https://api.dropboxapi.com/2/files/list_folder',
    method: "POST",
    headers: {
        'Authorization': currentAccessToken,
        'Content-Type': 'application/json'
    },
    body: {
    	"path": "",
		"recursive": false,
		"include_media_info": true,
		"include_deleted": false,
		"include_has_explicit_shared_members": false
    },
    json: true // Automatically parses the JSON string in the response 
};
 
var fileList = yield rp(options)
    .then(function (repos) {
       // console.log('User has %d repos', repos.length);
     
         //console.log(repos["allocation"]["allocated"] - repos["used"]);
      
         returnFileList = returnFileList.concat(repos['entries']);

       return repos['entries'];
      
    })
    .catch(function (err) {
        // API call failed... 
        res.send(err);
    });

console.log("kittens" + fileList.length);
var len = fileList.length;
    for (j=0; j < len; j++){


	options = {
    uri: 'https://api.dropboxapi.com/2/files/get_temporary_link',
    method: "POST",
    headers: {
        'Authorization': currentAccessToken,
        'Content-Type': 'application/json'
    },
    body: {
    	"path": "/" + fileList[j]['name'],
    },
    json: true // Automatically parses the JSON string in the response 
};
 
var links = yield rp(options)
    .then(function (repos) {
       // console.log('User has %d repos', repos.length);
     
         //console.log(repos["allocation"]["allocated"] - repos["used"]);
      
         returnDownloadList.push(repos["link"]);
     console.log(repos);
      
    })
    .catch(function (err) {
        // API call failed... 
        res.send(err);
    });































}

    break;
}






     
    	


console.log(accessTokenToUse  == null);


 
return {"files": returnFileList, "links": returnDownloadList};


  

});
  var getFiles = new co_GetFiles();
  var files = getFiles.getAllFiles();
  files.then(function(result){
    res.json(result);
});

})



	/*
 
    var devicePromises = R.map(resin.models.device.get, resin_ids);

    yield Promise.all( devicePromises);

    var result = [];
    for (i = 0; i < printers.length; i++){
      var obj = {};
      obj.name = printers[i].name;
      obj.user_permission = printer_permissions[printers[i]._id];
      obj.object_id = printers[i]._id;
      obj.serial_number = printers[i]. serial_number;

      if (devicePromises[0]._rejectionHandler0.is_online){
        obj.status = devicePromises[0]._rejectionHandler0.status; 
      } else {
        obj.status = "OFFLINE"; 
      }
    

      obj.last_online = devicePromises[0]._rejectionHandler0.last_seen_time; 
      obj.resin_id = devicePromises[0]._rejectionHandler0.uuid; 
      obj.string_location = devicePromises[0]._rejectionHandler0.location;
      obj.latitude = devicePromises[0]._rejectionHandler0.latitude;
      obj.longitude = devicePromises[0]._rejectionHandler0.longitude;

      result.push(obj);
    }

    return result;  
  });

*/





    

function test(email) {
var promise = User.findOne({"email": "rahul.fakir@gmail.com"}).exec();
promise.then(function(user) {
			var arr = user.accessTokens;
            var tokenCount = user.tokenCount;
            var map = {};

			map['accessTokenId'] = tokenCount + 1;
			map['accessTokenValue'] = 'kittens';
			arr.push(map);
			 user.accessTokens = arr;  // update the bears info
            user.tokenCount = tokenCount + 1;
  // do something with updated user
  return user.save();
}).then(function(user){
	return user;

});
}

function getFreeAccessToken(email, size){
	var promise = User.findOne({"email": email}).exec();
	promise.then(function(user) {
		var tokens = user.accessTokens;
		console.log(tokens.length);
  return user;
})
}





/*
	        User.findOne({"email" : email }, function(err, user) {

            if (err)
                res.send(err);
            var arr = user.accessTokens;
            var tokenCount = user.tokenCount;
            var map = {};

			map['accessTokenId'] = tokenCount + 1;
			map['accessTokenValue'] = 'kittens';
			arr.push(map);
            // res.json({ message: map });
            user.accessTokens = arr;  // update the bears info
            user.tokenCount = tokenCount + 1;
            // save the bear
            user.save(function(err) {
                if (err)
                    res.send(err);

          res.json(arr);

            });

        });*/



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
