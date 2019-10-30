const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const dbconfig = {
  URI: "mongodb://localhost:27017/cacuradura",
  secret: "nocluewhichsecretisthis"
};

mongoose.connect(dbconfig.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
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
