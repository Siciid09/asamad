const router = require('express').Router();
let Place = require('../models/place');

// GET ALL PLACES
router.route('/').get((req, res) => {
    Place.find()
        .then(places => res.json(places))
        .catch(err => res.status(400).json('Error: ' + err));
});

// GET A SPECIFIC PLACE BY ID
router.route('/:id').get((req, res) => {
    Place.findById(req.params.id)
        .populate('nearbyHotelId') // Populates the nearby hotel details
        .then(place => res.json(place))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
