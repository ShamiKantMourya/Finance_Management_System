const mongoose = require('mongoose')

const savingSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Emergency', 'Long Term', 'Medical', 'Rainy Day', 'Sinking', 'Splurge', 'Vacation'],
    default: 'Vacation'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

const Saving = mongoose.model('Saving', savingSchema)

module.exports = Saving;