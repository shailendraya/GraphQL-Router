import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_PLANTS = gql`
  query GetPlants {
    getPlants {
      id
      name
      species
      description
      imageUrl
      email
      lastUpdated
    }
  }
`;

export const useGetPlants = () => {
  const { loading, error, data, refetch } = useQuery(GET_PLANTS);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    if (data) {
      setPlants(data.getPlants);
    }
  }, [data]);

  return { loading, error, plants, refetch };
};
