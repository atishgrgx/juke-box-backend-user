require('dotenv').config(); // Load .env variables

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express(); // ✅ define app only once

// Routes
const authRoutes = require('./routes/authRoutes');
const songRoutes = require('./routes/songRoutes');

// ✅ Apply CORS BEFORE any routes
const userListRoutes = require('./routes/userlistRoutes');
// Apply Express CORS before routes
app.use(cors());

// Getting user list
app.use('/api/users', userListRoutes);


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // allow all origins during development

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB Atlas!');
});
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

// REST Routes
app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes); 

module.exports = app; // ✅ export for Supertest