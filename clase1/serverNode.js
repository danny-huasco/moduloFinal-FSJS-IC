const express = require('express');

const app = express();

app.listen(3000, ()=>{
    console.log('servidor andando en express');
})

app.get("/", (req, res)=>{
    res.send('llamaste a raiz en express');
})


app.get('/tocToc/', (req, res)=>{//********/
    res.send(req.query.name);
})

app.get('/azar/:numero', (req, res)=>{
    //crear un numero al azar entre 1 y 3
    let num = (Math.floor(Math.random()*3))+1;
    //comparar con el parametro y avisar si coinciden
    let par = req.params.numero;
    num == par ? res.send('coincidio') : res.send('suerte a la proxima') 

})


app.get('*', (req, res)=>{
    res.send('Sorry, aqui no hay nada :(');
})