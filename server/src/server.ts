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

const DB: string = "mongodb+srv://markmps:hejmark1@atlascluster.eqtkfwo.mongodb.net/";
const PORT = 4000 // use dotenv instead
const app = express();

// interface ServerContext {
//     messages: typeof messages;
// }

const httpServer = http.createServer(app);
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

await server.start();

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

await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));

console.log(`GraphQL Server listening at http://localhost:${PORT}/graphql`);

app.use('/api/movies', moviesRouter);
console.log(`Messages API listening at http://localhost:${PORT}/api/movies`);

app.get('*', function(req, res){
    res.send({ status: 404, message: 'Ressource not found' });
    });

mongoose
.set('strictQuery', false)
.connect(DB)
.then(() => {
    console.log('DB connection successful!');
});