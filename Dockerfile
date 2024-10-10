FROM node:16.17.0-bullseye-slim
RUN apt-get update
RUN apt-get install -y openssl
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node . .
RUN yarn install --production && yarn cache clean
CMD ["yarn", "start"]