/**
 * סקריפט הזנת נתוני דוגמה לבסיס הנתונים
 * הרצה: node scripts/seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Shop = require('../models/Shop');

const sampleShops = [
  { name: 'חנות מוצרי חשמל', address: 'דרך בן גוריון 15, נתיבות', openingHours: 'א-ה 09:00-19:00, ו 09:00-14:00', phone: '08-9991234', category: 'חשמל', lat: 31.4210, lng: 34.5950 },
  { name: 'מכולת השכונה', address: 'רחוב הרצל 22, נתיבות', openingHours: 'כל יום 07:00-22:00', phone: '08-9995678', category: 'מכולת', lat: 31.4180, lng: 34.5920 },
  { name: 'פרפריה יופי', address: 'רחוב ויצמן 8, נתיבות', openingHours: 'א-ה 09:00-20:00', phone: '08-9999012', category: 'יופי', lat: 31.4220, lng: 34.5980 },
  { name: 'מאפיית נתיבות', address: 'רחוב הרצל 5, נתיבות', openingHours: 'כל יום 05:00-22:00', phone: '08-9993456', category: 'מזון', lat: 31.4170, lng: 34.5910 },
  { name: 'חנות כלבו', address: 'דרך בן גוריון 45, נתיבות', openingHours: 'א-ה 08:00-20:00, ו 08:00-15:00', phone: '08-9997890', category: 'כלבו', lat: 31.4230, lng: 34.5960 }
];

async function seed() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/shops-index';
    await mongoose.connect(uri);
    console.log('✓ התחברות ל-MongoDB');

    const count = await Shop.countDocuments();
    if (count > 0) {
      console.log(`⚠ כבר קיימות ${count} חנויות. מדלג על הזנה.`);
      process.exit(0);
      return;
    }

    await Shop.insertMany(sampleShops);
    console.log(`✓ נוספו ${sampleShops.length} חנויות לדוגמה`);
  } catch (err) {
    console.error('✗ שגיאה:', err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
