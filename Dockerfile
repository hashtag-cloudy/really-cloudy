FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

RUN npm i yarn -g
RUN yarn
RUN cd client && yarn
RUN cd client && yarn build

ENV NODE_ENV docker

EXPOSE 3000
CMD [ "yarn", "start" ]
