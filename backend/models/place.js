const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    images: [{ type: String }],
    nearbyHotelId: { type: Schema.Types.ObjectId, ref: 'Hotel' }
}, {
    timestamps: true,
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
