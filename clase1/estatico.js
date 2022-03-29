const express = require('express');
const app = express();

app.listen(3000, ()=>{
    console.log('algo funciona por aqui');
})

app.use(express.static('assets')); http://localhost:3000/estatico.html

//llamar a static.html
app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/assets/estatico.html');    //__dirname -> 'c://nombre/asjddas/asda/asd'
})

