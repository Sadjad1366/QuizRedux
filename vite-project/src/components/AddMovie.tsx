import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../store/movieSlice";
import { movieSchema } from "../shemas/movieSchema";

const AddMovie: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [director, setDirector] = useState("");
  const [rate, setRate] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const movie = {
      id: Date.now(),
      name,
      director,
      rate,
    };

    const validationResult = movieSchema.safeParse(movie);
    if (validationResult.success) {
      dispatch(addMovie(movie));
      setName("");
      setDirector("");
      setRate(0);
      setErrors({});
    } else {
      const validationErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        validationErrors[issue.path[0]] = issue.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-around mt-3">
      <div className="flex flex-col">
        <input
          className="border rounded-lg border-slate-400 p-2"
          type="text"
          placeholder="Movie Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div className="flex flex-col">
        <input
          className="border rounded-lg border-slate-400 p-2"
          type="text"
          placeholder="Director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        />
        {errors.director && <span>{errors.director}</span>}
      </div>
      <div className="flex flex-col">
        <input
          className="border rounded-lg border-slate-400 p-2"
          type="number"
          placeholder="Rate"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
        />
        {errors.rate && <span>{errors.rate}</span>}
      </div>
      <button className="bg-green-500 px-2" type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovie;
