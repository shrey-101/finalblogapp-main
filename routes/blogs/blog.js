const express = require('express');
const router = express.Router();
const Blog = require('../../models/blog');
const Review = require('../../models/review');
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



//show all the bloges

router.get('/blogs', isloggedin, async (req,res)=>{
    const Blogs = await Blog.find({});
    
    res.render('blogs/index',{Blogs});
})

//form to get a new blog

router.get('/blogs/new', isloggedin  ,(req,res)=>{
    res.render('blogs/new');
})


//creation of a new blog

router.post('/blogs', upload.single('image'),async (req,res)=>{
    console.log(req.file);

    try{
        result = await cloudinary.v2.uploader.upload(req.file.path)
        req.body.image = result.secure_url;
        console.log(req.body);
        await Blog.create(req.body);
        req.flash('success','Blog created successfully');
        res.redirect('/blogs');
    }
    catch(err){
        req.flash('error','Cannot create blog');
        res.redirect('/blogs');
    }
})


//Show a particular blog

router.get('/blogs/:id', async (req,res)=>{
        const foundBlog = await Blog.findById(req.params.id).populate('reviews');
        res.render('blogs/show',{foundBlog}); 
})


//form to edit a blog
router.get('/blogs/:id/edit',async(req,res)=>{
    
    const foundBlog = await Blog.findById(req.params.id);
    res.render('blogs/edit',{foundBlog});

})

//update a particular blog

router.patch('/blogs/:id',upload.single('image'), async(req,res)=>{
    if(req.file){
        try{
            const result = await cloudinary.v2.uploader.upload(req.file.path)
            req.body.image = result.secure_url;
            await Blog.findByIdAndUpdate(req.params.id,req.body);
            req.flash('success','Blog updated successfully')
            res.redirect(`/blogs/${req.params.id}`);
        }
        catch(err){
            req.flash('error','Blog cannot be updated');
            res.redirect(`/blogs/${req.params.id}`);
    
        }
    }

    else{
        try{
            
            await Blog.findByIdAndUpdate(req.params.id,req.body);
            req.flash('success','Blog updated successfully')
            res.redirect(`/blogs/${req.params.id}`);
        }
        catch(err){
            req.flash('error','Blog cannot be updated');
            res.redirect(`/blogs/${req.params.id}`);
    
        }
    }
})


//delete a blog

router.delete('/blogs/:id',async (req,res)=>{

    try{
        await Blog.findByIdAndDelete(req.params.id);
        req.flash('success','Blog deleted successfully');
        res.redirect('/blogs');
    }
    catch(err){
        req.flash('error','Blog cannot be deleted ');
        res.redirect('/blogs');
    }
})


router.post('/blogs/:id/reviews', async(req,res)=>{
    try{const foundBlog = await Blog.findById(req.params.id);
        const review = new Review({
            ...req.body,
            user:req.user.username
        });
        foundBlog.reviews.push(review);
    
        console.log(review);
    
        review.save();
        foundBlog.save();
       
        req.flash('success','review added successfully');
        res.redirect(`/blogs/${req.params.id}`);
        
    }
    catch(err){
        req.flash('error','review cannot be added');
        res.redirect(`/blogs/${req.params.id}`);
    }

})

router.delete('/comment/:rid/:pid', async (req,res)=>{
    const { rid, pid } = req.params;
    await Blog.findByIdAndUpdate(pid,{$pull:{reviews:rid}});
    res.redirect(`/blogs/${pid}`);
   })



module.exports=router;