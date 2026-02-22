const MovieList = ({
  movies,
  deleteMovie,
  toggleStatus,
  setEditMovie,
}) => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div className="card" key={movie.id}>
          <h3>{movie.title}</h3>
          <p>Genre: {movie.genre}</p>
          <p>Rating: ⭐ {movie.rating}</p>
          <p>Status: {movie.watched ? "Watched" : "Not Watched"}</p>

          <button onClick={() => toggleStatus(movie.id)}>
            Toggle Status
          </button>
          <button onClick={() => setEditMovie(movie)}>
            Edit
          </button>
          <button onClick={() => deleteMovie(movie.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MovieList;