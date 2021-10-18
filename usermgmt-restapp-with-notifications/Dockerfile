FROM mhart/alpine-node:14
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --prod


FROM mhart/alpine-node:slim-14
WORKDIR /app
COPY --from=0 /app .
COPY . .
EXPOSE 8085
CMD ["node", "server.js"]