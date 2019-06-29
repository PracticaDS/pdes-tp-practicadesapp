FROM node:11.10.0

# this makes the build fail in travis ! see https://github.com/nodejs/docker-node/issues/661
# RUN npm install --global yarn

COPY package.json .
COPY yarn.lock .

RUN yarn install; \
    yarn global add serve

COPY . . 
RUN yarn build

ENV NODE_ENV=production

EXPOSE 3000
CMD serve -p 3000 -s build