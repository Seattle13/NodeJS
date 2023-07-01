const express = require('express');
const Joi = require('joi');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('swagger.yaml');

const { Team } = require('./src/Team');
const { Game } = require('./src/Game');
const { Result } = require('./src/Result');

const app = express();
app.use(express.json());

module.exports = Team;
const teams = [
  new Team(1, 'Barcelona'),
  new Team(2, 'Real Madrid'),
  new Team(3, 'Bayern'),
  new Team(4, 'Borussia Dortmund'),
  new Team(5, 'Manchester Citi'),
  new Team(6, 'Liverpool'),
  new Team(7, 'Juventus'),
  new Team(8, 'Napoli'),
  new Team(9, 'PSG'),
  new Team(10, 'Lion'),
];

module.exports = Game;
const games = [
  new Game(1, '2023-01-01', 1, 2),
  new Game(2, '2023-01-05', 3, 4),
  new Game(3, '2023-01-10', 2, 4),
  new Game(4, '2023-01-15', 1, 3),
  new Game(5, '2023-01-20', 2, 3),
  new Game(6, '2023-01-25', 1, 4),
  new Game(7, '2023-01-30', 2, 4),
  new Game(8, '2023-02-05', 1, 3),
  new Game(9, '2023-02-10', 3, 4),
  new Game(10, '2023-02-15', 1, 2),
];

exports.Result = Result;
const results = [
  new Result(0, 0),
  new Result(1, 1),
  new Result(2, 2),
  new Result(3, 3),
  new Result(4, 4),
  new Result(5, 5),
  new Result(6, 6),
  new Result(7, 7),
  new Result(8, 8),
  new Result(9, 9),
  new Result(10, 10),
];

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* eslint consistent-return: "off" */
app.get('/', (req, res) => {
  res.send('<h1>Games Schedule</h1>');
});

/// ///////////////////////////////////////////////////////////
app.get('/games', (req, res) => {
  res.send(games);
});
/// ///////////////////////////////////////////////////////////
app.get('/games/:id', (req, res) => {
  const gameIndex = games.find((g) => g.id === parseInt(req.params.id, 10));
  if (!gameIndex) {
    return res.status(404).send('No games were found for this ID');
  }
  return res.status(200).send(gameIndex);
});
// Ендпоінт для отримання списку ігор з пагінацією
app.get('/pagination/games', (req, res) => {
  // отримуємо параметри запиту
  const page = parseInt(req.query.page, 10) || 1; // номер сторінки
  const limit = parseInt(req.query.limit, 10) || 5; // кількість елементів на сторінці

  // виконуємо пагінацію даних на основі параметрів запиту
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedGames = games.slice(startIndex, endIndex);

  // повертаємо результат у форматі JSON
  res.send(paginatedGames);
});
/// ///////////////////////////////////////////////////////////
function validateGames(gameIndex) {
  const schema = Joi.object({
    date: Joi.string().required(),
    team1Id: Joi.number().integer().min(1).max(teams.length)
      .required(),
    team2Id: Joi.number().integer().min(1).max(teams.length)
      .required(),
    team1Score: Joi.number().integer().min(0).max(10)
      .required(),
    team2Score: Joi.number().integer().min(0).max(10)
      .required(),
  });

  return schema.validate(gameIndex);
}
/// ///////////////////////////////////////////////////////////
app.post('/games', (req, res) => {
  const result = validateGames(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const game = {
    id: games.length + 1,
    date: req.body.date,
    team1Id: req.body.team1Id,
    team2Id: req.body.team2Id,
    team1Score: req.body.team1Score,
    team2Score: req.body.team2Score,
  };

  games.push(game);
  res.send(game);
});
/// ///////////////////////////////////////////////////////////
app.put('/games/:id', (req, res) => {
  const gameIndex = games.find((g) => g.id === parseInt(req.params.id, 10));
  if (!gameIndex) {
    return res.status(404).send('No games were found for this ID');
  }

  const result = validateGames(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  gameIndex.date = req.body.date;
  gameIndex.team1Id = req.body.team1Id;
  gameIndex.team2Id = req.body.team2Id;
  gameIndex.team1Score = req.body.team1Score;
  gameIndex.team2Score = req.body.team2Score;

  res.send(gameIndex);
});
/// ///////////////////////////////////////////////////////////
app.delete('/games/:id', (req, res) => {
  const gameIndex = games.find((g) => g.id === parseInt(req.params.id, 10));
  if (!gameIndex) {
    return res.status(404).send('No games were found for this ID');
  }

  const index = games.indexOf(gameIndex);
  games.splice(index, 1);

  res.send(gameIndex);
});
/// ///////////////////////////////////////////////////////////

/// ///////////////////////////////////////////////////////////
app.get('/teams', (req, res) => {
  res.send(teams);
});

app.get('/teams/:id', (req, res) => {
  const teamIndex = teams.find((t) => t.id === parseInt(req.params.id, 10));
  if (!teamIndex) {
    return res.status(404).send('No teams were found for this ID');
  }
  return res.status(200).send(teamIndex);
});
/// ///////////////////////////////////////////////////////////
// Ендпоінт для отримання списку команд з фільтрацією
app.get('/filtration/teams', (req, res) => {
  // отримуємо параметри запиту
  const queryName = req.query.name; // назва команди, яку шукаємо
  if (!queryName) {
    return res.status(400).send('Missing search query');
  }
  // фільтруємо дані на основі параметрів запиту
  const filteredTeams = teams.filter((team) => team.name.toLowerCase()
    .includes(queryName.toLowerCase()));
  if (filteredTeams.length <= 0) {
    return res.status(404).send('No teams found for this name');
  }
  // повертаємо результат
  return res.send(filteredTeams);
});
/// ///////////////////////////////////////////////////////////
// Ендпоінт для отримання списку команд з пагінацією
app.get('/pagination/teams', (req, res) => {
  // отримуємо параметри запиту
  const page = parseInt(req.query.page, 10) || 1; // номер сторінки
  const limit = parseInt(req.query.limit, 10) || 5; // кількість елементів на сторінці
  // виконуємо пагінацію даних на основі параметрів запиту
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedTeams = teams.slice(startIndex, endIndex);
  // повертаємо результат
  res.send(paginatedTeams);
});
/// ///////////////////////////////////////////////////////////
function validateTeams(teamIndex) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
  });

  return schema.validate(teamIndex);
}
/// ///////////////////////////////////////////////////////////
app.post('/teams', (req, res) => {
  const result = validateTeams(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const team = {
    id: teams.length + 1,
    name: req.body.name,
  };

  teams.push(team);
  res.send(team);
});
/// ///////////////////////////////////////////////////////////
app.put('/teams/:id', (req, res) => {
  const teamIndex = teams.find((t) => t.id === parseInt(req.params.id, 10));
  if (!teamIndex) {
    return res.status(404).send('No teams were found for this ID');
  }

  const result = validateTeams(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  teamIndex.name = req.body.name;

  res.send(teamIndex);
});
/// ///////////////////////////////////////////////////////////
app.delete('/teams/:id', (req, res) => {
  const teamIndex = teams.find((t) => t.id === parseInt(req.params.id, 10));
  if (!teamIndex) {
    return res.status(404).send('No teams were found for this ID');
  }

  const index = teams.indexOf(teamIndex);
  teams.splice(index, 1);

  res.send(teamIndex);
});

/// ///////////////////////////////////////////////////////////
app.get('/results', (req, res) => {
  res.send(results);
});

/* eslint no-console: "off" */
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
