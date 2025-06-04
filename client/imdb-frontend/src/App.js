import React, { useRef } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Navbar from "./Components/Navbar";
import AddMovie from "./Components/AddMovie";
import MovieTables from "./Components/MovieTables";
import IMDbSearchIntegration from "./Components/IMDbSearchIntegration";

function App() {
  //reference for movie
  const addMovieRef = useRef();

  const handleCreateMovie = (omdbMovie) => {
    const movieData = {
      name: omdbMovie.Title || "",
      producerName: omdbMovie.Director || "",
      yearOfRelease: omdbMovie.Released
        ? new Date(omdbMovie.Released).toISOString().slice(0, 10)
        : "",
      actorNames: omdbMovie.Actors
        ? omdbMovie.Actors.split(",").map((a) => a.trim())
        : [],
    };
    if (addMovieRef.current && addMovieRef.current.prefillForm) {
      addMovieRef.current.prefillForm(movieData);
    }
  };

  return (
    <Container>
      <Navbar />
      <Row className="justify-content-md-center mt-4">
        <Col lg="8">
          <IMDbSearchIntegration onCreateMovie={handleCreateMovie} />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col lg="6">
          <AddMovie ref={addMovieRef} />
        </Col>
      </Row>
      <MovieTables />
      <ToastContainer position="top-center" autoClose={3000} />
    </Container>
  );
}

export default App;
