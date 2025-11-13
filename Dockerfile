FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine
# copy nginx.conf sitting next to Dockerfile → inside container
COPY nginx.conf /etc/nginx/conf.d/default.conf
# NOTE: confirm this dist path matches your project name
COPY --from=build /app/dist/food-deliver-app/browser/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]