# Create image based on the official Node 6 image from the dockerhub
FROM node:14

ENV NODE_ENV production

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Timezone
ENV TZ=Europe/Madrid

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY ["package.json", "package-lock.json",  "./"]

# Install dependecies
# RUN npm install
RUN npm install --production --silent && mv node_modules ../

# Get all the code needed to run the app
COPY . /usr/src/app    

# Expose the port the app runs in
EXPOSE 3001

# Serve the app
CMD ["npm", "start"]