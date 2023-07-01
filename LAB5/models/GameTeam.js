const mongoose = require('mongoose')

const GameTeamSchema = mongoose.Schema({
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }
}, { versionKey: false })

module.exports = mongoose.model('GameTeam', GameTeamSchema)