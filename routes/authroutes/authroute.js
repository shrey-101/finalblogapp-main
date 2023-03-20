const express = require('express');
const router = express.Router()
const User = require('../../models/authentication')
const passport = require('passport')
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

router.get('/signup',(req,res)=>{

    
    res.render('auth/signup');
})

router.post('/signup',upload.single('image'),async (req,res)=>{
    try{
        let result=null;
        if(req.file!=undefined){
            result = await cloudinary.v2.uploader.upload(req.file.path)
        }
      
        const user = await new User({email:req.body.email,image:result?result.secure_url:null,username:req.body.username});
        const newUser = await User.register(user,req.body.password);
        req.flash('success','user registered successfully')
        res.redirect('/login');
    }
   catch(err){
    req.flash('error','user cannot be registered');
    console.log(err.message);
    res.redirect('/signup');

   }

})

router.get('/login',(req,res)=>{
    res.render('auth/login');
})


router.post('/login',
    passport.authenticate('local',
        {
            failureRedirect: '/login',
            failureFlash: true
        }
    ), (req, res) => {
        
        if(req.user){
            req.flash('success', `welcome back ${req.user.username}`)
        }
        res.redirect('/blogs');
});
router.get('/logout',(req,res)=>{
    try{
        req.logOut();
        req.flash('success','logged out successfully');
        res.redirect('/login');
    }
    catch(err){
        req.flash('error','cannot be logged out');
        res.redirect('/login');
    }
    
})




module.exports = router;