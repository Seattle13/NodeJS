const mongoose = require('mongoose')

const GameSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
    match: /\d{4}-\d{2}-\d{2}/,
  },
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GameTeam'
  }],
  team1Score: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  team2Score: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
}, { versionKey: false });


module.exports = mongoose.model('Game', GameSchema)