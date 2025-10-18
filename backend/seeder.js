const mongoose = require('mongoose');
const dotenv = require('dotenv');
// --- FIX: Changed to singular to match the likely filename ---
const Hotel = require('./models/hotel.js');
const Place = require('./models/place.js');

dotenv.config();

const hotelsData = [
    {
        id: 1,
        name: 'Jazeera Palace Hotel',
        location: 'Mogadishu',
        rating: 4.8,
        price: 150,
        featured: true,
        description: "Jazeera Palace Hotel is a luxury hotel in Mogadishu, Somalia. It offers top-tier security, opulent rooms, and a range of amenities including a swimming pool, gym, and multiple restaurants.",
        images: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=1200&auto=format&fit=crop'
        ],
        amenities: ['wifi', 'pool', 'gym', 'restaurant'],
        rooms: [ {type: 'Standard King', price: 150}, {type: 'Deluxe Suite', price: 250} ]
    },
    {
        id: 2,
        name: 'Damal Hotel Hargeisa',
        location: 'Hargeisa',
        rating: 4.6,
        price: 120,
        featured: true,
        description: "Located in the heart of Hargeisa, Damal Hotel offers comfort and convenience for business and leisure travelers. Enjoy modern rooms and exceptional service.",
        images: [
            'https://images.unsplash.com/photo-1542314831-068cd1dbb5eb?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200&auto=format&fit=crop'
        ],
        amenities: ['wifi', 'restaurant', 'conference hall'],
        rooms: [ {type: 'Single Room', price: 120}, {type: 'Double Room', price: 180} ]
    },
    {
        id: 3,
        name: 'Tawakal Hotel Kismayo',
        location: 'Kismayo',
        rating: 4.4,
        price: 90,
        featured: true,
        description: "Experience the coastal charm of Kismayo at Tawakal Hotel. A perfect spot for relaxation with easy access to the city's attractions.",
        images: [
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1200&auto=format&fit=crop'
        ],
        amenities: ['wifi', 'beach access'],
        rooms: [ {type: 'Sea View', price: 90}, {type: 'Garden View', price: 75} ]
    },
     {
        id: 4,
        name: 'Puntland Plaza Hotel',
        location: 'Bosaso',
        rating: 4.5,
        price: 110,
        featured: false,
        description: "A premier hotel in Bosaso, offering elegant accommodations and a central location for exploring the port city.",
        images: [
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1200&auto=format&fit=crop'
        ],
        amenities: ['wifi', 'restaurant', 'gym'],
        rooms: [ {type: 'Standard', price: 110}, {type: 'Business Suite', price: 200} ]
    }
];

const placesData = [
    {
        id: 1,
        name: "Liido Beach",
        description: "Famous for its white sands and vibrant atmosphere in Mogadishu.",
        longDescription: "Liido Beach is the jewel of Mogadishu, a bustling stretch of coastline where locals and visitors alike come to relax, socialize, and enjoy the beautiful Indian Ocean. The beach is lined with restaurants and cafes, making it a perfect spot to spend a whole day.",
        images: [
            "https://images.unsplash.com/photo-1507525428034-b723a996f6ea?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop"
        ],
        nearbyHotelId: 1
    },
    {
        id: 2,
        name: "Laas Geel",
        description: "Ancient rock art complex with some of the earliest known cave paintings.",
        longDescription: "A must-see for history enthusiasts, Laas Geel is a complex of caves and rock shelters in northwestern Somalia that contain stunningly preserved rock art. The paintings are estimated to be between 5,000 and 10,000 years old.",
        images: [
            "https://images.unsplash.com/photo-1633979434770-98a0b06994c6?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1575997914022-c1c5295c52a3?q=80&w=1200&auto=format&fit=crop"
        ],
        nearbyHotelId: 2
    },
    {
        id: 3,
        name: "Kismayo National Park",
        description: "A biodiverse park offering stunning landscapes and wildlife.",
        longDescription: "Kismayo National Park is a vast protected area that showcases Somalia's diverse ecosystems. From savanna grasslands to coastal forests, the park is home to a variety of wildlife and offers incredible opportunities for ecotourism and safari adventures.",
        images: [
            "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=1200&auto=format&fit=crop",
             "https://images.unsplash.com/photo-1418985991508-e47386d96a71?q=80&w=1200&auto=format&fit=crop"
        ],
        nearbyHotelId: 3
    }
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const importData = async () => {
    await connectDB();
    try {
        await Hotel.deleteMany();
        await Place.deleteMany();

        await Hotel.insertMany(hotelsData);
        await Place.insertMany(placesData);

        console.log('Data Imported!');
        process.exit();
    } catch (err) {
        console.error(`${err}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-i') {
    importData();
}

