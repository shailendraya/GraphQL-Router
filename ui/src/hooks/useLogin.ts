import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { SessionStorage } from "utils/helpers";

const LOGIN_USER = gql`
  mutation LoginUser($input: LoginUserInput!) {
    loginUser(input: $input)
  }
`;

// Assuming you have a defined LoginUserInput type in your GraphQL schema

export const useLoginUser = () => {
  const session = new SessionStorage();
  const [login, { loading, error, data }] = useMutation(LOGIN_USER);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await login({ variables: { input: formData } });
      console.log(data);
      session.setData("token", data.loginUser);

      // Handle successful login (e.g., store the token, redirect to dashboard)
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login errors (e.g., display error message)
    }
  };

  return {
    loading,
    error,
    data, // Data may not be relevant if only token is returned
    formData,
    handleChange,
    handleSubmit,
  };
};
