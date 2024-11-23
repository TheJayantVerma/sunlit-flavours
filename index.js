require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware for parsing requests and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const homeRoutes = require('./routes/home');
const menuRoutes = require('./routes/menu');
const cartRoutes = require('./routes/cart');
const aboutRoutes = require('./routes/about');

// Use routes
app.use('/', homeRoutes);
app.use('/menu', menuRoutes);
app.use('/cart', cartRoutes);
app.use('/about', aboutRoutes);
// app.use('/contact', homeRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});