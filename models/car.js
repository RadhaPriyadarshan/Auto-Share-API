const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  imgSrc: { type: String, required: true },
  imgAlt: { type: String, required: true },
  title: { type: String, required: true },
  vehicleType: { type: String,required: true, default: 'Unknown' },
  features: [{ type: String, required: true }],
  rating: { type: Number, required: true },
  trips: { type: Number, required: true },
  price: { type: Number, required: true },
  tags: [{ type: String, required: true }],
  owner: { type: String, required: true },
  address: { type: String, required: true },
  additionalFeatures: [{ type: String, required: true }],
  bookingStartDateTime: { type: Date, default: null },
  bookingEndDateTime: { type: Date, default: null },
  reviews: [
    {
      user: { type: String, required: true },
      review: { type: String, required: true },
      rating: { type: Number, required: true }
    }
  ]
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
