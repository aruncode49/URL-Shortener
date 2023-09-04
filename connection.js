const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("Connect to MongoDB"))
    .catch((err) => console.log("Error", err));
}

module.exports = {
  connectToMongoDB,
};
