const notes = require("express").Router();
const {
  getDataFromDB,
  readAndAppend,
  writeToDatabase,
} = require("../utils/utils");
const { v4: uuidv4 } = require("uuid");

// GETS ALL ROUTES
notes.get("/notes", (req, res) => {
  // READ FILE FROM DB.JSON FILE
  getDataFromDB("./db/db.json").then((data) => res.json(JSON.parse(data)));
});
// CREATES NOTE
notes.post("/notes", (req, res) => {
  const { title, text } = req.body;
  // VALIDATES
  if (title && text) {
    const newNote = {
      title,
      text,
      // ID GENERATOR
      id: uuidv4(),
    };
    // APPENDS NEW NOTE
    readAndAppend(newNote, "./db/db.json");

    res.json(newNote);
  } else {
    res.json("Unable to post note");
  }
});

// DELETE NOTE CONTROLLER
notes.delete("/notes/:id", (req, res) => {
  getDataFromDB("./db/db.json").then((data) => {
    const notes = JSON.parse(data);
    const note = notes.find((c) => c.id === req.params.id);
    //ID FILTER
    if (!note) return res.status(404).send("Note not found");

    const index = notes.indexOf(note);

    notes.splice(index, 1);

    writeToDatabase("./db/db.json", notes);

    res.send(`note deleted`);
  });
});

notes.get("/all/notes/:id", (req, res) => {
  getDataFromDB("./db/db.json").then((data) => {
    const notes = JSON.parse(data);

    const note = notes.find((c) => c.id === req.params.id);

    if (note !== undefined) return res.json(note);
  });
});
module.exports = notes;