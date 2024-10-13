import React from "react";

const StarRating = ({ rating, donotShowNumber }) => {
  const maxRating = 5;

  // Function to render full, half, and empty stars
  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < maxRating; i++) {
      let starType;

      if (rating >= i + 1) {
        // Full star condition
        starType = "full";
      } else if (rating >= i + 0.5) {
        // Half star condition
        starType = "half";
      } else {
        // Empty star condition
        starType = "empty";
      }

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
          viewBox="0 0 24 24" // Changed viewBox to fit the new shape
        >
          {type === "full" && (
            <path d="M12 .587l3.668 7.431 8.184 1.186-5.913 5.646 1.396 8.175L12 18.896l-7.335 3.859 1.396-8.175-5.913-5.646 8.184-1.186z" />
          )}
          {type === "half" && (
            <g>
              <path d="M12 .587l3.668 7.431 8.184 1.186-5.913 5.646 1.396 8.175L12 18.896l-7.335 3.859 1.396-8.175-5.913-5.646 8.184-1.186z" />
              <path
                d="M12 .587l3.668 7.431 8.184 1.186-5.913 5.646 1.396 8.175L12 18.896l-7.335 3.859 1.396-8.175-5.913-5.646 8.184-1.186z"
                fill="white"
              />
            </g>
          )}
          {type === "empty" && (
            <path
              d="M12 .587l3.668 7.431 8.184 1.186-5.913 5.646 1.396 8.175L12 18.896l-7.335 3.859 1.396-8.175-5.913-5.646 8.184-1.186z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          )}
        </svg>
      ))}
      {/* Conditionally render the rating number */}
      {!donotShowNumber && (
        <p className="text-gray-700 ml-2">{rating.toFixed(1)}</p>
      )}
    </div>
  );
};

export default StarRating;
