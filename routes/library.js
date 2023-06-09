const express = require('express');
const routes = express.Router();
const Library = require('../models/library');
const {validateToken,checkPermission,checkBlockStatus}=require('../middlewares/auth');


routes.get("/books",validateToken, async (req, res) => {
    try {
        const data = await Library.find();
        res.status(200).json(data);
    }
    catch (err) {
        res.json({ "error": err.message })
    }
});

routes.post("/booker/add",validateToken,checkPermission(["admin"]), async (req, res) => {
    try {
        console.log(req.body);
        const data = new Library(req.body);
        res.status(201).json(await data.save());
    }
    catch (err) {
        res.status(400).json({ "error message": err })
    }
})

routes.get("/book/:isbn",validateToken,checkBlockStatus, async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const data = await Library.find({ ISBN: isbn });
        if (!data) {
            res.status(404).json({ message: "Book not found" });
          } else {  
            res.status(200).json(data);
          }
        // res.status(200).json(data);
    }
    catch (err) {
        res.json({ "error message": err });
    }
})

routes.delete("/book/:isbn",validateToken,checkPermission(["admin","librarian"]), async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const deleted_book = Library.findOneAndDelete({ ISBN: isbn }).lean().exec();
        res.json(deleted_book)
    }
    catch (err) {
        res.status(500).json({ "error msg": err.message });
    }
})

routes.patch("/book/:isbn",validateToken,checkPermission(["admin","librarian"]), async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const newData = req.body;
        const newUpdateBook = Library.findOneAndUpdate({ ISBN: isbn }, newData);
        res.status(200).json(await newUpdateBook)
    }
    catch (err) {
        res.status(500).json({ "error message": err })
    }
})


module.exports = routes;
