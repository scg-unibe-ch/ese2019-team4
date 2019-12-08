# Back-End

## Initial Setup

 + run `npm install` in the this (backend) directory
 + use `node build/server.js` to start the server. The server will run on port **3001**

While using the frontend **keep this backend server running**!

## server.ts

Inside the app/ folder you will find a server.ts this. The is the general configuration file for our backend. In there, you may setup new controllers and models, aswell as change the port of the server.

## models

Models are tables of the database. We use

  - customer.model
  - provider.model
  - post.model
  - subscription.model

to store information for the frontend. account.model is an abstract model of which customer and provider inherit.

## controllers

Controller specify the function upon executing http requests. For most tables we also have corresponding controllers. Most controllers allow to delete, add, get from within the database.

## services/session.ts

This file is responsible for the verification of subscriptons and deletions. It can create and verify jwt tokens.
