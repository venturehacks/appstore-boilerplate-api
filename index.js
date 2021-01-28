const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.get("/preview", (req, res) => {
  res.send("PREVIEW!!");
});

app.get("/results", (req, res) => {
  res.send("RESULTS!!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
