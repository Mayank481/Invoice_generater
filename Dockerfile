FROM node:slim
WORKDIR /assigment
COPY . /assigment
RUN npm install
EXPOSE 5000
CMD [ "node", "index.js" ]
