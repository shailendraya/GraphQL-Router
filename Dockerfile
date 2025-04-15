# Use a small base image
FROM node:20-slim AS base

# Set the environment variable for pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable corepack to use pnpm
RUN corepack enable

# Copy your project files into the container
COPY . /app

# Set the working directory to the root of your monorepo
WORKDIR /app

# Install the common package first
RUN cd common && pnpm install && pnpm run build

# Install dependencies and build the users subgraph
RUN cd subgraphs/users && pnpm install && pnpm run build

# Install dependencies and build the plants subgraph
RUN cd subgraphs/plants && pnpm install && pnpm run build

# Expose the ports for the services
EXPOSE 4200 4300

# Start the services
CMD pnpm --prefix subgraphs/users start:dev & \
    pnpm --prefix subgraphs/plants start:dev
