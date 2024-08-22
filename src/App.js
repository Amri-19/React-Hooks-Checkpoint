// src/App.js
import React, { useState } from 'react';
import './App.css'; // Include your styles here

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.posterURL} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p>Rating: {movie.rating}</p>
    </div>
  );
};

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
    </div>
  );
};

const Filter = ({ onFilter }) => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');

  const handleFilterChange = () => {
    onFilter({ title, rating });
  };

  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Filter by title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Filter by rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const addMovie = (movie) => {
    setMovies([...movies, movie]);
    setFilteredMovies([...movies, movie]);
  };

  const filterMovies = ({ title, rating }) => {
    const filtered = movies.filter((movie) => {
      return (
        (title === '' || movie.title.toLowerCase().includes(title.toLowerCase())) &&
        (rating === '' || movie.rating >= rating)
      );
    });
    setFilteredMovies(filtered);
  };

  return (
    <div className="app">
      <h1>Movie App</h1>
      <Filter onFilter={filterMovies} />
      <button
        onClick={() =>
          addMovie({
            title: 'New Movie',
            description: 'Description of new movie',
            posterURL: 'https://via.placeholder.com/150',
            rating: 5,
          })
        }
      >
        Add New Movie
      </button>
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default App;
