import { registerUser, loginUser, findUser } from "../helpers/auth";
import {
  RegisterUserInput,
  LoginUserInput,
  User,
  QueryMeArgs,
  Resolvers,
} from "../__generated__/resolvers-types";
import { ds } from "common";

const resolvers: Resolvers = {
  Query: {
    me: async (_, { email }: QueryMeArgs): Promise<User> => {
      return findUser(email);
    },
    dummyUser: async () => {
      try {
        const response = await ds.getAPI("htp://jsonplaceholder.typicode.com/users");
        return response;
      } catch (error) {
        console.error("Error fetching dummy users:", error);
        throw new Error("Failed to fetch dummy users");
      }
    },
  },
  Mutation: {
    registerUser: async (
      _,
      { input }: { input: RegisterUserInput }
    ): Promise<User> => {
      try {
        const newUser = await registerUser(input);
        return newUser;
      } catch (error: any) {
        throw new Error(`Failed to register user: ${error.message}`);
      }
    },
    loginUser: async (
      _,
      { input }: { input: LoginUserInput }
    ): Promise<string> => {
      try {
        const token = await loginUser(input);
        return token;
      } catch (error: any) {
        throw new Error(`Failed to login: ${error.message}`);
      }
    },
  },
};

export default resolvers;
