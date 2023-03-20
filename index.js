const dotenv=require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const path = require('path');
const seedDatabase = require('./seed');
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
const methodOverride = require('method-override');
app.use(methodOverride('_method'))
const passport = require('passport');
const localStrategy = require('passport-local');
const flash = require('connect-flash');
const session = require('express-session');
const multer = require('multer');
const cloudinary = require('cloudinary');



const User = require('./models/authentication')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }));

  app.use(flash());


const blogRouter = require('./routes/blogs/blog');
const authRouter = require('./routes/authroutes/authroute');
const profileRoutes = require('./routes/userprofile/profileRoutres');


const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex:true
})
.then(()=>{
    console.log("Database connected");
})
.catch(err=>{
    console.log("Error occured while connection");
    console.log(err.message);
})

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    
    next();
})



app.get('/',(req,res)=>{
    res.render('blogs/landing');
})


app.use(blogRouter);
app.use(authRouter);
app.use(profileRoutes);

//seedDatabase();


app.listen(process.env.PORT || 3000,()=>{
    console.log("server running at port number 3000");
})