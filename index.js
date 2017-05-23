const path = require('path');

const Hapi = require('hapi');
const inert = require('inert');

const bierBotService = require('./bierBotService');

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            }
        }
    }
});

server.connection({ port: 8080 });

server.route({
    method: 'GET',
    path: '/ping',
    handler: function (request, reply) {
        reply('pong');
    }
});

server.route({
    method: 'POST',
    path: '/order',
    handler: bierBotService.httpHandler
});

server.register(inert, (err) => {
    if (err) throw err;

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('./views/index.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/scripts/{scripts*}',
        handler: {
            directory: {
                path: './scripts'
            }
        }
    });
});

server.start((err) => {
    if (err) throw err;``

    console.log(`Server running at: ${server.info.uri}`);
});