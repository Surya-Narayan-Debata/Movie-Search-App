import React, { useEffect, useState } from 'react';

const MovieDetails = ({ imdbID, onClose }) => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://www.omdbapi.com/?apikey=50837e04&i=${imdbID}&plot=full`);
                const data = await response.json();

                if (data.Response === 'True') {
                    setMovie(data);
                } else {
                    setError(data.Error);
                }
            } catch (err) {
                setError('Failed to load movie details.');
            } finally {
                setLoading(false);
            }
        };

        if (imdbID) {
            fetchDetails();
        }
    }, [imdbID]);

    if (!imdbID) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-[#181818] rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative text-white border border-gray-800"
                onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black bg-opacity-50 rounded-full p-2 transition-colors z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {loading ? (
                    <div className="flex h-96 items-center justify-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
                    </div>
                ) : error ? (
                    <div className="flex h-96 items-center justify-center text-red-500 text-xl">
                        {error}
                    </div>
                ) : movie ? (
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                            {movie.Poster !== "N/A" ? (
                                <img src={movie.Poster} alt={movie.Title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-96 bg-gray-800 flex items-center justify-center text-gray-500">
                                    No Poster
                                </div>
                            )}
                        </div>
                        <div className="md:w-2/3 p-8">
                            <h2 className="text-4xl font-bold mb-2">{movie.Title}</h2>
                            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6">
                                <span>{movie.Year}</span>
                                <span>{movie.Rated}</span>
                                <span>{movie.Runtime}</span>
                            </div>

                            <div className="space-y-4">
                                <p className="text-gray-300 leading-relaxed text-lg">{movie.Plot}</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                    <div>
                                        <span className="text-gray-500 block text-xs uppercase tracking-wider">Genre</span>
                                        <span className="text-white">{movie.Genre}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 block text-xs uppercase tracking-wider">Director</span>
                                        <span className="text-white">{movie.Director}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 block text-xs uppercase tracking-wider">Actors</span>
                                        <span className="text-white">{movie.Actors}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 block text-xs uppercase tracking-wider">IMDb Rating</span>
                                        <span className="text-yellow-500 font-bold text-lg">⭐ {movie.imdbRating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default MovieDetails;
