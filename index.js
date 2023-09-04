const express = require("express");

const { connectToMongoDB } = require("./connection");
const urlRouter = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

// Using Middleware for JSON Body
app.use(express.json());

// Connection with MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/short-url");

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
