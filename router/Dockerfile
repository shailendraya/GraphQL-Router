# Use the official Apollo Router image as the base image
FROM ghcr.io/apollographql/router:v1.43.0

# Set the working directory inside the container
WORKDIR /app

# Copy the supergraph schema and router configuration files into the container
COPY ./supergraph-schema.graphql /app/supergraph-schema.graphql
COPY ./router.yaml /app/router.yaml

# Expose port 4000 for the Apollo Router
EXPOSE 4000

# Set the command to run the Apollo Router in development mode with the specified configuration and schema files
CMD ["--dev", "-c", "/app/router.yaml", "-s", "/app/supergraph-schema.graphql", "--log", "info"]
