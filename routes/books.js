const express = require("express");

const {UserModel,BookModel} = require("../models/index");

const {getAllBooks,
    getBookById,
    getAllIssuedBooks,
    addNewBook,
    updateBookById} = require("../controllers/book-controller");

// const { books } = require("../data/books.json");
// const { users } = require("../data/user.json");

const router = express.Router();


/* 
   Route : /books,
   Method : GET,
   Description : Getting all the books.
   Parameters : none.
*/

router.get("/",getAllBooks);


/* 
   Route : /books/id,
   Method : GET,
   Description : Getting books by id.
   Parameters : Id.
*/

router.get("/:id",getBookById);

/* 
   Route : /books/issued,
   Method : GET,
   Description : Getting all the issued books.
   Parameters : None.
*/

router.get("/issued",getAllIssuedBooks);


/* 
   Route : /books,
   Method : POST,
   Description : Creating new books.
   Parameters : none.
*/

router.post("/",addNewBook);

/*
   Route : /books/id,
   Method : PUT,
   Description : Updating the Books.
   Parameters : id.
   datas: id,name,author,genre,price,publisher
*/

router.put('/updateBooks/:id',updateBookById);

module.exports = router;