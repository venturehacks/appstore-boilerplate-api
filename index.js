const express = require("express");
const app = express();
const port = process.env.PORT || 5555;

//Loads the handlebars module
const handlebars = require("express-handlebars");
app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  handlebars({
    layoutsDir: __dirname + "/views/layouts",
  })
);

//Allow use of public folder.
app.use(express.static("public"));

//Import actions from out api file.
const { getToken, getCount, setCount, get, submit } = require("./api");

//Required View Pages
app.get("/main", async (req, res) => {
  const uid = req.query?.uid;
  const token = await getToken(uid);
  const count = await getCount(token, uid);
  res.render("main", { token, count });
});

app.get("/preview", (req, res) => {
  const uid = req.query?.uid;
  res.render("preview");
});

app.get("/results", (req, res) => {
  const uid = req.query?.uid;
  const token = await getToken(uid);
  const leaderboard = get(token, uid);
  res.render("results", { leaderboard });
});

//Post routes
app.get("/i", async (req, res) => {
  const uid = req.query?.uid;
  const token = await getToken(uid);
  const count = req.query?.count;
  setCount(token, count, uid);
  submit(token, count, uid);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
