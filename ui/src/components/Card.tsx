import React from "react";

interface Plant {
  id: string;
  name: string;
  species: string;
  description: string;
  imageUrl: string;
  email?: string; // Optional property
  lastUpdated?: string; // Optional property
}

const Card = ({
  plant,
  onEditClick,
}: {
  plant: Plant;
  onEditClick: () => void;
}) => {
  const { id, name, imageUrl, description } = plant; // Destructure needed properties

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-100 h-100">
      <a href="#">
        <img className="rounded-t-lg" src={imageUrl} alt={name} />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        {/* Additional details can be added here if available */}
        <div className="flex justify-end">
          <button
            className="text-blue-500 hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:text-blue-400"
            onClick={() => onEditClick()} // Pass plant ID on click
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
