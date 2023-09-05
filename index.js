const express = require("express");

const { connectToMongoDB } = require("./connection");
const urlRouter = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

// Connection with MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/short-url");

// set the view engine to ejs
app.set("view engine", "ejs");
// app.set("views", path.resolve("./views")); => optional because render bydefault check in views folder

// Using Middleware for JSON Body
app.use(express.json());

// Using Middleware for Form Data
app.use(express.urlencoded({ extended: false }));

// Use the static route for home page
app.use("/", staticRoute);

// Using Router
app.use("/url", urlRouter);

// Get ShortUrl
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

// Listening at Port
app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
