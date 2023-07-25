const mongoose = require('mongoose');
const AdminSchema = require('../databases/AdminSchema');


module.exports = mongoose.model('admins', AdminSchema);