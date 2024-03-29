var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		min: 6
	},
	password: {
		type: String,
		required: true
	}

});

UserSchema.pre('save', function(callback){
	var user = this;

	if(!user.isModified('password')) return callback();

	bcrypt.gebSalt(5, function(err, salt) {
		if(err) return callback(err);

		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err) return callback(err);
			user.password = hash;
			callback();
		});
	});
});



module.exports = mongoose.model('User', UserSchema);