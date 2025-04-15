import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query
const ME_QUERY = gql`
  query Me($email: String!) {
    me(email: $email) {
      id
      email
      password
      phone
      role
    }
  }
`;

// Define the custom hook
const useMeQuery = (email: string) => {
  // Call the useQuery hook with the ME_QUERY and variables
  const { loading, error, data } = useQuery(ME_QUERY, {
    variables: { email },
  });

  return {
    loading,
    error,
    data,
  };
};

export default useMeQuery;
