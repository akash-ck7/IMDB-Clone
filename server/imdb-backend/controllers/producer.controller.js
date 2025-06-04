const db = require("../models");
const Producer = db.Producer;
// create an producer details for future development
exports.createProducer = async (req, res) => {
  try {
    const { name, gender, dob, bio } = req.body;
    const producer = await Producer.create({ name, gender, dob, bio });
    res.status(201).json(producer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProducers = async (req, res) => {
  try {
    const producers = await Producer.findAll();
    res.json(producers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
