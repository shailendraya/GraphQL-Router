# Use a small base image
FROM node:20-slim

# Set the environment variable for pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable corepack to use pnpm
RUN corepack enable

# Copy the common package and install it
COPY ../../common /app/common
RUN cd /app/common && pnpm install && pnpm run build

# Copy the users service files
COPY . /subgraphs/users

# Set the working directory to the users service
WORKDIR /subgraphs/users

# Install dependencies and build the users service
RUN pnpm install

# Expose the port for the users service
EXPOSE 4200

# Command to run when starting the container
CMD cd subgraphs/users && pnpm start:dev 
