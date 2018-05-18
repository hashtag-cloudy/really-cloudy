FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

RUN npm install

ENV NODE_ENV docker

RUN test "dataImporter.js" && echo "dataImporter.js exists"
RUN test "~/usr/src/app/dataImporter.js" && echo "~/usr/src/app/dataImporter.js exists"

CMD [ "npm", "start", "mongodb://mongo/cloudy" ]
