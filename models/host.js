const mongoose = require('mongoose');

const hostSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
  location: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String }
  },
  availability: [{
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
    startDateTime: { type: Date },
    endDateTime: { type: Date }
  }]
});

const Host = mongoose.model('Host', hostSchema);

module.exports = Host;
