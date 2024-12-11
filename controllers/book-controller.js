const {UserModel,BookModel} = require("../models/index");

const IssuedBook = require("../dtos/book-dto");

exports.getAllBooks = async(req,res) => {
    const book = await BookModel.find();
    if(book.length === 0){
        return res.status(404).json({
            success: false,
            message:"No Books Found"
        })
    }
    res.status(200).json({
        success:true,
        message:"Books Found",
        data: book
    })
}

exports.getBookById = async(req,res) => {
    const { id } = req.params;
    const book = await BookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book with this id doesn't exists"
        })
    }
    return res.status(200).json({
        success:true,
        message: "Book exists",
        data: book
    });
}

exports.getAllIssuedBooks = async(req,res) => {
    const users = await UserModel.find({
        issuedBook: {$exists:true}
    }).populate("issuedBook");

    const issuedBooks = users.map((each)=> new IssuedBook(each));
    if(issuedBooks.length === 0){
        return res.status(404).json({
            success:false,
            message:"There is no books Issued"
        })
    }
    res.status(200).json({
        success:"true",
        message:"All Issued Books are displayed",
        data:issuedBooks
    });
}

exports.addNewBook = async(req,res) => {
    const { data } = req.body;
    
    await BookModel.create(data);
    const allBooks = await BookModel.find();
    return res.status(200).json({
        success:true,
        message:"Book Created Successfully",
        data:allBooks
    })
}

exports.updateBookById = async (req,res) => {
    const { id } = req.params;
    const { data } = req.body;

    if(!data){
        return res.status(400).json({
            success:false,
            message:"No datas to Update"
        })
    }

    const updatedBook = await BookModel.findOneAndUpdate({
        _id: id,
    },data,{
        new:true
    })
    return res.status(200).json({
        success:true,
        message:"Book updated Successfully",
        data: updatedBook
    })
}