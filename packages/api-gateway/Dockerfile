FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
COPY packages/api-gateway/package.json ./packages/api-gateway/
COPY packages/api-gateway/yarn.lock ./packages/api-gateway/

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn workspace api-gateway build

CMD ["yarn", "workspace", "api-gateway", "start"]



