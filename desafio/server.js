const express = require('express');
const app = express();
const path = require('path');

app.listen(3000);

app.use(express.static('assets'));

const usuarios = ['juan', 'jocelyn', 'astrid', 'maria', 'ignacia', 'javier', 'brian'];

app.get('/abracadabra/usuarios', (req, res)=>{
    res.send({usuarios});
    res.json(usuarios);
});

app.use('/fiscalizar/:user', (req, res, next)=>{
    let user = req.params.user;

    usuarios.includes(user) ? next() : ...
} )

app.get('/foto', (req, res)=>{
    res.redirect('/who.jpeg');
})

app.use('/abracadabra/juego/:usuario', (req, res, next)=>{
    let user = req.params.usuario;
    usuarios.includes(user) ? next() : res.redirect('/who.jpeg');
});

app.get('/abracadabra/juego/:usuario', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.get('/abracadabra/conejo/:num', (req, res)=>{// { num: 2}
    let rand = Math.floor(Math.random()*4)+1;
    req.params.num == rand ? res.redirect('/conejito.jpg') : res.redirect('/voldemort.jpg');
});

app.get('*', (req, res)=>{
    res.status(404);
    res.send('aqui no hay nada');
});