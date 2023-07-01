const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const initializePassport = require("./src/passport-config");
const { Team } = require("./src/Team");
const { Game } = require("./src/Game");
const { Result } = require("./src/Result");

const app = express();

module.exports = Team;
const teams = [
  new Team(1, "Barcelona"),
  new Team(2, "Real Madrid"),
  new Team(3, "Bayern"),
  new Team(4, "Borussia Dortmund"),
  new Team(5, "Manchester Citi"),
  new Team(6, "Liverpool"),
  new Team(7, "Juventus"),
  new Team(8, "Napoli"),
];

module.exports = Game;

const games = [
  new Game(1, "2022-01-01", 1, 2),
  new Game(2, "2022-01-02", 2, 3),
  new Game(3, "2022-01-03", 1, 3),
];

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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

initializePassport(passport);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* eslint consistent-return: "off" */
// Функція middleware для перевірки автентичності користувача
function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.get("/login", (req, res) => {
  res.render("login");
});

// Обробляти запит на вхід
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
  })
);

// Обробляти запит на вихід
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

// Захищений маршрут - доступний лише авторизованим користувачам
app.get("/admin", isAuth, (req, res) => {
  const teamQuery = req.query.team;
  let filteredGames = games;
  if (teamQuery) {
    const team = teams.find((t) => t.name === teamQuery);
    if (team) {
      filteredGames = games.filter(
        (g) => g.team1Id === team.id || g.team2Id === team.id
      );
    } else {
      filteredGames = [];
    }
  }
  res.render("admin", { teams, games: filteredGames, results });
});

app.get("/", (req, res) => {
  const teamQuery = req.query.team;
  let filteredGames = games;
  if (teamQuery) {
    const team = teams.find((t) => t.name === teamQuery);
    if (team) {
      filteredGames = games.filter(
        (g) => g.team1Id === team.id || g.team2Id === team.id
      );
    } else {
      filteredGames = [];
    }
  }
  res.render("guest", { teams, games: filteredGames, results });
});

app.post("/games", (req, res) => {
  const { date, team1Id, team2Id, team1Score, team2Score } = req.body;
  const newGameId = games.length + 1;
  games.push({
    id: newGameId,
    date,
    team1Id: parseInt(team1Id, 10),
    team2Id: parseInt(team2Id, 10),
    team1Score: parseInt(team1Score, 10),
    team2Score: parseInt(team2Score, 10),
  });
  res.redirect("admin");
});

app.post("/games/:id", (req, res) => {
  const gameId = parseInt(req.params.id, 10);
  const gameIndex = games.findIndex((g) => g.id === gameId);
  if (gameIndex !== -1) {
    games.splice(gameIndex, 1);
  }
  res.redirect("/admin");
});

app.post("/teams", (req, res) => {
  const { name } = req.body;
  // Перевіряємо, чи існує команда з введеною назвою в масиві
  const existingTeamIndex = teams.findIndex((team) => team.name === name);
  if (existingTeamIndex !== -1) {
    // Якщо команда існує, то видаляємо її з масиву
    teams.splice(existingTeamIndex, 1);
  } else {
    // Якщо команда не існує, то додаємо її до масиву
    const newTeamId = teams.length + 1;
    teams.push(new Team(newTeamId, name));
  }
  res.redirect("/admin");
});

// Відображення форми редагування команди
app.post("/teams/edit", (req, res) => {
  const teamName = req.params.name;
  const team = teams.find((t) => t.name === teamName);
  res.render("teamEdit", { team });
});

app.post("/team", (req, res) => {
  const searchTeam = req.body.name;
  if (!searchTeam) {
    return res.status(400).send("Missing search query");
  }
  const nameTeam = teams.find((t) => t.name === searchTeam);

  if (!nameTeam) {
    return res.status(404).send(`No games found for team '${searchTeam}'`);
  }
  const teamGames = games.filter(
    (game) => game.team1Id === nameTeam.id || game.team2Id === nameTeam.id
  );

  res.render("team", { teams, team: nameTeam, games: teamGames });
});

app.use(express.static("public"));

/* eslint no-console: "off" */
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
