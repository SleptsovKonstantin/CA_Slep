FROM node:14 as build
WORKDIR /usr/src/frontend
COPY package*.json ./
RUN npm install
COPY . ./
 
RUN npm run build
 
FROM nginx:1.16.0-alpine
COPY --from=build /usr/src/frontend/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]