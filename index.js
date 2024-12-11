const express = require("express");          //Getting the Express package

const dotenv = require("dotenv");
const DbConnection = require("./databaseConnection.js");


const  userRouter  = require("./routes/user.js");    //This is for routing 
const  booksRouter = require("./routes/books.js");    //This is for routing 


dotenv.config();
const app = express();                       // Initialization of Express

DbConnection();
const PORT = 8082;
app.use(express.json());                     // Using the express

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Server is up and running :-)"
    });
});

app.use("/users",userRouter);
app.use("/books",booksRouter);


app.get("*",(req,res)=>{
    res.status(404).json({
        message:"This route does not exist"
    })
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})