import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createMovie } from '../slices/MovieSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const AddMovie = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const [movie, setMovie] = useState("");
  const [producer, setProducer] = useState("");
  const [yearOfRelease, setYearOfRelease] = useState("");
  const [actors, setActors] = useState([]);
  const [actorInput, setActorInput] = useState("");
  const [errors, setErrors] = useState({});

  // 👇 Allow external component (App.js) to call this
  useImperativeHandle(ref, () => ({
    prefillForm: ({ name, producerName, yearOfRelease, actorNames }) => {
      setMovie(name || '');
      setProducer(producerName || '');
      setYearOfRelease(yearOfRelease || '');
      setActors(actorNames || []);
      setActorInput('');
      setErrors({});
    }
  }));

  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();

    if (!movie.trim()) newErrors.movie = "Movie name is required.";
    if (!producer.trim()) newErrors.producer = "Producer name is required.";

    if (!yearOfRelease) newErrors.year = "Release year is required.";
    else {
      const date = new Date(yearOfRelease);
      if (isNaN(date.getTime())) newErrors.year = "Invalid date format.";
      else {
        const year = date.getFullYear();
        if (year < 1800 || year > currentYear)
          newErrors.year = `Enter a valid year between 1800 and ${currentYear}.`;
      }
    }

    if (actors.length === 0 && !actorInput.trim())
      newErrors.actors = "At least one actor is required.";

    return newErrors;
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      let finalActors = [...actors];
      if (actorInput.trim()) finalActors.push(actorInput.trim());

      dispatch(
        createMovie({
          name: movie,
          producerName: producer,
          yearOfRelease: yearOfRelease,
          actorNames: finalActors,
        })
      ).then(() => {
        toast.success("Movie added successfully!");
        setMovie("");
        setProducer("");
        setYearOfRelease("");
        setActors([]);
        setActorInput("");
        setErrors({});
      }).catch(() => {
        toast.error("Failed to add movie.");
      });
    }
  };

  const handleAddActor = (e) => {
    e.preventDefault();
    if (actorInput.trim()) {
      setActors([...actors, actorInput.trim()]);
      setActorInput("");
      setErrors((prev) => ({ ...prev, actors: null }));
    }
  };

  return (
    <div className="container mt-4">
      <Form onSubmit={onHandleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Enter Movie Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Movie"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            isInvalid={!!errors.movie}
          />
          <Form.Control.Feedback type="invalid">{errors.movie}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter Producer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Producer"
            value={producer}
            onChange={(e) => setProducer(e.target.value)}
            isInvalid={!!errors.producer}
          />
          <Form.Control.Feedback type="invalid">{errors.producer}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Year of Release</Form.Label>
          <Form.Control
            type="date"
            value={yearOfRelease}
            onChange={(e) => setYearOfRelease(e.target.value)}
            isInvalid={!!errors.year}
          />
          <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Add Actor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Actor Name"
            value={actorInput}
            onChange={(e) => setActorInput(e.target.value)}
            isInvalid={!!errors.actors}
          />
          <Button variant="secondary" className="mt-2" onClick={handleAddActor}>
            Add Actor
          </Button>
          {errors.actors && <div className="text-danger mt-1">{errors.actors}</div>}
        </Form.Group>

        {actors.length > 0 && (
          <div className="mb-3">
            <strong>Actors:</strong>
            <ul>
              {actors.map((actor, index) => (
                <li key={index}>{actor}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-center my-4">
          <Button variant="primary" type="submit" size="lg">
            Add Movie
          </Button>
        </div>
      </Form>
    </div>
  );
});

export default AddMovie;