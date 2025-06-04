import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { updateMovie } from '../slices/MovieSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
const EditTask = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const selectedMovie = useSelector((state) => state.tasks.selectedMovieList);

  const [movie, setMovie] = useState("");
  const [producer, setProducer] = useState("");
  const [yearOfRelease, setYearOfRelease] = useState("");
  const [actors, setActors] = useState([]);
  const [actorInput, setActorInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [id, setId] = useState(0);
  
useEffect(() => {
  console.log("selectedMovie:", selectedMovie);
}, [selectedMovie]);

  useEffect(() => {
  if (selectedMovie && Object.keys(selectedMovie).length > 0) {
    setMovie(selectedMovie.movie || selectedMovie.name || "");
    setProducer(selectedMovie.producer || selectedMovie.producerName || "");
    const yr = selectedMovie.yearOfRelease;
    if (yr) {
      if (/^\d{4}$/.test(yr)) {
        setYearOfRelease(`${yr}-01-01`);
      } else {
        setYearOfRelease(yr);
      }
    } else {
      setYearOfRelease("");
    }
    setActors(selectedMovie.actors || selectedMovie.actorNames || []);
    setId(selectedMovie.id || 0);
  }
}, [selectedMovie]);

  const handleAddActor = (e) => {
    e.preventDefault();
    const name = actorInput.trim();
    if (!name) return;

    if (editIndex !== null) {
      const updated = [...actors];
      updated[editIndex] = name;
      setActors(updated);
      setEditIndex(null);
    } else {
      setActors([...actors, name]);
    }

    setActorInput("");
  };

  const handleEditActor = (index) => {
    setActorInput(actors[index]);
    setEditIndex(index);
  };

  const handleDeleteActor = (index) => {
    const updated = actors.filter((_, i) => i !== index);
    setActors(updated);
    if (editIndex === index) {
      setEditIndex(null);
      setActorInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 dispatch(updateMovie({
  id,
  name: movie,
  producerName: producer,
  yearOfRelease: yearOfRelease,
  actorNames: actors,
}))
.then(() => {
  toast.success("Movie updated successfully!");
  onHide();
})
.catch(() => {
  toast.error("Failed to update movie.");
});


  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Movie</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Movie</Form.Label>
            <Form.Control
              type="text"
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Producer</Form.Label>
            <Form.Control
              type="text"
              value={producer}
              onChange={(e) => setProducer(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year of Release</Form.Label>
            <Form.Control
              type="date"
              value={yearOfRelease}
              onChange={(e) => setYearOfRelease(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Actors</Form.Label>
            <Form.Control
              type="text"
              value={actorInput}
              onChange={(e) => setActorInput(e.target.value)}
              placeholder="Add Actor Name"
            />
            <Button
              className="mt-2"
              variant="secondary"
              onClick={handleAddActor}
            >
              {editIndex !== null ? "Update Actor" : "Add Actor"}
            </Button>

            {actors.length > 0 && (
              <ul className="mt-2">
                {actors.map((actor, index) => (
                  <li key={index}>
                    {actor}{" "}
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEditActor(index)}
                      className="mx-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteActor(index)}
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">Update Movie</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditTask;