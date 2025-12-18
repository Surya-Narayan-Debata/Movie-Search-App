import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';

const API_KEY = '50837e04';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('react-movie-app-favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchTerm) {
        setMovies([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError(data.Error);
        }
      } catch (err) {
        setError('Failed to fetch movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const debounceId = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(debounceId);
  }, [searchTerm]);

  const toggleFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.imdbID === movie.imdbID);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.imdbID !== movie.imdbID);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  const handleMovieSelect = (imdbID) => {
    setSelectedMovieId(imdbID);
  };

  const handleCloseMovie = () => {
    setSelectedMovieId(null);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white font-sans relative">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold text-red-600 mb-2 tracking-wide uppercase">Popcorn</h1>
          <p className="text-gray-400 text-lg">Unlimited movies, TV shows, and more.</p>
        </header>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="min-h-[400px]">
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
            </div>
          )}

          {error && (
            <div className="text-center text-gray-400 mt-10 text-xl">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && movies.length === 0 && searchTerm && (
            <div className="text-center text-gray-400 mt-10 text-xl">
              <p>No movies found matching "{searchTerm}"</p>
            </div>
          )}
          {!loading && !error && movies.length === 0 && !searchTerm && favorites.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-red-600 pl-4">Your Nominations</h2>
              <MovieList
                movies={favorites}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                onMovieSelect={handleMovieSelect}
              />
            </div>
          )}

          {!loading && !error && movies.length > 0 && (
            <div>
              <MovieList
                movies={movies}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                onMovieSelect={handleMovieSelect}
              />
            </div>
          )}
        </div>
      </div>

      {selectedMovieId && (
        <MovieDetails imdbID={selectedMovieId} onClose={handleCloseMovie} />
      )}
    </div>
  );
}

export default App;
