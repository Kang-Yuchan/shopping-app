const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const userAPIRouter = require("./routes/users");
const productAPIRouter = require("./routes/product");
dotenv.config();

const PORT = process.env.PORT;
const cors_origin = [`http://localhost:5000`];

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB connected.."))
  .catch(error => console.log(error));

app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json
app.use(cookieParser());
app.use(
  cors({
    origin: cors_origin,
    credentials: true
  })
);

app.get("/", (req, res) => res.send("Hello express"));
app.use("/api/users", userAPIRouter);
app.use("/api/product", productAPIRouter);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Listening on localhost:${PORT} ⚡`));
