import React, {useState} from 'react';
import MovieCard from './MovieCard';

export default function SearchMovies() {
  //states - input query, movies
  const [query, setQuery] = useState('');
  // create the state for movies, and update that state appropriate
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=8a24c38a5f21901405729463a2ca43e1&language=en-US&query=${query}&page=1&include_adult=false`;
    
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  }  

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label htmlFor="query" className="label">Movie Name</label>
        <input type="text" className="input" name="query" 
          placeholder="Eg. Money Heist"
          value={query} onChange={(e) => setQuery(e.target.value)}/>
        <button type="submit" className="button">Search</button>
      </form>
      <div className="card-list">
        {movies.filter(movie => movie.poster_path).map(movie => (
          <MovieCard movie={movie} key={movie.id}/>
        ))}
      </div>
    </>
  );
}