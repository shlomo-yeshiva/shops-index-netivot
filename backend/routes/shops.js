const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');
const shopsData = require('../data/shopsData');

// GET /shops - כל החנויות עם אפשרות חיפוש
router.get('/', async (req, res) => {
  try {
    const { query, category } = req.query;
    let filter = {};

    if (query && query.trim()) {
      const searchRegex = new RegExp(query.trim(), 'i');
      filter.$or = [
        { name: searchRegex },
        { address: searchRegex },
        { category: searchRegex }
      ];
    }

    if (category && category.trim()) {
      filter.category = new RegExp(category.trim(), 'i');
    }

    const shops = await Shop.find(filter).sort({ name: 1 });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /shops/:id - חנות בודדת לפי ID
router.get('/:id', async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ error: 'חנות לא נמצאה' });
    }
    res.json(shop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /shops - הוספת חנות (לצורך הזנת נתונים)
router.post('/', async (req, res) => {
  try {
    const shop = new Shop(req.body);
    await shop.save();
    res.status(201).json(shop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /shops/seed - הזנת נתוני חנויות בנתיבות
router.post('/seed', async (req, res) => {
  try {
    const count = await Shop.countDocuments();
    if (count > 0) {
      return res.json({ message: 'כבר קיימות חנויות במערכת. להזנה מחדש השתמש ב-node scripts/seed.js --force', count });
    }

    await Shop.insertMany(shopsData);
    res.status(201).json({ message: `נוספו ${shopsData.length} חנויות ועסקים בנתיבות`, count: shopsData.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
