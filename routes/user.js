const express = require("express");

const {UserModel,BookModel} = require("../models/index");

const {getAllUsers,
       createUser,
       getUserById,
       deleteUser,
       updateUser} = require("../controllers/user-controller");
// const { users } = require("../data/user.json");  This line is for handling the user datas

const router = express.Router();

/* 
   Route : /users,
   Method : GET,
   Description : Get all the users
   Access : Public,
   Parameters : none
*/

router.get("/",getAllUsers);

/* 
   Route : /users,
   Method : POST,
   Description : Creating new user
   Parameters : none
*/

router.post("/",createUser)

/* 
   Route : /users/:id,
   Method : GET,
   Description : Getting user by their ID.
   Parameters : ID.
*/


router.get("/:id",getUserById);

/* 
   Route : /users/:id,
   Method : PUT,
   Description : Updating user by their ID.
   Parameters : ID.
*/

router.put("/:id",updateUser);

/* 
   Route : /users/:id,
   Method : DELETE,
   Description : Deleting user by their ID.
   Parameters : ID.
*/

router.delete("/:id",deleteUser);

/* 
   Route : /users/subscription-details/:id,
   Method : GET,
   Description : Getting the users' subscription details.
   Parameters : ID.
*/
router.get("/subscription-details/:id",(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=> each.id === id);
    if(!user){
        res.status(400).json({
            success:false,
            message:"User with this ID not found"
        });
    }
    const DateinDays = (data = "") =>{
        let date;
        if(data == ""){
            date = new Date();  
        }
        else{
            date = new Date(data);
        }
        let days = Math.floor(date/(1000*60*60*24));
        return days;
    }
    const subscriptionType = (date)=>{
        if(user.subscriptionType === "Basic"){
            date += 90;
        }
        else if(user.subscriptionType === "Standard"){
            date += 180;
        }
        else if(user.subscriptionType === "Premium"){
            date += 365;
        }
        return date;
    }
    const returnDate = DateinDays(user.returnDate);
    const currDate = DateinDays();
    const subscriptionDate = DateinDays(user.subscriptionDate);
    const subscriptionExpire = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        isSubscriptionEnd : subscriptionExpire <= currDate,
        daysLeftForExpire:
        subscriptionExpire <= currDate ? 0 : subscriptionExpire - currDate,
        fine : 
        returnDate <= currDate ? 
            subscriptionExpire <= currDate
               ?100
               :50
        :0
    }
    return res.status(200).json({
        success:true,
        message:"Subscription details for user is:",
        data,
    })
})


module.exports = router;