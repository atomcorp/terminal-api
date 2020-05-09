const express = require("express");
const cron = require("node-cron");
const fs = require("fs");

const getThemes = require("./get-themes");

const app = express();
const port = 3001;
const whitelist = [
  "http://localhost:3000/themes",
  "https://atomcorp.github.io/themes/",
];

cron.schedule(
  "0 0 * * *",
  () => {
    getThemes();
  },
  {
    timezone: "Europe/London",
  }
);

app.use((req, res, next) => {
  if (whitelist.includes(req.get("Referer"))) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  } else {
    new Error("Invalid Referer");
  }
  next();
});

app.get("/api/v1/themes", (req, res) => {
  const fileBlob = fs.readFileSync("./themes.json");
  const fileJson = JSON.parse(fileBlob.toString());
  res.send(fileJson);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
