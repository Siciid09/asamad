// backend/routes/bookings.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/booking');
const Hotel = require('../models/hotel');
const User = require('../models/user');

// @route   POST api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', auth, async (req, res) => {
    const { hotelId, roomType, checkIn, checkOut, totalPrice } = req.body;

    try {
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ msg: 'Hotel not found' });
        }

        const newBooking = new Booking({
            user: req.user.id,
            hotel: hotelId,
            roomType,
            checkIn,
            checkOut,
            totalPrice,
        });

        const booking = await newBooking.save();
        res.json(booking);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/bookings/mybookings
// @desc    Get all bookings for a user
// @access  Private
router.get('/mybookings', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('hotel', ['name', 'location', 'images']);
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/bookings
// @desc    Get all bookings (Admin only)
// @access  Private (Admin)
router.get('/', auth, async (req, res) => {
    try {
        // Check if user is an admin
        const user = await User.findById(req.user.id);
        if (user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Admins only.' });
        }

        const bookings = await Booking.find().populate('hotel', ['name']).populate('user', ['name', 'email']);
        res.json(bookings);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/bookings/:id
// @desc    Update booking status (Admin only)
// @access  Private (Admin)
router.put('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Admins only.' });
        }

        let booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        booking.status = req.body.status;
        await booking.save();

        res.json(booking);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;

