import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      id
      email
      phone
      role
    }
  }
`;

export const useRegisterUser = () => {
  const [register, { loading, error, data }] = useMutation(REGISTER_USER);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await register({ variables: { input: formData } });
      console.log("Registration successful:", data);
      // Handle successful registration (e.g., redirect to login page)
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration errors (e.g., display error message)
    }
  };

  return {
    loading,
    error,
    data,
    formData,
    handleChange,
    handleSubmit,
  };
};
