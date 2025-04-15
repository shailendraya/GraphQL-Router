import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { User } from "../__generated__/resolvers-types";
import {
  RegisterUserInput,
  LoginUserInput,
} from "../__generated__/resolvers-types";
import { generateToken } from "common";

const USERS_FILE = path.join("src/mocks/", "users.json");

function readUsersFromFile(): User[] {
  try {
    const usersData = fs.readFileSync(USERS_FILE, "utf8");
    return JSON.parse(usersData) as User[];
  } catch (error) {
    return [];
  }
}

async function writeUsersToFile(users: User[]): Promise<any> {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

async function registerUser(input: RegisterUserInput): Promise<User> {
  const users = readUsersFromFile();

  // Check if email already exists
  const existingUser = users.find((user) => user.email === input.email);
  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(input.password, 10);

  // Create new user with hashed password
  const newUser: User = {
    id: uuidv4(),
    ...input,
    password: hashedPassword,
  };
  users.push(newUser);

  // Write updated user data to file
  writeUsersToFile(users);

  return newUser;
}

async function loginUser(input: LoginUserInput): Promise<string> {
  const users = readUsersFromFile();

  // Find user by email
  const user = users.find((user) => user.email === input.email);
  if (!user || !(await bcrypt.compare(input.password, user.password))) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const token = generateToken({ email: user.email, role: user?.role || "" });

  return token;
}

async function findUser(email: string): Promise<User> {
  const users = readUsersFromFile();
  const user = users.find((user) => user.email === email);
  if (!user) {
    throw new Error("No user found");
  }
  return user;
}

export { registerUser, loginUser, findUser };
