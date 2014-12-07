var mongoose = require('mongoose');

var VideoSchema = new mongoose.Schema({
	title: String,
	description: String,
	video_url: String,
	thumb_url: String,
	user_id: {
		type: mongoose.Schema.ObjectId
	}
});

module.exports = mongoose.model('Video', VideoSchema);