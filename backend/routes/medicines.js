const express = require('express');
const Medicine = require('../models/Medicine');

const router = express.Router();

// Get all medicines
router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add medicine (admin only)
router.post('/', async (req, res) => {
  try {
    const { name, price, description, category, quantity, image } = req.body;
    const finalImage = image || `/images/${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.jpg`;
    
    const medicine = new Medicine({ name, price, description, category, image: finalImage, quantity });
    await medicine.save();
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update medicine
router.put('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete medicine
router.delete('/:id', async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: 'Medicine deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rate medicine
router.post('/:id/rate', async (req, res) => {
  try {
    const { userId, rating } = req.body;
    const medicine = await Medicine.findById(req.params.id);
    
    const existingRating = medicine.ratings.find(r => r.userId === userId);
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      medicine.ratings.push({ userId, rating });
    }
    
    medicine.totalRatings = medicine.ratings.length;
    medicine.averageRating = medicine.ratings.reduce((sum, r) => sum + r.rating, 0) / medicine.totalRatings;
    
    await medicine.save();
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;