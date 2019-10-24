FROM node

RUN mkdir -p /usr/src/
WORKDIR /usr/src/
COPY . /usr/src/

RUN npm install

EXPOSE 4200

CMD ["npm", "run", "start"]
