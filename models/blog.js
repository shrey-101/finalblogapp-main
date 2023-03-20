const mongoose = require('mongoose');
const Review = require('./review');
const domPurifire = require('dompurify');
const {JSDOM} = require('jsdom');
const htmlPurify = domPurifire(new JSDOM().window)
const stripHtml = require('string-strip-html');

blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    descp:{
        type:String,
        required:true
    },
    blogText:{
        type:String,
        required:true
    },
    authorName:{
        type:String
    },
    type:{
        type:String,
        required:true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
});

blogSchema.pre('validate',function(next){
    if(this.blogText){
        this.blogText=htmlPurify.sanitize(this.blogText);
    }
    next();
})

const Blog = mongoose.model('Blog',blogSchema);

module.exports=Blog
