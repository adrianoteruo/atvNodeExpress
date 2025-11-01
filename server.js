const jsonServer = require('json-server');
const express = require('express');
const path = require('path');

const server = express();
const router = jsonServer.router('db.json'); 
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

// Configura o middleware do JSON Server
server.use(middlewares);
server.use(router); 


server.use(express.static(path.join(__dirname, 'public')));


server.get('*', (req, res) => {
    if (req.url.startsWith('/api')) {
        
        return router(req, res);
    }
    
    res.sendFile(path.join(__dirname, 'public', 'admin.html')); 
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});