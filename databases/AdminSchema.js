const mongoose = require('mongoose');

const {Schema} = mongoose;

const schema = new Schema({

    name:{ type:String, require:true  },

    username:{ type:String, required:true },

    email:{ type:String, required:true },

    password:{ type:String, required:true },

    avatar:{ type:String, default:null },

    is_active:{ type:Boolean, default:true, },

    last_active:{ type:Date, default: Date.now },

    created_at:{ type:Date, default: null },

    updated_at:{ type:Date, default: Date.now },

    deleted_at:{ type:Date, default: null }

});


schema.pre('save', function(next) {
    if (this.isNew) {
        this.created_at = Date.now();
    }
    this.updated_at = Date.now();
    return next();
});

module.exports = schema;