require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const propertyRoutes = require('./routes/propertyRoutes');
const authRoutes = require('./routes/authRoutes');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/authenticateToken');



const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// Serve uploaded images statically
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use auth routes
app.use('/auth', authRoutes);

// Use property routes, protect POST /properties route
app.use('/properties', (req, res, next) => {
  if (req.method === 'POST') {
    authenticateToken(req, res, next);
  } else {
    next();
  }
}, propertyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});