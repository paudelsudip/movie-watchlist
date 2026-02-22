import { useState, useEffect } from "react";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [editMovie, setEditMovie] = useState(null);
  const [filter, setFilter] = useState("All");

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("movies"));
    if (saved) setMovies(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const addMovie = (movie) => {
    if (editMovie) {
      setMovies(
        movies.map((m) =>
          m.id === editMovie.id ? { ...movie, id: m.id } : m
        )
      );
      setEditMovie(null);
    } else {
      setMovies([...movies, { ...movie, id: Date.now() }]);
    }
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter((m) => m.id !== id));
  };

  const toggleStatus = (id) => {
    setMovies(
      movies.map((m) =>
        m.id === id ? { ...m, watched: !m.watched } : m
      )
    );
  };

  const filteredMovies =
    filter === "All"
      ? movies
      : movies.filter((m) => m.genre === filter);

  const averageRating =
    movies.length === 0
      ? 0
      : (
          movies.reduce((acc, m) => acc + Number(m.rating), 0) /
          movies.length
        ).toFixed(1);

  return (
    <div className="container">
      <h1>🎬 Movie Watchlist Manager</h1>

      <MovieForm addMovie={addMovie} editMovie={editMovie} />

      <div className="filter">
        <select onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Action</option>
          <option>Comedy</option>
          <option>Drama</option>
          <option>Sci-Fi</option>
        </select>
      </div>

      <p>⭐ Average Rating: {averageRating}</p>

      <MovieList
        movies={filteredMovies}
        deleteMovie={deleteMovie}
        toggleStatus={toggleStatus}
        setEditMovie={setEditMovie}
      />
    </div>
  );
}

export default App;