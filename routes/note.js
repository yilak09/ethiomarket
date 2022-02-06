const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find({});
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send(error);
  }
})

router.post('/notes', async (req, res) => {
  const note = new  Note(req.body);
  try {
    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(500).send(error);
  }
})



module.exports = router;