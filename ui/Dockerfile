FROM node:latest
# We store all our files in /usr/src to perform the build
WORKDIR /usr/src
# We first add only the files required for installing deps
# If package.json or package-lock.json don't change, no need to re-install later
COPY package.json package-lock.json ./
# We install our deps
RUN npm install
# We copy all source files
COPY . .
# We run the build and expose as /public
RUN npm run build
CMD ["npm", "serve"]
