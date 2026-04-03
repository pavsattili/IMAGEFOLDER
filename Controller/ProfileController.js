var Product = require("../Model/ProductModel");
const { uploadToCloudinary } = require("../helper/cloudinaryhelper");
var User = require("../Model/UserModel")
var bcrypt = require("bcrypt")
var getProfile = async(req,res)=>{
    try{
        var userId = req.params.id
        if(!userId){
            return res.status(400).json({message: "User Id is required"})
        }
        var user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json({user})
    }catch(error){
        console.log("error",error)
        res.status(500).json({message: "Server error"})
    }
}
var addProfile = async(req,res)=>{
    try{
        // var userId = req.params.id
        // if(!userId){
        //     return res.status(404).json({message: "no user created"})
        // }
        var {name,email,password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({message: "all fields are required"})
        }

        var existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message: "User already exists"})
        }
        var hashedPassword = await bcrypt.hash(password, 10)
        var newUser = new User({
            name,
            email,
            password : hashedPassword
        })
        var savedUser = await newUser.save()
        res.status(201).json({savedUser})
       
    }catch(error){
        console.log("error",error)
        res.status(500).json({message:"Server error"})
    }
} 
var updateProfile = async(req,res)=>{
    try{
        var userId = req.params.id
          if(!userId){
            return res.status(404).json({message: "no user id"})
          }
          var {name,email,password} = req.body
          var updatedUser = {}
          if(name){
            updatedUser.name = name
          }
          if(email){
            updatedUser.email = email
          }
          if(password){
            var hashedPassword = await bcrypt.hash(password,10)
            updatedUser.password = hashedPassword
          }
          var updateUserdata = await User.findByIdAndUpdate(userId,updatedUser,{new : true})
          res.status(200).json({updateUserdata})
    }catch(error){
        console.log("error",error)
        res.status(500).json({message: "Server error"})
    }
}

var deleteProfile = async(req,res)=>{
    try{
        var userId = req.params.id
        if(!userId){
            return res.status(404).json({message: "user id required"})
        }
        var deletedUser = await User.findByIdAndDelete(userId)
        if(!deletedUser){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json({message:"user deleted successfully", data: deletedUser})
    }catch(error){
        console.log("error",error)
        res.status(500).json({message:"Server error"})
    }
}

module.exports = {getProfile,updateProfile, addProfile, deleteProfile}




