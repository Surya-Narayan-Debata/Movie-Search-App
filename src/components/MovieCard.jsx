import React from 'react';

const MovieCard = ({ movie, isFavorite, toggleFavorite }) => {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl relative group">
            <div className="relative aspect-[2/3] overflow-hidden">
                {movie.Poster !== "N/A" ? (
                    <img className="w-full h-full object-cover" src={movie.Poster} alt={movie.Title} />
                ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-500">
                        <span>No Image</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                        onClick={() => toggleFavorite(movie)}
                        className={`p-3 rounded-full ${isFavorite ? 'bg-red-600 text-white' : 'bg-white text-black hover:bg-red-600 hover:text-white'} transition-colors duration-300`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-white truncate" title={movie.Title}>{movie.Title}</h3>
                <p className="text-gray-400">{movie.Year}</p>
            </div>
        </div>
    );
};

export default MovieCard;
