const mongoose = require('mongoose')

const HeroSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hero name field is required'],
    unique: true
  },
  imageUrl: {
    type: String,
    required: [true, 'Hero image URL is required']
  },
  superPower: {
    type: String,
    required: [true, 'Hero superpower is required']
  },
  description: {
    type: String,
  }
});

module.exports = mongoose.model('Hero', HeroSchema)
