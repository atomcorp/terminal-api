const fs = require("fs");

// recieve a number and write it to json

const main = (number) => {
  fs.writeFileSync("./themes.json", JSON.stringify({ number: number }));
};

module.exports = main;
