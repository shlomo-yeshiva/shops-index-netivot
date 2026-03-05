const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');

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

// POST /shops/seed - הזנת נתוני דוגמה
router.post('/seed', async (req, res) => {
  try {
    const count = await Shop.countDocuments();
    if (count > 0) {
      return res.json({ message: 'כבר קיימות חנויות במערכת', count });
    }

    const sampleShops = [
      { name: 'חנות מוצרי חשמל', address: 'דרך בן גוריון 15, נתיבות', openingHours: 'א-ה 09:00-19:00, ו 09:00-14:00', phone: '08-9991234', category: 'חשמל', lat: 31.4210, lng: 34.5950 },
      { name: 'מכולת השכונה', address: 'רחוב הרצל 22, נתיבות', openingHours: 'כל יום 07:00-22:00', phone: '08-9995678', category: 'מכולת', lat: 31.4180, lng: 34.5920 },
      { name: 'פרפריה יופי', address: 'רחוב ויצמן 8, נתיבות', openingHours: 'א-ה 09:00-20:00', phone: '', category: 'יופי', lat: 31.4220, lng: 34.5980 }
    ];

    await Shop.insertMany(sampleShops);
    res.status(201).json({ message: 'נוספו 3 חנויות לדוגמה', count: 3 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
