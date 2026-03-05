/**
 * סקריפט הזנת חנויות ועסקים אמיתיים בנתיבות
 * הרצה: node scripts/seed.js
 * הרצה עם מחיקה והזנה מחדש: node scripts/seed.js --force
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Shop = require('../models/Shop');
const shopsData = require('../data/shopsData');

async function seed() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/shops-index';
    await mongoose.connect(uri);
    console.log('✓ התחברות ל-MongoDB');

    const force = process.argv.includes('--force');
    const count = await Shop.countDocuments();

    if (count > 0 && !force) {
      console.log(`⚠ כבר קיימות ${count} חנויות. להזנה מחדש הרץ: node scripts/seed.js --force`);
      process.exit(0);
      return;
    }

    if (force && count > 0) {
      await Shop.deleteMany({});
      console.log(`✓ נמחקו ${count} חנויות קיימות`);
    }

    await Shop.insertMany(shopsData);
    console.log(`✓ נוספו ${shopsData.length} חנויות ועסקים בנתיבות`);
  } catch (err) {
    console.error('✗ שגיאה:', err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
