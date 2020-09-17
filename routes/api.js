const express = require('express');
const router = express.Router();
const Library = require('../model/library');

// GET route for all books
router.get('/api', (req,res) => { 
    Library.find().then(data => res.json(data));
});

// POST route that saves a book to the database
router.post('/api/library/', (req,res) => {
    
    let book = new Library({
        title: req.body.title
    });

    book.save().then(data => res.json(data)).catch(err => res.status(400).json({Error: err}))
})

// POST route adds a review to the individual book
router.post('/api/library/bookreview:id', (req,res) => {
    
    Library.updateOne({_id: req.params.id}, {review: req.body.review}).then(b => console.log(b)).catch(err => console.log(err))
})
// DELETE route that deletes a book from the database
router.delete('/api/library/:id', (req,res) => {
    
    Library.deleteOne({_id: req.params.id}, err => console.log(err));
})

module.exports = router;