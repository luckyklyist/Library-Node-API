const express = require('express');
const routes = express.Router();
const Library = require('../models/library');

routes.get("/books", async (req, res) => {
    try {
        const data = await Library.find();
        res.status(200).json(data);
    }
    catch (err) {
        res.json({ "error": err.message })
    }
});

routes.post("/booker/add", async (req, res) => {
    try {
        console.log(req.body);
        const data = new Library(req.body);
        res.status(201).json(await data.save());
    }
    catch (err) {
        res.status(400).json({ "error message": err })
    }
})

routes.get("/book/:isbn", async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const data = await Library.find({ ISBN: isbn });
        if (!book) {
            res.status(404).json({ message: "Book not found" });
          } else {
            res.status(200).json(book);
          }
        res.status(200).json(data);
    }
    catch (err) {
        res.json({ "error message": err });
    }
})

routes.delete("/book/:isbn", async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const deleted_book = Library.findOneAndDelete({ ISBN: isbn }).lean().exec();
        res.json(deleted_book)
    }
    catch (err) {
        res.status(500).json({ "error msg": err.message });
    }
})

routes.patch("/book/:isbn", async (req, res) => {
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
