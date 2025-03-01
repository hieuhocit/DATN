# Base image
FROM node:lts AS development

# Create working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies and devDependencies
RUN yarn install

# Copy the rest of the files
COPY . .

# Expose port
EXPOSE 3000

CMD ["yarn", "dev", "--host", "0.0.0.0"]

