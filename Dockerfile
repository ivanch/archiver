FROM node:lts-alpine as builder

# Build web interface
WORKDIR /tmp
COPY ./archiver/package* ./
RUN npm install
COPY ./archiver ./
RUN npm run build

FROM node:lts-alpine
# Setup API and web interface server
WORKDIR /archiver
COPY --from=builder ./tmp/build ./build

# Setup API
COPY ./api/package* ./
RUN apk add --no-cache  chromium --repository=http://dl-cdn.alpinelinux.org/alpine/v3.16/main
RUN npm install && apk add --no-cache make
COPY ./api ./
RUN make setup

EXPOSE 4000

CMD [ "node", "app.js" ]