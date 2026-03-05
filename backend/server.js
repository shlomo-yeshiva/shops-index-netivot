require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const shopsRouter = require('./routes/shops');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/shops', shopsRouter);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shops-index')
  .then(() => console.log('✓ התחברות ל-MongoDB הצליחה'))
  .catch(err => console.error('✗ שגיאה בהתחברות ל-MongoDB:', err.message));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`✓ השרת רץ על http://localhost:${PORT}`);
});
