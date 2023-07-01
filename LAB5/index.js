const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Redis = require('ioredis');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('swagger.yaml');

require('dotenv/config');

const app = express();

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connecting to a MongoDB database
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => { console.log(error); });
db.once('open', () => console.log('Connected to DB!'));

// Connecting to a Redis database
const client = new Redis(
  process.env.REDIS_HOST, // address of the Redis server
  process.env.REDIS_PORT, // port of the Redis server
);
client.on('error', (error) => {
  console.log(error);
  client.quit();
});
client.once('connect', () => console.log('Connected to Redis!'));

// Query metrics by entities
app.use((req, res, next) => {
  const gameMetric = `game:${req.method}`;
  const teamMetric = `team:${req.method}`;
  const gameTeamMetric = `gameTeam:${req.method}`;

  client.incr(gameMetric);
  client.incr(teamMetric);
  client.incr(gameTeamMetric);

  next();
});

// Import Routes
const gamesRoute = require('./routes/games');
app.use('/games', gamesRoute);

const teamsRoute = require('./routes/teams');
app.use('/teams', teamsRoute);

const gamesTeamsRoute = require('./routes/game-team');
app.use('/game-team', gamesTeamsRoute);

app.get('/', (req, res) => {
  res.send('<h1>Games Schedule</h1>');
});

// Start server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
