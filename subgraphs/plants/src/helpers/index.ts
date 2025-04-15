import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { Plant, PlantInput } from "../__generated__/resolvers-types";

const PLANTS_FILE = path.join("src/mocks/", "plants.json");

function readPlantsFromFile(): Plant[] {
  try {
    const plantsData = fs.readFileSync(PLANTS_FILE, "utf8");
    return JSON.parse(plantsData) as Plant[];
  } catch (error) {
    return [];
  }
}

async function writePlantsToFile(plants: Plant[]): Promise<any> {
  fs.writeFileSync(PLANTS_FILE, JSON.stringify(plants, null, 2), "utf8");
}

async function addPlant(input: PlantInput, email: string): Promise<Plant> {
  const plants = readPlantsFromFile();

  const newPlant: Plant = {
    ...input,
    lastUpdated: new Date().toISOString(),
    email,
    id: uuidv4(),
  };
  plants.push(newPlant);

  writePlantsToFile(plants);

  return newPlant;
}

async function getPlantById(id: string): Promise<Plant | undefined> {
  const plants = readPlantsFromFile();
  return plants.find((plant) => plant.id === id);
}

async function updatePlant(
  id: string,
  input: PlantInput,
  user: { email: string; role: string }
): Promise<Plant | undefined> {
  const plants = readPlantsFromFile();

  const plantToUpdate = plants.find((plant) => plant.id === id);
  if (!plantToUpdate) {
    throw new Error("No plant found with given data");
  }
  if (plantToUpdate.email !== user?.email) {
    if (user.role !== "admin") {
      throw new Error("Cannot edit plant added by someone else");
    }
  }
  Object.assign(plantToUpdate, input);
  writePlantsToFile(plants);

  return plantToUpdate;
}

async function getAllPlants(): Promise<Plant[]> {
  return readPlantsFromFile();
}

export { addPlant, updatePlant, getAllPlants, getPlantById };
