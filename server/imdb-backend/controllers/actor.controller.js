const db = require("../models");
const Actor = db.Actor;
// create an actor detailes for future develpment
exports.createActor = async (req, res) => {
  try {
    const { name, gender, dob, bio } = req.body;
    const actor = await Actor.create({ name, gender, dob, bio });
    res.status(201).json(actor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllActors = async (req, res) => {
  try {
    const actors = await Actor.findAll();
    res.json(actors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
