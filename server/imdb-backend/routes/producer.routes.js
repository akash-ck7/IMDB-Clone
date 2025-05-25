const express = require("express");
const router = express.Router();
const producerController = require("../controllers/producer.controller");

router.post("/", producerController.createProducer);
router.get("/", producerController.getAllProducers);

module.exports = router;
