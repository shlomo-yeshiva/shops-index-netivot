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

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shops-index';

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

app.listen(PORT, () => {
  console.log(`✓ השרת רץ על http://localhost:${PORT}`);
});
