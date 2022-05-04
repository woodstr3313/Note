const express = require("express");
const notes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const { getDataFromDB } = require("./utils/utils");
const app = express();
const path = require("path");
// PACKAGE FOR RANDOM ID
const { v4: uuidv4 } = require("uuid");
uuidv4();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json());

// STATIC FILES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api", notes);
app.use("/", htmlRoutes);

app.listen(PORT, () => console.log(`App listening on ${PORT}`));