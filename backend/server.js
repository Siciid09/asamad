// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const hotelRoutes = require('./routes/hotels');
const placeRoutes = require('./routes/places');
const authRoutes = require('./routes/auth'); // <-- ADD THIS LINE
const bookingRoutes = require('./routes/bookings'); // <-- ADD THIS LINE

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Log requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Use Routes
app.use('/api/hotels', hotelRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/auth', authRoutes); // <-- AND ADD THIS LINE
app.use('/api/bookings', bookingRoutes); // <-- AND ADD THIS LINE


// Connect to DB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Server is running on port:', process.env.PORT);
            console.log('Successfully connected to MongoDB.');
        });
    })
    .catch((err) => {
        console.log('Connection error', err);
    });

