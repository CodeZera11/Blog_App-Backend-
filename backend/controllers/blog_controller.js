import Blog from "../model/Blogs";
import User from "../model/User";
import mongoose from "mongoose"

export const getAllBlogs = async(req,res,next)=>{
    let blogs;
    try{
        blogs = await Blog.find();    
    }catch(err){
        return console.log(err);
    }

    if(!blogs){
        return res.status(404).json({message:"No Blogs Found"});
    }

    return res.status(200).json({blogs});
}

export const addBlog = async(req,res,next)=>{
    let {title,description,img,user} = req.body;

    let existingUser;

    try{
        existingUser = await User.findById(user);
    }catch(err){
        console.log(err);
    }

    if(!existingUser){
        res.status(404).json({message: "No such user found"});
    }

    let blog = new Blog({
        title,
        description,
        img,
        user
    });

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        session.commitTransaction();
    }catch(err){
        console.log(err);
        return res.status(500).json({message: err});
    }

    return res.status(200).json({message:`Blog with title: ${title} added successfully`});
}

export const updateBlog = async(req,res,next)=>{
    let {title,description} = req.body;
    let blogId = req.params.id;
    let blog;

    try{
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        });
    }catch(err){
        return console.log(err);
    }

    if(!blog){
        res.status(404).json({message:"No Blogs Found!!!!"});
    }

    return res.status(200).json({blog});
}

export const getById = async(req,res,next)=>{
    let blogId = req.params.id;
    let blog;
    
    try{
        blog = await Blog.findById(blogId)
    }catch(err){
        return console.log(err);
    }

    if(!blog){
        return res.status(400).json({message:`No blog found with id: ${blogId}`});
    }

    return res.status(200).json({blog});
}

export const deleteBlog = async(req,res,next)=>{
    let blogId = req.params.id;
    let blog;

    try{
        blog = await Blog.findByIdAndDelete(blogId).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }catch(err){
        return console.log(err);
    }

    if(!blog){
        return res.status(400).json({message:`Unable to delete blog with id: ${blogId}`});
    }

    return res.status(200).json({message:`Deleted blog with id: ${blogId}`});
    
}

export const getByUserId = async(req,res,next)=>{
    let userId = req.params.id;
    let userBlogs;

    try{
        userBlogs = await User.findById(userId).populate("blogs");
    }catch(err){
        return console.log(err);
    }

    if(!userBlogs){
        return res.status(404).json({message: "No blogs found"});
    }

    return res.status(200).json({userBlogs});
}