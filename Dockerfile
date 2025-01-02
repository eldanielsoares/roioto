FROM node:22.8.0-slim

RUN apt update && \
  apt install openssl procps -y && \
  npm install -g @nestjs/cli@10.4.8

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . .

RUN npm install

RUN npx prisma generate

CMD [ "tail", "-f", "/dev/null" ]


