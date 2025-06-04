const db = require("../models");
const Movie = db.Movie;
const Actor = db.Actor;
const Producer = db.Producer;

function formatDate(date) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return null;
  return date.toISOString().split("T")[0];
}

// Create a new movie
exports.createMovie = async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { name, yearOfRelease, producerName, actorNames } = req.body;

    if (
      !name ||
      !yearOfRelease ||
      !producerName ||
      !Array.isArray(actorNames) ||
      actorNames.length === 0
    ) {
      return res.status(400).json({
        error:
          "All fields are required for post request : name, yearOfRelease, producerName, actorNames.",
      });
    }

    const releaseDate = new Date(yearOfRelease);
    if (isNaN(releaseDate.getTime())) {
      return res.status(400).json({ error: "Invalid yearOfRelease date." });
    }

    // Find or create Producer name
    let producer = await Producer.findOne({
      where: { name: producerName.trim() },
    });
    if (!producer) {
      producer = await Producer.create({ name: producerName.trim() });
    }

    // Create the  Movie
    const movie = await Movie.create({
      name: name.trim(),
      releaseDate: releaseDate,
      ProducerId: producer.id,
    });

    // Find or create Actrs
    const actorIds = [];
    for (const actorName of actorNames) {
      if (!actorName.trim()) continue;
      let actor = await Actor.findOne({ where: { name: actorName.trim() } });
      if (!actor) {
        actor = await Actor.create({ name: actorName.trim() });
      }
      actorIds.push(actor.id);
    }

    await movie.setActors(actorIds);

    // Fetch full movie with relations in db
    const fullMovie = await Movie.findByPk(movie.id, {
      include: [Producer, Actor],
    });

    const response = fullMovie.toJSON();
    response.yearOfRelease = formatDate(fullMovie.releaseDate);

    res.status(201).json(response);
  } catch (error) {
    console.error("Create Movie Error:", error);
    res.status(500).json({ error: "Failed to create movie. " + error.message });
  }
};

// Get all movies in the db
exports.getAllMovies = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const movies = await Movie.findAll({
      include: [Producer, Actor],
      order: [["createdAt", "DESC"]],
    });

    const moviesFormatted = movies.map((m) => {
      const obj = m.toJSON();
      obj.yearOfRelease = formatDate(m.releaseDate);
      return obj;
    });

    res.json(moviesFormatted);
  } catch (error) {
    console.error("Fetch Movies Error:", error);
    res.status(500).json({ error: "Failed to fetch movies." });
  }
};

// Update the  movie
exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, yearOfRelease, producerName, actorNames } = req.body;

    if (
      !name ||
      !yearOfRelease ||
      !producerName ||
      !Array.isArray(actorNames) ||
      actorNames.length === 0
    ) {
      return res.status(400).json({
        error:
          "All fields are required: name, yearOfRelease, producerName, actorNames.",
      });
    }

    const releaseDate = new Date(yearOfRelease);
    if (isNaN(releaseDate.getTime())) {
      return res.status(400).json({ error: "Invalid yearOfRelease date." });
    }

    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });

    // Find or create Producer
    let producer = await Producer.findOne({
      where: { name: producerName.trim() },
    });
    if (!producer) {
      producer = await Producer.create({ name: producerName.trim() });
    }

    // Find or create Actors
    const actorIds = [];
    for (const actorName of actorNames) {
      if (!actorName.trim()) continue;
      let actor = await Actor.findOne({ where: { name: actorName.trim() } });
      if (!actor) {
        actor = await Actor.create({ name: actorName.trim() });
      }
      actorIds.push(actor.id);
    }

    // Update Movie in our db 
    await movie.update({
      name: name.trim(),
      releaseDate: releaseDate,
      ProducerId: producer.id,
    });

    await movie.setActors(actorIds);

    const updatedMovie = await Movie.findByPk(id, {
      include: [Producer, Actor],
    });

    const response = updatedMovie.toJSON();
    response.yearOfRelease = formatDate(updatedMovie.releaseDate);

    res.json(response);
  } catch (error) {
    console.error("Update Movie Error:", error);
    res.status(500).json({ error: "Failed to update movie. " + error.message });
  }
};

// Delete a movie in our db
exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });

    await movie.destroy();
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Delete Movie Error:", error);
    res.status(500).json({ error: "Failed to delete movie." });
  }
};
