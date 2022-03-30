const express = require('express');
const app = express();
const port = process.env.port || 3000; //usar el puerto del entorno donde corre el código, o el 3000
app.listen(port, ()=>{
    console.log('servidor corriendo');
})

const efu = require('express-fileupload');
//llamar al middleware con su objeto de configuracion
app.use(efu({
    limits: {fileSize: 5 * 1024 * 1024 }, //pone un limite al tamaño del archivo que se subirá
    abortOnLimit: true, //si el archivo pesa mas que limits, entonces aborta el proceso (true)
    responseOnLimit: "te pasaste", //mensaje respecto a si se activa la prop. anterior
    debug:true //mensajes del proceso en consola   
}));

//disponiendo de los archivos necesarios para usar bootstrap en el servidor
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//disponer y configurar handlebars
const hbs = require('express-handlebars');
//le avisamos a la app que usaremos un motor de plantillas
app.set('view engine', 'handlebars');
//se configura el motor mencionado
app.engine('handlebars', hbs.engine({
    layoutsDir: __dirname + '/views', //aqui hbs va a buscar el archivo main.handlebars
    partialsDir: __dirname + '/views/componentes' //aqui hbs va a buscar los parciales
}));
//renderizamos la vista con el formulario
app.get('/', (req, res)=>{
    res.render('inicio');
})

//ruta para recibir el archivo
app.post('/', (req, res)=>{
    let pic = req.files.foto;
     //funcion que busca -> si esta -> name = pic.name + '(1)'
    pic.mv(__dirname+'/files/'+pic.name, (err)=>{
        if(err){
            console.log(err);
            res.send('hubo un error');
        }

        res.send('archivo cargado');
    })
})

