module.exports = (app) => {
  const notes = require("../controllers/note.controller.js");

  // create a new Note
  app.post("/note", notes.create);

  // Retrieve all Notes
  app.get("/notes", notes.findAll);

  // Retrieve a single note with noteId
  app.get("/notes/:id", notes.findOne);

  // Update a note with noteId
  app.put("/notes/:id", notes.update);

  // Delete a Note with noteId
  app.delete("/notes/:id", notes.delete);
};
