## About ShopsNearU

Implement an app that list shops nearby

## Overview

- Sign up using email and password
- Sign in using email and password
- Display list of shops sorted by distance
- Like a shop and display it in a new page
- Dislike a shop and remove it from the main page for 2 hours
- Remove a shop from the preferred shops

## Technologies used

- [Vue 2.9.6](https://vuejs.org/)
- [axios](https://github.com/axios/axios)
- [Vuetify](https://vuetifyjs.com/en/)
- [npm](https://www.npmjs.com/)
- [Node.js](https://nodejs.org/en/)
- [Webpack](https://webpack.js.org/)
- [MongoDB](https://www.mongodb.com/)

## Requirement

- Vue.js
- Node.js
- MongoDB database

## Quick Project Setup - Installation

##### 1. Clone the repository using the following command in terminal:

        git clone https://github.com/hamzaBentahar/ShopsNearU.git nearbyshops
    
##### 2. Move to project root folder
    
        cd nearbyshops
  
##### 3. Install Vue dependencies:

        cd client
        npm install --save
  
##### 3. Install Node dependencies:
      
        cd server
        npm install --save
            
##### 4. Seed MongoDB with shops data:
    
        run mongo 
        > db.createCollection("shops")
        cd to bin file of the MongoDB Server
        > mongorestore -d shopdb -c shops 'path to bson shops file'
      
## Run Project

##### 1. Run MongoDB database:
        
        run mongod
      
##### 2. Run Server:

        cd server
        nodemone src/app.js

##### 3. Run Client:

        cd client
        npm run dev
    
##### 4. Open Browser on localhost:8080:
