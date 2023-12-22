import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import typeDefs from './graphql_schemas';
import http from 'http';
import Query from './resolvers/query';
import Mutation from './resolvers/mutation';
import cors from 'cors';
import { json } from 'body-parser';
import moviesRouter from './routes/movies'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Movie } from './models/movie.model';
import { Actor } from './models/actor.model';
import Actors from './resolvers/actors';

// load environment variables
dotenv.config();

// Get MongoDB URI from environment variables
const DB: string = process.env.MONGO_URI || '';
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

// Create an Express application
const app = express();

// interface ServerContext {
//     messages: typeof messages;
// }

// Create an HTTP server using Express
const httpServer = http.createServer(app);

// Create an Apollo server instance
const server = new ApolloServer({ 
    typeDefs, 
    resolvers: { 
        Query,
        Mutation,
        //Actors,
        
     },
     plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer })
    ], // Ensuring server is not kept alive
    });

// Start the Apollo Server
await server.start();

// Configure Express middleware for handling GraphQL requests
app.use('/graphql', 
cors<cors.CorsRequest>(),
express.json(),
expressMiddleware(server, {
  context: async() => ({
    Movie,
    Actor,
})},
)
);

// Start the HTTP server on the specified port
await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
);

// Log the GraphQL and API endpoints
console.log(`GraphQL Server listening at http://localhost:${PORT}/graphql`);
app.use('/api/movies', moviesRouter);
console.log(`Messages API listening at http://localhost:${PORT}/api/movies`);

app.get('*', function(req, res){
    res.send({ status: 404, message: 'Ressource not found' });
    });

// Connect to the MongoDB database
mongoose
.set('strictQuery', false)
.connect(DB)
.then(() => {
    console.log('DB connection successful!');
});