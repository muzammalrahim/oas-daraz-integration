# pull official base image
FROM node:14.15.1-alpine3.10

# set working directory
WORKDIR /app/user

COPY package.json package-lock.json ./

RUN npm install

# add app
COPY . ./

EXPOSE 3001
# start app
CMD ["npm", "start"]
