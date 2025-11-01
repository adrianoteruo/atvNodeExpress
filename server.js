const jsonServer = require('json-server');
const express = require('express');
const path = require('path');

const server = express();
const router = jsonServer.router('db.json'); 
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

// 1. Configura o middleware de arquivos estáticos (public)

server.use(express.static(path.join(__dirname, 'public')));

// 2. Configura os middlewares padrões do JSON Server
server.use(middlewares);

// 3. Monta o router do JSON Server em um prefixo 

server.use('/api', router); 

// 4. (Opcional) Redireciona a raiz '/' para a página de admin
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html')); 
});

// Inicia o servidor
server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Frontend disponível em http://localhost:${port}`);
    console.log(`API disponível em http://localhost:${port}/api/usuarios`);
});