const express = require("express");
const app = express();
// AJOUTER LES DEUX LIGNES ICI
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

const PORT = 8080;

const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://azhan:1234@cluster0.nfeev.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"));

const routes = require("./routes");
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});