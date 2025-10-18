// --- IMPORTS ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// --- CONFIGURATIONS ---
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Successfully connected to MongoDB."))
.catch(err => console.error("Connection error", err));

// --- ROUTES ---
const hotelRoutes = require('./routes/hotels');
const placeRoutes = require('./routes/places');

app.use('/api/hotels', hotelRoutes);
app.use('/api/places', placeRoutes);

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
