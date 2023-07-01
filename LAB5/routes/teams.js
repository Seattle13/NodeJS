const express = require('express');
const router = express.Router()
const Game = require('../models/Game')
const Team = require('../models/Team')
const GameTeam = require('../models/GameTeam')
const trackRequests = require('../src/trackRequests')

// GET /team
router.get('/', trackRequests, async (req, res) => {
  try {
    const teams = await Team.find().populate('games');
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// GET /team/:id
router.get('/:id', trackRequests, getTeam, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('games');
    res.json(team)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /team
router.post('/', trackRequests, async (req, res) => {
  const team = new Team({
    name: req.body.name
  })

  if (req.body.games != null) {
    team.games = Array.isArray(req.body.games) ? req.body.games : [req.body.games];
  } else {
    team.games = [];
  }

  try {
    const newTeam = await team.save();
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(400).json({ message: err })
  }
});

// PATCH /team/:id
router.patch('/:id', trackRequests, getTeam, async (req, res) => {
  res.team.name = req.body.name;
  if (req.body.gameIds != null) {
    const gameIds = Array.isArray(req.body.gameIds) ? req.body.gameIds : [req.body.gameIds];
    res.team.games = [];
    for (let gameId of gameIds) {
      const game = await Game.findById(gameId);
      if (game == null) {
        return res.status(400).json({ message: `Game with id ${gameId} not found` });
      }
      const gameTeam = new GameTeam({
        game: game._id,
        team: res.team._id
      });
      res.team.games.push(gameTeam);
      await gameTeam.save();
    }
  }
  try {
    const updatedTeam = await res.team.save()
    res.json(updatedTeam)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

// DELETE /team/:id
router.delete('/:id', trackRequests, getTeam, async (req, res) => {
  try {
    const deletedTeam = await res.team.remove();
    // remove the corresponding GameTeam entries
    await GameTeam.deleteMany({ team: res.team._id });
    res.json({message: 'Team has been deleted'})
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Middleware для отримання команди
async function getTeam(req, res, next) {
  let team
  try {
    team = await Team.findById(req.params.id)
    if (team == null) {
      return res.status(404).json({ message: 'Cannot find team' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.team = team
  next()
}

module.exports = router;
