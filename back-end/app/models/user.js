var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    email: String,
    tokenCount: Number,
    accessTokens: [{
    	accessTokenId: Number,
    	accessTokenValue: String
    }]
});



module.exports = mongoose.model('User', UserSchema);