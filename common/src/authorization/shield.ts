import { rule } from "graphql-shield";

export const isAuthenticated = rule({ cache: "contextual" })(
  async (_, __, ctx: any) => {
    return !!ctx.user;
  }
);

export const isAdmin = rule({ cache: "contextual" })(async (_, __, ctx) => {
  return ctx.user.role === "admin";
});
