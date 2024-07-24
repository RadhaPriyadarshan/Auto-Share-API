const express = require('express');
const Car = require('../models/car');

const router = express.Router();

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new car
router.post('/', async (req, res) => {
  const car = new Car(req.body);
  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a car
router.patch('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car == null) return res.status(404).json({ message: 'Car not found' });

    Object.assign(car, req.body);
    const updatedCar = await car.save();
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a car
router.delete('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car == null) return res.status(404).json({ message: 'Car not found' });

    await car.remove();
    res.json({ message: 'Car deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add review to a car
router.post('/:id/reviews', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    car.reviews.push(req.body);
    await car.save();
    res.status(201).json(car.reviews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// search
router.get('/available', async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Please provide startDate and endDate' });
  }

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const query = {
      $or: [
        // Cars with no booking information (booking dates are null)
        {
          $or: [
            { bookingStartDateTime: { $eq: null } },
            { bookingEndDateTime: { $eq: null } }
          ]
        },
        // Cars with booking that ends before the start date
        {
          $and: [
            { bookingEndDateTime: { $lt: start } },
            { bookingEndDateTime: { $ne: null } } 
          ]
        },
        // Cars with booking that starts after the end date
        {
          $and: [
            { bookingStartDateTime: { $gt: end } },
            { bookingStartDateTime: { $ne: null } } 
          ]
        }
      ]
    };

    const availableCars = await Car.find(query);
    console.log('Available Cars:', availableCars); 
    res.json(availableCars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Cancel a booking
router.patch('/:id/cancelBooking', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    car.bookingStartDateTime = null;
    car.bookingEndDateTime = null;
    await car.save();
    res.json({ message: 'Booking cancelled', car });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});







module.exports = router;
