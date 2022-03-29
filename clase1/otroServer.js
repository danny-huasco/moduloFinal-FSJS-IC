const express = require('express');
const app = express();

app.listen(3000, ()=>{
    console.log('funcionando');
})

app.get('/estudiar', (req, res)=>{
    res.redirect('....')
})

app.get('/download', (req, res)=>{
    res.download(archivo)
})

//middleware
app.use('/tiempo', (req, res, next)=>{
    let au = req.header("Authorization");

    au ? next() : res.send('no hay credenciales');
})

app.get('/tiempo', (req,res)=>{
    res.send('es hora de acostarse');
})

//ejercicio propuesto
app.use('/colores/:color', (req, res, next)=>{
    let color = req.params.color;
    color == 'azul' ? next() : res.send('buuuuu, color feo');
})


app.get('/colores/:color', (req, res)=>{
    res.send('escogiste el color azul, felicidades!');
})
