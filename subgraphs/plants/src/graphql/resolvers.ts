import { PlantInput, Plant } from "../__generated__/resolvers-types";

import {
  getAllPlants,
  getPlantById as plantById,
  addPlant as addNewPlant,
  updatePlant as upatePlantHelper,
} from "../helpers";

export const resolvers = {
  Query: {
    getPlants: async (): Promise<Plant[]> => {
      return getAllPlants();
    },
    getPlantById: async (
      _: any,
      { id }: { id: string }
    ): Promise<Plant | undefined> => {
      return await plantById(id);
    },
  },
  Mutation: {
    addPlant: async (
      _: any,
      { input }: { input: PlantInput },
      { user }: any
    ): Promise<Plant> => {
      return addNewPlant(input, user?.email);
    },
    updatePlant: async (
      _: any,
      { id, input }: { id: string; input: PlantInput },
      { user }: any
    ): Promise<Plant | undefined> => {
      return upatePlantHelper(id, input, user);
    },
  },
};

export default resolvers;
