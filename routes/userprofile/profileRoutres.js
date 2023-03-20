const express = require('express');
const router = express.Router();
const User = require('./../../models/authentication');
const {isloggedin} = require('../../middleware/middlewares')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const cloudinary = require('cloudinary')
const dotenv=require('dotenv');
dotenv.config();


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

router.get('/viewprofile',isloggedin,(req,res)=>{
    res.render('profile/userprofile');
})
router.get('/updateprofile',isloggedin,(req,res)=>{
    res.render('profile/editprofile');
})




router.patch('/updateprofile/:id', upload.single('image') ,async (req,res)=>{
    try{
        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path)
            const user = await User.findByIdAndUpdate(req.params.id,{
                email:req.body.email,
                image:result.secure_url,
                username:req.body.username
            });
        }
        else{
            const user = await User.findByIdAndUpdate(req.params.id,{
                email:req.body.email,
                username:req.body.username
            });
        }
        
        req.flash('success','Profile updated successfully');
        res.redirect('/viewprofile');
    }
    catch(err){
        req.flash('error','Profile cannot be updated');
        res.redirect('/viewprofile');
    }

    
})

module.exports=router;