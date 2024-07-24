const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const carRoutes = require('./routes/carRoutes');
const userRoutes = require('./routes/userRoutes');
const hostRoutes = require('./routes/hostRoutes');

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' })); 
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Use Routes
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
app.use('/api/hosts', hostRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
