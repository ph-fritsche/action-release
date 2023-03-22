FROM node:18-alpine

RUN apk add git \
 && git config --system --add safe.directory /github/workspace

COPY build /action-release

ENTRYPOINT ["node", "/action-release/index.js"]
