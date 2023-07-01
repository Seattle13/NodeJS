const express = require('express');
const router = express.Router()
const GameTeam = require('../models/GameTeam')
const trackRequests = require('../src/trackRequests')

// GET /gameteam
router.get('/', trackRequests, async (req, res) => {
  try {
    const gameTeams = await GameTeam.find().populate('game team')
    res.json(gameTeams)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /gameteam/:id
router.get('/:id', trackRequests, getGameTeam, (req, res) => {
  res.json(res.gameTeam);
});

// POST /gameteam
router.post('/', trackRequests, async (req, res) => {
  const gameTeam = new GameTeam({
    game: req.body.game,
    team: req.body.team
  })

  try {
    const newGameTeam = await gameTeam.save()
    res.status(201).json(newGameTeam)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// PATCH /gameteam/:id
router.patch('/:id', trackRequests, getGameTeam, async (req, res) => {
  if (req.body.game != null) {
    res.gameTeam.game = req.body.game;
  }
  if (req.body.team != null) {
    res.gameTeam.team = req.body.team;
  }
  try {
    const updatedGameTeam = await res.gameTeam.save();
    res.json(updatedGameTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /gameteam/:id
router.delete('/:id', trackRequests, getGameTeam, async (req, res) => {
  try {
    await res.gameTeam.remove();
    res.json({ message: 'GameTeam has been deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware для отримання гри та команди
async function getGameTeam(req, res, next) {
  try {
    const gameTeam = await GameTeam.findById(req.params.id).populate('game team')
    if (gameTeam == null) {
      return res.status(404).json({ message: 'GameTeam not found' })
    }
    res.gameTeam = gameTeam
    next()
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = router;
