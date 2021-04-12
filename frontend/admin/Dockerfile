# pull official base image
FROM node:14.15.1-alpine3.10

# set working directory
WORKDIR /app/frontend

COPY package.json package-lock.json ./

RUN npm install

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["npm", "start"]
