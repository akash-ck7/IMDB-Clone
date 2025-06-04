const express = require("express");
const router = express.Router();
const actorController = require("../controllers/actor.controller");

router.post("/", actorController.createActor);
router.get("/", actorController.getAllActors);

module.exports = router;
