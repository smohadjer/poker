Express.js version hosted on Render:
https://tournaments-express.myendpoint.de/

Serverless version hosted on Vercel:
https://tournaments.myendpoint.de/

# Run on localhost
- git clone https://github.com/smohadjer/pokerrangliste.git
- npm install
- npm start

This will start an express server on port 3000 which is watched by nodemon for server/api changes. Typescript files are watched and bundled via esbuild.

- Open http://localhost:3000 in browser

You also need to create a .env file in root and add followings values there:
````
db_uri_local = "mongodb://username:password@127.0.0.1:27017"
db_uri_remote = "mongodb+srv://username:password@cluster0.8qwlizm.mongodb.net/?retryWrites=true&w=majority"
development = "false"
admin_username = "[username]"
admin_password = "[password]"
````

If in .env file development is set to true, you need to install and start a MongoDB instance on your localhost. For information on setting up MongoDB on localhost see MONGODB.md file. To start your MongoDB instance, use command:
````
mongod --config /usr/local/etc/mongod.conf
````


