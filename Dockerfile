FROM node:lts-alpine

# Build web interface
WORKDIR /tmp
COPY ./archiver/package* ./
RUN npm install
COPY ./archiver ./
RUN npm run build

# Setup API and web interface server
WORKDIR /archiver
RUN cp -r /tmp/build . && \
    rm -rf /tmp/archiver

# Setup API
COPY ./api/package* ./
RUN npm install && apk add --no-cache make
COPY ./api ./
RUN make setup

EXPOSE 4000

CMD [ "node", "app.js" ]