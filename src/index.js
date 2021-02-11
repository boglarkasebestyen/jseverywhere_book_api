const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const helmet = require('helmet')
const cors = require('cors')
const depthLimit = require('graphql-depth-limit')
require('dotenv').config()

// Local module imports
const db = require('./db')
const models = require('./models')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const { createComplexityLimitRule } = require('graphql-validation-complexity')

// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000
// Store the DB_HOST value as a variable
const DB_HOST = process.env.DB_HOST

const app = express()

db.connect(DB_HOST)

// Security middleware
app.use(helmet())
// CORS middleware
app.use(cors())

// get the user info from a JWT
const getUser = token => {
    if (token) {
      try {
        // return the user information from the token
        return jwt.verify(token, process.env.JWT_SECRET)
      } catch (err) {
        // if there's a problem with the token, throw an error
        throw new Error('Session invalid')
      }
    }
  }


// Apollo Server setup
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context: ({req}) => {
        //get the user token from the headers
        const token = req.headers.authorization
        //try to retrieve a user with the token
        const user = getUser(token)
        //for now, let's log the user to the console
        console.log(user)
        //add the db models to the context
        return {models, user}
    }
})


// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
)












