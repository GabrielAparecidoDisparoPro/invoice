FROM node:lts-alpine AS builder

RUN npm i -g pnpm

WORKDIR /build

ARG NPM_TOKEN
ARG NPM_OWNER

ENV NPM_TOKEN=${NPM_TOKEN}
ENV NPM_REGISTRY=https://npm.pkg.github.com

RUN echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" > .npmrc \
    && echo "@${NPM_OWNER}:registry=${NPM_REGISTRY}" >> .npmrc

COPY . .

RUN pnpm i

RUN pnpm build

FROM node:lts-alpine AS runner

WORKDIR /app

COPY --from=builder /build/node_modules ./node_modules

COPY --from=builder /build/package.json ./package.json

COPY --from=builder /build/dist ./dist

RUN apk add -U dumb-init tzdata

ENV TZ=America/Sao_Paulo

RUN cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

CMD ["dumb-init", "node", "dist/main"]
