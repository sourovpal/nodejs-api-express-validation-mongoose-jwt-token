const mongoose = require('mongoose');

const {Schema} = mongoose;

const schema = new Schema({

    user_id:{ type: mongoose.Types.ObjectId, required:true },

    guard:{ type: String, required:true },

    device_name:{ type:String, default:null  },

    location:{ type:String, default:null },

    ip_address:{ type:String, default:null },

    access_token:{ type:String, required:true },

    token_type:{ type:String, required:true },

    token_secret:{ type:String, required:true },
    
    expires_in:{ type:String, required:true },

    is_active:{ type:Boolean, default:true },

    created_at:{ type:Date, default: Date.now },

    updated_at:{ type:Date, default: Date.now },

    deleted_at:{ type:Date, default: null }

});

module.exports = schema;