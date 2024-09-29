import React from "react";

const StarRating = ({ rating }) => {
  const maxRating = 5;

  // Function to render full, half, and empty stars
  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < maxRating; i++) {
      const starType =
        rating >= i + 1 ? "full" : rating >= i + 0.5 ? "half" : "empty";

      stars.push(starType);
    }

    return stars;
  };

  return (
    <div className="flex items-center space-x-1">
      {renderStars().map((type, index) => (
        <svg
          key={index}
          className="w-4 h-4 text-yellow-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          {type === "full" && (
            <path d="M10 15l-5.715 3 1.091-6.356L0 6.5l6.355-.926L10 0l3.645 5.574L20 6.5l-5.376 5.144L10 15z" />
          )}
          {type === "half" && (
            <g>
              <path d="M10 15l-5.715 3 1.091-6.356L0 6.5l6.355-.926L10 0l3.645 5.574L20 6.5l-5.376 5.144L10 15z" />
              <path
                d="M10 15l-5.715 3 1.091-6.356L0 6.5l6.355-.926L10 0l3.645 5.574L20 6.5l-5.376 5.144L10 15z"
                fill="white"
              />
            </g>
          )}
          {type === "empty" && (
            <path
              d="M10 15l-5.715 3 1.091-6.356L0 6.5l6.355-.926L10 0l3.645 5.574L20 6.5l-5.376 5.144L10 15z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          )}
        </svg>
      ))}
      <p className="text-gray-700 ml-2">{rating.toFixed(1)}</p>
    </div>
  );
};

export default StarRating;
