const express = require('express');
const User = require('../models/user');
const Car = require('../models/car');

const router = express.Router();

// Function to check if a car is already booked within the specified date range
const isCarBooked = (car, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const carStart = new Date(car.bookingStartDateTime);
  const carEnd = new Date(car.bookingEndDateTime);

  return (
    (start >= carStart && start <= carEnd) ||
    (end >= carStart && end <= carEnd) ||
    (start <= carStart && end >= carEnd)
  );
};

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new user
router.post('/', async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add a login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Fetch booked cars for a user
router.get('/:id/booked-cars', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('bookedCars');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.bookedCars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a user
router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) return res.status(404).json({ message: 'User not found' });

    Object.assign(user, req.body);
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) return res.status(404).json({ message: 'User not found' });

    await user.remove();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a route to book a car
router.post('/:id/booked-cars', async (req, res) => {
  const { carId, startDate, endDate } = req.body;

  try {
    const user = await User.findById(req.params.id);
    const car = await Car.findById(carId);

    if (!user || !car) {
      return res.status(404).json({ message: 'User or car not found' });
    }

    if (isCarBooked(car, startDate, endDate)) {
      return res.status(400).json({ message: 'Car is already booked for the selected dates' });
    }

    car.bookingStartDateTime = new Date(startDate);
    car.bookingEndDateTime = new Date(endDate);
    await car.save();

    user.bookedCars.push(carId);
    await user.save();

    res.status(200).json({ message: 'Car booked successfully', car });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a route to cancel a booking
router.delete('/:id/booked-cars/:carId', async (req, res) => {
  const { id, carId } = req.params;

  try {
    const user = await User.findById(id);
    const car = await Car.findById(carId);

    if (!user || !car) {
      return res.status(404).json({ message: 'User or car not found' });
    }

    user.bookedCars = user.bookedCars.filter((bookedCarId) => bookedCarId.toString() !== carId);
    car.bookingStartDateTime = null;
    car.bookingEndDateTime = null;

    await user.save();
    await car.save();

    res.status(200).json({ message: 'Booking cancelled successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a route to add a review to a car
router.post('/:id/reviews', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    car.reviews.push(req.body);
    await car.save();
    res.status(201).json({ message: 'Review added successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
