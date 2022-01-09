import { ApolloServer } from 'apollo-server'
import cors from 'cors'
import express from 'express'
import { createContext } from './context'
import { schema } from './schema'

const app = express()
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
)

const server = new ApolloServer({
  schema,
  context: createContext,
  cors: {
    origin: 'https://twitter-clonefrontend.vercel.app',
  },
})

server.listen(process.env.PORT || 4000).then(({ url }) =>
  console.log(
    `\
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/ts/graphql-auth#using-the-graphql-api`,
  ),
)
