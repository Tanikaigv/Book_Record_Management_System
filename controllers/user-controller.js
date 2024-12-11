const {UserModel,BookModel} = require("../models/index");
const mongoose = require("mongoose");
const { deleteOne } = require("../models/user-model");

exports.getAllUsers = async(req,res)=>{
    const users = await UserModel.find();
    if(users.length === 0){
        return res.status(404).json({
            success:false,
            message:"No users Found in the DB"
        })
    }
    res.status(200).json({
        success:true,
        message:"Users Found",
        data:users
    })
}

exports.createUser = async(req,res)=>{
    const { data } = req.body;
    await UserModel.create(data);
    const users = await UserModel.find();
    return res.status(201).json({
        success:true,
        message:"User created successfully",
        data: users
    });
}

exports.getUserById = async(req,res)=>{
    const { id } = req.params
    const user = await UserModel.findById(id);
    if(!user){
        res.status(404).json({
            success:false,
            message:"User with this ID not found"
        });
    }
    res.status(200).json({
        success:true,
        message:"User Found",
        data:user
    })
}

exports.deleteUser = async(req,res)=>{
    const { id } = req.params;
    const user = await UserModel.deleteOne({_id : id});
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User ID doesn't exists"
        })
    }
    const remainingUsers = await UserModel.find();
    return res.status(200).json({
        succes:true,
        message:"User Deleted Successfully and the remaining Users are",
        data:remainingUsers
    })
};


// (req,res)=>{
//     const { id } = req.params;    // Request to the server to check the id
//     const { data } = req.body     // Request the data to the server which i need to update.
    
//     const user = users.find((each)=> each.id === id)

//     if(!user){
//      return res.status(404).json({
//             success:false,
//             message: "User Id dosen't exists"
//         })
//     }
//     const updateUserData = users.map((each)=>{
//         if(each.id === id){
//         return{
//             ...each,  // '...' is the spread operator used in JS arrays to access all the elements (here accessing each elements) 
//             ...data   // here accessing only the datas which the user need to update (which we give in body section).
//           }
//         }
//         return each;
//     })
//     res.status(200).json({
//         success:true,
//         message:"Updated user data successfully",
//         data: updateUserData
//     })

// }

exports.updateUser = async(req,res)=>{
    const { id } = req.params;
    const { data } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
        {_id:id},
        {
            $set:{
                ...data
            }
        },
        {
            new:true
        }
    );
    res.status(200).json({
        success:true,
        message:"Updated user data successfully",
        data: updatedUser
    })
}