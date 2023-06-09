import User from "../model/User";
import Blogs from "../model/Blogs";

export const getAllUser = async(req,res,next)=>{
    let users;
    try{
        users = await User.find();
    }catch(err){
        console.log(err)
    }
    if(!users){
        return res.status(404).json({message: "No Users Found"})
    }
    return res.status(200).json({users});
};

export const signup = async(req,res,next)=>{
    let {name,email,password} = req.body
    let existingUser;

    try{
        existingUser = await User.findOne({email});
    }catch(err){
        return console.log(err)
    } 

    if(existingUser){
        return res.status(400).json({message: "User Already Exists"});
    }

    let user = new User({
        name,
        email,
        password,
        blogs: [],
    });

    try{
        await user.save()
    }catch(err){
        return console.log(err)
    }

    return res.status(200).json({user})
}

export const login = async(req,res,next)=>{
    let {email,password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err){
        return console.log(err);
    }

    if(!existingUser){
        return res.status(404).json({message:"User not found!!!!"});
    }

    if(password != existingUser.password){
        return res.status(400).json({message:"Incorrect Password"});
    }

    return res.status(200).json({message:"Login Successfull"})
}