const express = require('express');
const router = express.Router()
const Game = require('../models/Game')
const Team = require('../models/Team')
const GameTeam = require('../models/GameTeam')
const trackRequests = require('../src/trackRequests')

// GET /games
router.get('/', trackRequests, async (req, res) => {
  try {
    const games = await Game.find().populate('teams.team');
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// GET /games/:id
router.get('/:id', trackRequests, getGame, (req, res) => {
  res.json(res.game)
})

// POST /games
router.post('/', trackRequests, async (req, res) => {
  const gameTeams = [];
  // Створення нових команд і зберігання до бази даних
  const team1 = new Team({ name: req.body.team1Name });
  const team2 = new Team({ name: req.body.team2Name });
  await team1.save();
  await team2.save();

  // Створення нового зв'язку GameTeam та збереження його до бази даних
  const gameTeam1 = new GameTeam({ game: null, team: team1._id });
  const gameTeam2 = new GameTeam({ game: null, team: team2._id });
  await gameTeam1.save();
  await gameTeam2.save();

  gameTeams.push(gameTeam1._id);
  gameTeams.push(gameTeam2._id);

  // Створення нової гри та збереження її до бази даних
  const game = new Game({
    date: req.body.date,
    teams: gameTeams,
    team1Score: req.body.team1Score,
    team2Score: req.body.team2Score
  });

  try {
    await game.save();

    // Оновлення зв'язку GameTeam з новою грою
    gameTeam1.game = game._id;
    gameTeam2.game = game._id;
    await Promise.all([gameTeam1.save(), gameTeam2.save()]);

    const populatedGame = await Game.findById(game._id).populate('teams.team');
    res.status(201).json(populatedGame);
  } catch (err) {
    res.status(400).json({ message: err })
  }  
});

// Middleware для оновлення назв команд
async function updateTeamNames(req, res, next) {
  let game
  try {
    game = await Game.findById(req.params.id)
    if (game == null) {
      return res.status(404).json({ message: 'Cannot find game' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  for (let key in req.body) {
    if (req.body[key] != null) {
      game[key] = req.body[key]
    }
  }

  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, game, { new: true })
    res.json(updatedGame)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// PATCH /games/:id
router.patch('/:id', trackRequests, getGame, updateTeamNames, async (req, res) => {
  if (req.body.date != null) {
    res.game.date = req.body.date
  }
  if (req.body.team1Name != null) {
    res.game.team1.name = req.body.team1Name
  }
  if (req.body.team2Name != null) {
    res.game.team2.name = req.body.team2Name
  }
  if (req.body.team1Score != null) {
    res.game.team1.score = req.body.team1Score
  }
  if (req.body.team2Score != null) {
    res.game.team2.score = req.body.team2Score
  }

  try {
    const updatedGame = await res.game.save()
    res.json(updatedGame)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE /games/:id
router.delete('/:id', trackRequests, getGame, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Cannot find game' })
    }
    // Видалення зв'язків GameTeam для даної гри
    await GameTeam.deleteMany({ game: game._id });

    await game.remove();
    res.json({ message: 'Game has been deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Middleware для отримання гри
async function getGame(req, res, next) {
  let game
  try {
    game = await Game.findById(req.params.id).populate('teams.team');
    if (game == null) {
      return res.status(404).json({ message: 'Cannot find game' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.game = game
  next()
}

module.exports = router;