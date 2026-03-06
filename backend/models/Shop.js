const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  openingHours: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'כללי'
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// אינדקס לחיפוש
shopSchema.index({ name: 'text', address: 'text', category: 'text' });

module.exports = mongoose.model('Shop', shopSchema);
