const mongoose = require('mongoose');
const Blog = require('./models/blog');

const arr = [
    {
        image:'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcHV0ZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        title:'How can you make computer science resume',
        descp:`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,`,
        blogText:`Your resume (sometimes called your "CV") is your most important tool when applying for a job. It doesn't matter how qualified you are, or how much experience you have - if your resume is poorly presented or badly written, you're going to have trouble getting the job you want - or even an interview.
        Taking the time to work on your resume is really important. The information on this page offers some tips and advice on how to make your resume the best it can be.'`,
        authorName:'Dhruv Gupta',
        type:'tech'
    },
    {
        image:'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcHV0ZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        title:'How can you make computer science resume',
        descp:`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,`,
        blogText:`Your resume (sometimes called your "CV") is your most important tool when applying for a job. It doesn't matter how qualified you are, or how much experience you have - if your resume is poorly presented or badly written, you're going to have trouble getting the job you want - or even an interview.
        Taking the time to work on your resume is really important. The information on this page offers some tips and advice on how to make your resume the best it can be.'`,
        authorName:'Dhruv Gupta',
        type:'tech'
    },
    {
        image:'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcHV0ZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        title:'How can you make computer science resume',
        descp:`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,`,
        blogText:`Your resume (sometimes called your "CV") is your most important tool when applying for a job. It doesn't matter how qualified you are, or how much experience you have - if your resume is poorly presented or badly written, you're going to have trouble getting the job you want - or even an interview.
        Taking the time to work on your resume is really important. The information on this page offers some tips and advice on how to make your resume the best it can be.'`,
        authorName:'Dhruv Gupta',
        type:'tech'
    },
    {
        image:'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcHV0ZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        title:'How can you make computer science resume',
        descp:`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,`,
        blogText:`Your resume (sometimes called your "CV") is your most important tool when applying for a job. It doesn't matter how qualified you are, or how much experience you have - if your resume is poorly presented or badly written, you're going to have trouble getting the job you want - or even an interview.
        Taking the time to work on your resume is really important. The information on this page offers some tips and advice on how to make your resume the best it can be.'`,
        authorName:'Dhruv Gupta',
        type:'tech'
    },
    {
        
        image:'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcHV0ZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        title:'How can you make computer science resume',
        descp:`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,`,
        blogText:`Your resume (sometimes called your "CV") is your most important tool when applying for a job. It doesn't matter how qualified you are, or how much experience you have - if your resume is poorly presented or badly written, you're going to have trouble getting the job you want - or even an interview.
        Taking the time to work on your resume is really important. The information on this page offers some tips and advice on how to make your resume the best it can be.'`,
        authorName:'Dhruv Gupta',
        type:'tech'
    },
    {image:'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcHV0ZXJzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title:'How can you make computer science resume',
    descp:`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,`,
    blogText:`Your resume (sometimes called your "CV") is your most important tool when applying for a job. It doesn't matter how qualified you are, or how much experience you have - if your resume is poorly presented or badly written, you're going to have trouble getting the job you want - or even an interview.
    Taking the time to work on your resume is really important. The information on this page offers some tips and advice on how to make your resume the best it can be.'`,
    authorName:'Dhruv Gupta',
    type:'tech'
    }
]


const seedDatabase = async()=>{
    await Blog.insertMany(arr);
    console.log("Database Seeded");
}

module.exports = seedDatabase;