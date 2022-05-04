const req = require("express/lib/request");
const res = require("express/lib/response");
const path = require("path");
const router = require("express").Router();
// ROUTE FOR NOTE
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});
// ROUTE FOR HTML
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
module.exports = router;