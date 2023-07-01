const mongoose = require('mongoose')

const TeamSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  games: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GameTeam'
  }]
}, { versionKey: false })

module.exports = mongoose.model('Team', TeamSchema)