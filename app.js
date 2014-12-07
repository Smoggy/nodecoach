var express    = require('express'); 
var app        = express(); 			
var bodyParser = require('body-parser');
var multiparty = require('multiparty');
var typeis = require('type-is');
var util = require('util');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/icoach');
var Video = require('./models/video');

var port = process.env.PORT || 8080; 	

var router = express.Router(); 		

router.get('/', function(req, res) {
	res.json({ message: 'api for instacoach made with node and express' });	
});

var photoUpload = function(req,res,next){
	if (!typeis(req, 'multipart/form-data')) return next();
	req.body = req.body || {};
    req.files = req.files || {};

	var form = new multiparty.Form({
		autoFiles: true,
		uploadDir: './public/uploads'
	});
	//too simple, I have to check type of the file, and catch errors
	form.parse(req, function(err, fields, files) {
		req.body.title = fields.title;
		req.body.description = fields.description;
		req.body.video_url = fields.video_url;
		req.body.thumb_url = files['avatar'][0]['path'];
    	next();
	});
}
router.route('/videos').post(photoUpload, function(req, res) {
 	
 	var video = new Video();

 	video.title = req.body.title;
    video.description = req.body.description;
    video.video_url = req.body.video_url;
    video.thumb_url = req.body.thumb_url;

	  video.save(function(err) {
	    if (err) res.send(err);
	    res.json({ message: 'Video was created!', data: video });
	  });
});


app.use('/api', router);
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

app.listen(port);
console.log('Magic happens on port ' + port);
