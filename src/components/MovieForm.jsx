import { useState, useEffect } from "react";

const MovieForm = ({ addMovie, editMovie }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("Action");
  const [rating, setRating] = useState("");

  useEffect(() => {
    if (editMovie) {
      setTitle(editMovie.title);
      setGenre(editMovie.genre);
      setRating(editMovie.rating);
    }
  }, [editMovie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie({ title, genre, rating, watched: false });
    setTitle("");
    setGenre("Action");
    setRating("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Movie Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        <option>Action</option>
        <option>Comedy</option>
        <option>Drama</option>
        <option>Sci-Fi</option>
      </select>

      <input
        type="number"
        placeholder="Rating (1-5)"
        value={rating}
        min="1"
        max="5"
        onChange={(e) => setRating(e.target.value)}
        required
      />

      <button type="submit">
        {editMovie ? "Update" : "Add Movie"}
      </button>
    </form>
  );
};

export default MovieForm;