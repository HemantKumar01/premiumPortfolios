const chalk = require("chalk");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 5000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(port, () => {
  console.log(chalk.cyan("App Started on port " + port));
  console.log(chalk.yellow("http://localhost:" + port));
});
