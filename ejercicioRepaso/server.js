const express = require('express');
const app = express();
const port = process.env.port || 3000 ;
app.listen(port, ()=>{console.log('server andando')});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));//false para texto o json, true para imagenes mp3, videos y otros
app.use(bodyParser.json());

const hbs = require('express-handlebars');
app.set('view engine','handlebars');//avisar a la app que usaremos un view engine
app.engine('handlebars', hbs.engine({//configurar el view engine
    layoutsDir: __dirname + '/views',//carpeta donde se ira a buscar a main.handlebars
    partialsDir: __dirname + '/views/componentes'//carpeta donde se iran a buscar los parciales
}));

let arr = [{id:1, nombre:"frank"}]

app.get('/', (req, res)=>{
    res.render('inicio', {obj:{id:654, nombre:"dani"}});
});

app.get('/us', (req, res)=>{
    res.render('nosotros');
})
 //recibir un objeto con nombre
app.post('/post', (req, res)=>{
    const obj = req.body.nombre;
    res.send(`nos mandaron ${obj}`);
});

app.put('/put', (req, res)=>{
    const {id, nombre} = req.body;
    arr = arr.map(e=>{
        if(e.id==id){
            return {id:id, nombre:nombre};
        }
    });
    
    res.send(arr);
});

app.delete('/delete/:id', (req, res)=>{
    let id = req.params.id;
    arr =arr.filter(e=>e.id!=id);
    res.send(arr);
});