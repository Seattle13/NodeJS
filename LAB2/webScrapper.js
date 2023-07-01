const http = require("http");
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const request = require("request");

const url = "https://www.bbc.com/news/";

// Функція для отримання списку файлів у директорії
function getFilesList() {
  const files = fs.readdirSync("./news");
  const list = files.map(
    (file) => `<li><a href="/news/${file}">${file}</a></li>`
  );
  return `<ul>${list.join("")}</ul>`;
}

// Функція для отримання тексту новини
function getNewsText(file) {
  const newsPath = path.join(__dirname, "news", file);
  const newsContent = fs.readFileSync(newsPath, "utf8");
  return newsContent;
}

// Функція для збереження новин у директорії
function saveNews(newsList) {
  newsList.forEach((news, index) => {
    const filePath = path.join(__dirname, "news", `news_${index + 1}.txt`);
    fs.writeFileSync(filePath, news);
  });
}

// Функція для виконання web-scrapping
function scrapeNews() {
  request(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const dom = new JSDOM(body);
      const newsList = dom.window.document.querySelectorAll(
        "a.gs-c-promo-heading"
      );
      const newsContent = [];
      for (const news of newsList) {
        newsContent.push(news.innerHTML);
      }
      saveNews(newsContent);
    } else {
      console.error(`Error scraping news: ${error}`);
    }
  });
}
scrapeNews();

// Виконуємо web-scrapping раз в хвилину
setInterval(() => {
  console.log("Downloading news...");
  scrapeNews();
}, 60000);

// Створюємо веб-сервер
const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    // Відображаємо список файлів у директорії
    const filesList = getFilesList();
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(filesList);
  } else if (url.startsWith("/news/")) {
    // Відображаємо текст новини
    const file = url.split("/").pop();
    const newsText = getNewsText(file);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(newsText);
  } else {
    // Обробляємо невідому адресу
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
