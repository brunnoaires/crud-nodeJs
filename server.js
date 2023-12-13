import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js';
import { title } from 'process';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();

//const database = new DatabaseMemory()
const database = new DatabasePostgres
//request body - post put
server.post('/videos',async (request, reply) =>{
    const {title, descripition, duration} = request.body
   await  database.create({
        title,
        descripition,
        duration
    })
    return reply.status(201).send()
})

server.get('/videos',async (request) =>{
    const search = request.query.search

    const videos = await database.list(search)

    return videos
})

server.put('/videos/:id',(request, reply) => {
    const videoId = request.params.id
    const { title, descripition, duration } = request.body

    database.uptade(videoId, {
        title,
        descripition,
        duration
    })
    return reply.status(204).send() //204 resposta vazia
})

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    
    database.delete(videoId)
    return reply.status(204).send()
})

server.listen({
    port:3333,
})