const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/authenticateToken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Get all properties
router.get('/get', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM properties');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get property by id
router.get('/get/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM properties WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new property with image upload
router.post('/add', authenticateToken, upload.single('image'), async (req, res) => {
  const { title, description, location, area, beds, baths, price, rentOrSale } = req.body;
  const userId = req.user.userId;
  let imagePath = null;
  if (req.file) {
    imagePath = '/uploads/' + req.file.filename;
  }
  try {
    const [result] = await db.query(
      'INSERT INTO properties (title, description, location, area, beds, baths, price, rentOrSale, image, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, location, area, beds, baths, price, rentOrSale, imagePath, userId]
    );
    const newProperty = {
      id: result.insertId,
      title,
      description,
      location,
      area,
      beds,
      baths,
      price,
      rentOrSale,
      image: imagePath,
      userId,
    };
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit property with image upload
router.put('/edit/:id', authenticateToken, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, location, description, area, beds, baths, price, rentOrSale } = req.body;
  const userId = req.user.userId;
  let imagePath = null;
  if (req.file) {
    imagePath = '/uploads/' + req.file.filename;
  }
  try {
    // Check ownership
    const [rows] = await db.query('SELECT userId FROM properties WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    if (rows[0].userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const queryParams = [title, location, description, area, beds, baths, price, rentOrSale];
    let query = 'UPDATE properties SET title = ?, location = ?, area = ?, beds = ?, baths = ?, price = ?, rentOrSale = ?';
    if (imagePath) {
      query += ', image = ?';
      queryParams.push(imagePath);
    }
    query += ' WHERE id = ?';
    queryParams.push(id);
    await db.query(query, queryParams);
    res.json({ message: 'Property updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete property
router.delete('/delete/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  try {
    // Check ownership
    const [rows] = await db.query('SELECT userId FROM properties WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    if (rows[0].userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    const [result] = await db.query('DELETE FROM properties WHERE id = ?', [id]);
    res.json({ message: 'Property deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
