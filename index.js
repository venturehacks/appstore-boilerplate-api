const express = require("express");
const app = express();
const port = process.env.PORT || 5555;

//Loads the handlebars module
const handlebars = require("express-handlebars");
//Sets our app to use the handlebars engine
app.set("view engine", "handlebars");
//Sets handlebars configurations (we will go through them later on)
app.engine(
  "handlebars",
  handlebars({
    layoutsDir: __dirname + "/views/layouts",
  })
);

let token = null;
const { getToken, getCount, setCount, get } = require("./api");

app.use(express.static("public"));

//Required View Pages
app.get("/main", async (req, res) => {
  token = await getToken();
  const count = await getCount(token);
  console.log({ token, count });
  res.render("main", { token, count });
});

app.get("/preview", (req, res) => {
  res.render("preview");
});

app.get("/results", (req, res) => {
  const leaderboard = get(token);
  res.render("results", { leaderboard });
});

//Post routes
app.get("/i", async (req, res) => {
  const count = req.query?.count;
  setCount(token, count);
  submit(token, count);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
