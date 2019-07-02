FROM node:11.10.0

# this makes the build fail in travis ! see https://github.com/nodejs/docker-node/issues/661
# RUN npm install --global yarn

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY package.json .
COPY yarn.lock .

RUN yarn install;

COPY . . 

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
