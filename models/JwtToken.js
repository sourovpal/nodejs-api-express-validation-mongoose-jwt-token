const mongoose = require('mongoose');
const JwtTokenSchema = require('../databases/JwtTokenSchema');


module.exports = mongoose.model('jwt_tokens', JwtTokenSchema);