const jwt =require("jsonwebtoken");
const randomstring = require("randomstring");
const JwtToken = require('../models/JwtToken');
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const { validationResult } = require("express-validator");


class AuthController{

    constructor(){
    }
    
    static async create(req, res){
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                error:true,
                errors: errors.array()
            });
        }


        var hashPass = await bcrypt.hash(req.body.password, 10);
        var stmt = await Admin.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashPass,
            avatar: 'sourovpal.jpg',
        });
        
        res.status(200).json({
            success: true,
            message: 'Registration successful',
        });
    }

    static async login(req, res){


        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                error:true,
                errors: errors.array()
            });
        }


        const adminUser = await Admin.findOne({email : req.body.email});

        if(adminUser){

            let matchPassword = await bcrypt.compareSync(req.body.password, adminUser.password);

            if(matchPassword){

                var expires_in = '365d';
        
                var secret = await randomstring.generate({length:50});

                var data = { user_id: adminUser.username, email:adminUser.email };

                var token = await jwt.sign(data, secret, {expiresIn: expires_in});

                JwtToken.create({
                    user_id:adminUser._id,
                    guard:'Admin',
                    device_name:'Dasktop',
                    location:'Dhaka',
                    ip_address:'1.01.00.01.0',
                    access_token:token,
                    token_type:'Bearer',
                    token_secret:secret,
                    expires_in:expires_in,
                    is_active:true,
                });

                var responce = {
                    token,
                    token_type:'Bearer',
                    expires_in,
                    message:"Login Successfull", 
                    user:adminUser
                };

                return res.json(responce);

            }else{
                return res.status(401).json({error:true, message:"Invalid Password"});
            }
        }else{
            return res.status(401).json({error:true, message:'Username not found'});
        }

    }

    static async logout(req, res){

        const token = req.headers.authorization.split(" ")[1];
        const jwt_token = await JwtToken.findOneAndUpdate({
            $and:[{access_token:token}, {is_active:true}, {deleted_at:null}]
        }, {
            is_active:false
        });
        return res.status(200).json({
            status:true,
            message:'Successfully Sign out.'
        });

    }
}

module.exports = AuthController;