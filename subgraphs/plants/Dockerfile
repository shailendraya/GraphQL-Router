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

# Copy the plants service files
COPY . /subgraphs/plants

# Set the working directory to the plants service
WORKDIR /subgraphs/plants

# Install dependencies and build the plants service
RUN pnpm install

# Expose the port for the plants service
EXPOSE 4300

# Command to run when starting the container
CMD cd subgraphs/plants && pnpm start:dev 
