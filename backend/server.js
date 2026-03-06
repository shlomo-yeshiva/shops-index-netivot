require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const shopsRouter = require('./routes/shops');
const Shop = require('./models/Shop');
const shopsData = require('./data/shopsData');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/shops', shopsRouter);

let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shops-index';
if (MONGODB_URI.includes('mongodb+srv://') && MONGODB_URI.includes('.net/?')) {
  MONGODB_URI = MONGODB_URI.replace('.net/?', '.net/shops-index?');
}

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000
})
  .then(async () => {
    console.log('✓ התחברות ל-MongoDB הצליחה');
    const count = await Shop.countDocuments();
    if (count === 0) {
      await Shop.insertMany(shopsData);
      console.log(`✓ הוזנו אוטומטית ${shopsData.length} חנויות`);
    }
  })
  .catch(err => console.error('✗ שגיאה בהתחברות ל-MongoDB:', err.message));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/seed-shops', async (req, res) => {
  try {
    const force = req.query.force === '1' || req.query.force === 'true';
    const count = await Shop.countDocuments();
    if (count > 0 && !force) {
      return res.json({ message: 'כבר קיימות חנויות', count });
    }
    if (force && count > 0) {
      await Shop.deleteMany({});
    }
    await Shop.insertMany(shopsData);
    res.json({ message: `נוספו ${shopsData.length} חנויות ועסקים בנתיבות`, count: shopsData.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/debug', async (req, res) => {
  try {
    const dbName = mongoose.connection.db?.databaseName || 'unknown';
    const count = await Shop.countDocuments();
    const hasUri = !!process.env.MONGODB_URI;
    const uriHasDb = hasUri && process.env.MONGODB_URI.includes('.net/') && !process.env.MONGODB_URI.includes('.net/?');
    res.json({
      connected: mongoose.connection.readyState === 1,
      dbName,
      shopCount: count,
      hasMongoUri: hasUri,
      uriHasDbName: uriHasDb,
      hint: !uriHasDb ? 'הוסף /shops-index למחרוזת לפני ? (לדוגמה: ...mongodb.net/shops-index?retryWrites=...)' : null
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`✓ השרת רץ על http://localhost:${PORT}`);
});
