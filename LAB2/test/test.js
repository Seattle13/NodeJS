const assert = require("assert");
const http = require("http");
const fs = require("fs");
const chai = require("chai");

var expect = chai.expect;

describe("Server", () => {
  // Тест, що перевіряє наявність списку файлів на головній сторінці веб-сервера
  it("Should return list of files on main page", (done) => {
    http.get("http://localhost:3000", (res) => {
      expect(res.statusCode).to.equal(200);
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        expect(data).to.contain("<ul>");
        done();
      });
    });
  });

  // Тест, що перевіряє наявність тексту новини на сторінці даної новини
  it("Should return news text on news page", (done) => {
    http.get("http://localhost:3000/news/news_1.txt", (res) => {
      expect(res.statusCode).to.equal(200);
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        let content = fs.readFileSync("./news/news_1.txt").toString();
        expect(data).to.contain(content);
        done();
      });
    });
  });

  // Тест, що перевіряє наявність 404-ї помилки при запиті на невідому сторінку
  it("Should return 404 for unknown page", (done) => {
    http.get("http://localhost:3000/unknown", (res) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });

  // Тест, що перевіряє статус-код відповіді даного веб-сервера
  it("Should return 200 status code", (done) => {
    http.get("http://localhost:3000", (res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
