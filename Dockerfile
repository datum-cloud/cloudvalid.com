FROM node:26.13.1-alpine3.24@sha256:6bd9ab43c0ec0190ca7b2d193906cb8b7edf6e7f4afa43ddeccd6452710bffb5 AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build stage
FROM dependencies AS build
COPY . .
RUN npm run build

# Development stage
FROM dependencies AS development
COPY . .
ENV NODE_ENV=development
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["npm", "run", "dev"]

# Production stage
FROM node:26.13.1-alpine3.24@sha256:6bd9ab43c0ec0190ca7b2d193906cb8b7edf6e7f4afa43ddeccd6452710bffb5 AS production
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist
COPY --from=build /app/server.mjs ./server.mjs

EXPOSE 4321
CMD ["node", "./server.mjs"]
