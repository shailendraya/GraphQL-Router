import Card from "components/Card";
import { useGetPlants } from "hooks/useGetPlants";
import React from "react";

const Main = () => {
  const { loading, error, plants } = useGetPlants();

  if (loading) return <p>Loading plants...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-white w-full p-20">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {plants.map((plant, index) => (
            <Card
              key={index}
              plant={plant}
              onEditClick={() => {
                console.log({ plant });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
