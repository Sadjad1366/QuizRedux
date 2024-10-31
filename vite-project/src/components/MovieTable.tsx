import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { deleteMovie } from "../store/movieSlice";

const MovieTable: React.FC = () => {
  const movies = useSelector((state: RootState) => state.movie.movies);
  const dispatch = useDispatch();
  const [sortColumn, setSortColumn] = useState<"name" | "rate" | "director">();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleDelete = (id: number) => {
    dispatch(deleteMovie(id));
  };

  const handleSort = (column: "name" | "rate" | "director") => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedMovies = [...movies].sort((a, b) => {
    if (sortColumn === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortColumn === "rate") {
      return sortOrder === "asc" ? a.rate - b.rate : b.rate - a.rate;
    }
    if (sortColumn === "director") {
      return sortOrder === "asc"
        ? a.director.localeCompare(b.director)
        : b.director.localeCompare(a.director);
    }
    return 0;
  });

  return (
    <table className="w-full max-w-[1440px] mt-3 text-center bg-slate-400 rounded-lg">
      <thead className="border bg-slate-200 ">
        <tr>
          <th className="p-3" onClick={() => handleSort("name")}>
            Name {sortColumn === "name" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th onClick={() => handleSort("director")}>
            Director
            {sortColumn === "name" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th onClick={() => handleSort("rate")}>
            Rate {sortColumn === "rate" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedMovies.map((movie) => (
          <tr key={movie.id}>
            <td>{movie.name}</td>
            <td>{movie.director}</td>
            <td>{movie.rate}</td>
            <td>
              <button
                className="bg-red-700 text-white p-2 m-2 rounded-lg"
                onClick={() => handleDelete(movie.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MovieTable;
