const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    type: { type: String, required: true },
    price: { type: Number, required: true }
});

const hotelSchema = new Schema({
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    featured: { type: Boolean, default: false },
    description: { type: String, required: true },
    images: [{ type: String }],
    amenities: [{ type: String }],
    rooms: [roomSchema]
}, {
    timestamps: true,
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
