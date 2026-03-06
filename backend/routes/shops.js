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
      const words = query.trim().split(/\s+/).filter(w => w.length > 0);
      const orConditions = words.map(word => {
        const re = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        return {
          $or: [
            { name: re },
            { address: re },
            { category: re }
          ]
        };
      });
      filter.$and = orConditions;
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

async function runSeed(force) {
  const count = await Shop.countDocuments();
  if (count > 0 && !force) {
    return { message: 'כבר קיימות חנויות', count };
  }
  if (force && count > 0) {
    await Shop.deleteMany({});
  }
  await Shop.insertMany(shopsData);
  return { message: `נוספו ${shopsData.length} חנויות ועסקים בנתיבות`, count: shopsData.length };
}

// GET /shops/seed - חייב להיות לפני /:id
router.get('/seed', async (req, res) => {
  try {
    const force = req.query.force === '1' || req.query.force === 'true';
    const result = await runSeed(force);
    res.json(result);
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

// PATCH /shops/:id - עדכון חנות (תמונה וכו')
router.patch('/:id', async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!shop) return res.status(404).json({ error: 'חנות לא נמצאה' });
    res.json(shop);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    const force = req.query.force === '1' || req.query.force === 'true';
    const result = await runSeed(force);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
