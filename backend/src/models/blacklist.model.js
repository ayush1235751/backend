const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    expires: '7d' // Auto-expire after 7 days
  }
}, { timestamps: true });

const tokenblacklistModel = mongoose.model('Blacklist', blacklistSchema);

module.exports = tokenblacklistModel;

