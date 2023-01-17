FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]



# RUN apk update && apk add python make g++ & rm -rf /var/cache/apk/*

# WORKDIR /usr/src/app

# COPY package*.json ./app

# RUN npm install

# COPY . .
# RUN npm run build && npm prune --production

# FROM node:alpine
# USER node:node
# WORKDIR /app

# COPY --chown=node:node resources resources
# COPY --from=builder --chown=node:node /app/package*.json ./
# COPY --from=builder --chown=node:node /app/build/ build
# COPY --from=builder --chown=node:node /app/node_modules/ node_modules
# CMD ["node", "build/src/index.js"]