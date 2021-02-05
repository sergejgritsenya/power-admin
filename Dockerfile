FROM node:12.16.2 as build
ARG API_URL=http://localhost:3088
# ARG API_URL=http://api.classicsport.pw
WORKDIR /usr/src/app
COPY package.json yarn.lock tsconfig.json ./
RUN yarn
COPY . ./
ENV REACT_APP_API_URL=${API_URL}
RUN yarn build


FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
