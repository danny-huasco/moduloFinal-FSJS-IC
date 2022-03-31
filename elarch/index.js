const express = require('express');
const app = express();
app.listen(3000, ()=>{
    console.log('server andando');
})

const fs = require('fs');

app.use('/fotos', express.static(__dirname+'/imagenes'));

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html');
});

app.delete('/imagen/:foto', (req, res)=>{
    let nombre = req.params.foto;
    fs.unlink(`${__dirname}/imagenes/${nombre}.jpg`, (err)=>{
        if(err){ console.log(err);}
        res.send('la imagen se elimino con exito');
    })
})