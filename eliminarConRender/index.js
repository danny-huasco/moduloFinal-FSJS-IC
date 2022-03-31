//express
const express = require('express');
const app = express();
const port = process.env.port || 3000;
app.listen(port, ()=>console.log('server corriendo'));

//handlebars
const hbs = require('express-handlebars');
app.set('view engine','handlebars')
app.engine(hbs.engine({
    layoutsDir: __dirname + '/views',
    partialsDir: __dirname + '/views/componentes'
}));

//bootstrap
app.use(express.static(__dirname+'/node_modules/bootstrap/dist/css'));

//body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//express fileupload
const efu = require('express-fileupload');
app.use(efu({
    limits: {fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: 'te pasaste',
    debug:true
}));

//file system
const fs = require('fs');

let archivos =[];

//renderiza la vista de inicio
app.get('/', (req, res)=>{
    res.render('inicio');
})

//recibe la subida de un archivo
app.post('/', (req, res)=>{
    const archivo = req.files.archivo;
    archivos.push(archivo.name)
    archivo.mv(`${__dirname}/files/${archivo.name}`, (err)=>{
        err?console.log(err):console.log('ARCHIVO SUBIDO');
    });
    res.render('inicio', {archivos})
})

//recibe la orden de eliminar un archivo
app.delete('/imagen/:archivo', (req, res)=>{
    const {archivo} = req.params;

    fs.unlink( `${__dirname}/files/${archivo}`, err=>{
        err?console.log(err):console.log('ARCHIVO ELIMINADO');
    });
    archivos = archivos.filter(e=>e!=archivo);

    res.render('inicio', {archivos});
})