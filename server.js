const express = require("express");
const mongoose = require("mongoose");
const route = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost:27017/urlShortener", {});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", route);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
