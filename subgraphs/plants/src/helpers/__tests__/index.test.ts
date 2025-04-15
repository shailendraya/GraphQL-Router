import {
  addPlant,
  updatePlant,
  getAllPlants,
  getPlantById,
} from "./path/to/module";
import fs from "fs";
import { Plant, PlantInput } from "../__generated__/resolvers-types";
import { v4 as uuidv4 } from "uuid";

jest.mock("fs");
jest.mock("uuid");

const mockPlants: Plant[] = [
  {
    id: "1",
    name: "Fern",
    species: "Pteridophyta",
    email: "user@example.com",
    lastUpdated: "2023-01-01T00:00:00.000Z",
  },
];

describe("Plant Management Functions", () => {
  beforeEach(() => {
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockPlants));
    (fs.writeFileSync as jest.Mock).mockClear();
    (uuidv4 as jest.Mock).mockReturnValue("mock-uuid");
  });

  describe("readPlantsFromFile", () => {
    it("should return the plants from the file", () => {
      const plants = getAllPlants();
      expect(plants).resolves.toEqual(mockPlants);
    });

    it("should return an empty array if reading the file fails", () => {
      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw new Error("File not found");  
      });
      const plants = getAllPlants();
      expect(plants).resolves.toEqual([]);
    });
  });

  describe("addPlant", () => {
    it("should add a new plant and return it", async () => {
      const input: PlantInput = { name: "Rose", species: "Rosaceae" };
      const email = "newuser@example.com";

      const newPlant = await addPlant(input, email);

      expect(newPlant).toEqual({
        ...input,
        lastUpdated: expect.any(String),
        email,
        id: "mock-uuid",
      });
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify([...mockPlants, newPlant], null, 2),
        "utf8"
      );
    });
  });

  describe("getPlantById", () => {
    it("should return a plant by ID", async () => {
      const plant = await getPlantById("1");
      expect(plant).toEqual(mockPlants[0]);
    });

    it("should return undefined if no plant is found", async () => {
      const plant = await getPlantById("non-existing-id");
      expect(plant).toBeUndefined();
    });
  });

  describe("updatePlant", () => {
    it("should update the plant if user is the owner", async () => {
      const input: PlantInput = {
        name: "Updated Fern",
        species: "Pteridophyta",
      };
      const user = { email: "user@example.com", role: "user" };

      const updatedPlant = await updatePlant("1", input, user);

      expect(updatedPlant).toEqual({
        ...mockPlants[0],
        ...input,
      });
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify(mockPlants, null, 2),
        "utf8"
      );
    });

    it("should throw an error if the plant does not exist", async () => {
      const input: PlantInput = { name: "Non-existent", species: "Unknown" };
      const user = { email: "user@example.com", role: "user" };

      await expect(updatePlant("non-existing-id", input, user)).rejects.toThrow(
        "No plant found with given data"
      );
    });

    it("should throw an error if the user is not the owner and not an admin", async () => {
      const input: PlantInput = { name: "Fern", species: "Pteridophyta" };
      const user = { email: "anotheruser@example.com", role: "user" };

      await expect(updatePlant("1", input, user)).rejects.toThrow(
        "Cannot edit plant added by someone else"
      );
    });

    it("should allow an admin to update any plant", async () => {
      const input: PlantInput = {
        name: "Admin Updated Fern",
        species: "Pteridophyta",
      };
      const user = { email: "admin@example.com", role: "admin" };

      const updatedPlant = await updatePlant("1", input, user);

      expect(updatedPlant).toEqual({
        ...mockPlants[0],
        ...input,
      });
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify(mockPlants, null, 2),
        "utf8"
      );
    });
  });

  describe("getAllPlants", () => {
    it("should return all plants", async () => {
      const plants = await getAllPlants();
      expect(plants).toEqual(mockPlants);
    });
  });
});
