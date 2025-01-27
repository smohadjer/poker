https://tournaments.saeidmohadjer.com/



# Run on localhost using Vercel serverless
Before you can run the app you need to install Vercel CLI:
````
npm i -g vercel
````

- git clone https://github.com/smohadjer/pokerrangliste.git
- npm install
- npm start
- vercel dev
- Open http://localhost:3000 in browser

You also need to create a .env file in root and add followings values there:
````
db_uri_local = "mongodb://username:password@127.0.0.1:27017"
db_uri_remote = "mongodb+srv://username:password@cluster0.8qwlizm.mongodb.net/?retryWrites=true&w=majority"
development = "prod"
admin_username = "[username]"
admin_password = "[password]"
````

If in .env file development is set to "local", you need to install and start a MongoDB instance on your localhost. For information on setting up MongoDB on localhost see MONGODB.md file. To start your MongoDB instance, use command:
````
mongod --config /usr/local/etc/mongod.conf
````

# Deploy to Vercel
````
vercel --prod
````

Typescript files are watched and bundled via esbuild.


# Icons
Icons are from https://fonts.google.com/icons
SVG format size 24x24 color: #5f6368

