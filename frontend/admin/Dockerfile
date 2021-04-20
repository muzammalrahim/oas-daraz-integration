# pull official base image
FROM node:14.15.1-alpine3.10

# set working directory
WORKDIR /app/frontend

<<<<<<< HEAD
COPY package.json ./
COPY package-lock.json ./
=======
COPY package.json package-lock.json ./
>>>>>>> master

RUN npm install

# add app
COPY . ./

EXPOSE 3000
<<<<<<< HEAD
=======

>>>>>>> master
# start app
CMD ["npm", "start"]
