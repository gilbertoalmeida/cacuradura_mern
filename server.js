const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const config = require("config");

const dbconfig = config.get("mongoURI");

mongoose.connect(dbconfig, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
let db = mongoose.connection;

//check connection
db.once("open", () => console.log("connected to mongoDB"));

//check for db erros
db.on("error", err => console.log(err));

const app = express();

// BodyParser Middleware
app.use(express.json());

//Use Routes
app.use("/api/articles", require("./routes/api/articles"));
app.use("/api/comments", require("./routes/api/comments"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static assets if we are in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);
