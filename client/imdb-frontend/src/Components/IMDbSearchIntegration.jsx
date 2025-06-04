import React, { useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const API_KEY = 'b45bec32';

function IMDbSearchIntegration({ onCreateMovie }) {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://www.omdbapi.com/?t=${query}&apikey=${API_KEY}`);
      if (res.data.Response === 'True') {
        setMovie(res.data);
        setError('');
      } else {
        setMovie(null);
        setError('Movie not found.');
      }
    } catch {
      setError('Error fetching movie data.');
      setMovie(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setMovie(null);
    setError('');
  };

  return (
    <div className="mb-4">
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter movie name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
        <Button variant="secondary" onClick={handleClear}>Clear</Button>
      </InputGroup>

      {error && <p className="text-danger">{error}</p>}

      {loading && (
        <div className="text-center my-2">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {movie && !loading && (
        <Card className="mt-3 shadow-sm">
          <div className="row g-0">
            <div className="col-md-4 text-center">
              {movie.Poster !== 'N/A' ? (
                <Card.Img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="img-fluid"
                />
              ) : (
                <div className="d-flex flex-column justify-content-center align-items-center h-100 p-3">
                  <div
                    className="border rounded p-3 bg-light text-muted text-center"
                    style={{ height: '100%', width: '100%' }}
                  >
                    <p className="mb-0">Poster image not available</p>
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-8">
              <Card.Body>
                <Card.Title>{movie.Title} ({movie.Year})</Card.Title>
                <Card.Text>
                  <strong>Actors:</strong> {movie.Actors}<br />
                  <strong>Producer:</strong> {movie.Director}<br />
                  <strong>Released:</strong> {movie.Released}
                </Card.Text>
                <Button
                  variant="success"
                  onClick={() => onCreateMovie(movie)}
                >
                  Add Movie
                </Button>
              </Card.Body>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default IMDbSearchIntegration;