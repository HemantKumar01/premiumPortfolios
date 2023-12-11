const express = require("express");
const app = express();
const port = 3000;

app.set("trust proxy", true);

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./public" });
});

app.get("/scan", (req, res) => {
  console.log(req.ip);
  res.sendFile("scan/index.html", { root: "./public" });
});

app.get("/create", (req, res) => {
  console.log(req.ip);
  res.send("WORKING! CHECK NODE CONSOLE");
});

app.get("/register", (req, res) => {
  console.log(req.ip);
  res.sendFile("login/register.html", { root: "./public" });
});

app.get("/login", (req, res) => {
  console.log(req.ip);
  res.sendFile("login/login.html", { root: "./public" });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
app.use(express.static("public"));
