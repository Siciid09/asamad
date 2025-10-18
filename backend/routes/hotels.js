const router = require('express').Router();
let Hotel = require('../models/hotel');

// GET ALL HOTELS
router.route('/').get((req, res) => {
    Hotel.find()
        .then(hotels => res.json(hotels))
        .catch(err => res.status(400).json('Error: ' + err));
});

// GET A SPECIFIC HOTEL BY ID
router.route('/:id').get((req, res) => {
    Hotel.findById(req.params.id)
        .then(hotel => res.json(hotel))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
