//EXPRESS
const express = require('express');
const app = express();
const port = process.env.port || 3000;
app.listen(port, ()=>{
    console.log('servidor esta corriendo');
})

//FILEUPLOAD
const efu = require('express-fileupload');
app.use(efu({
    limits:{fileSize: 10*1024*1024},
    abortOnLimit: true,
    responseOnLimit:"te pasaste, la cancion es muy larga",
    debug:true
}));

//BOOTSTRAP
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//BODY-PARSER
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//HANDLEBARS
const hbs = require('express-handlebars');
app.set('view engine', 'handlebars');
app.engine('handlebars', hbs.engine({
    layoutsDir: __dirname + '/views'
}))

//RUTAS
app.get('/', (req,res)=>{
    res.render('inicio');
});

app.post('/', (req, res)=>{
    let cancion = req.files.song;
    let {nombre, artista, album}= req.body;
    let name = `${nombre} - ${artista}-${album}`;
    cancion.mv(`${__dirname}/canciones/${name}.mp3`, (err)=>{
        if(err) console.log('hubo un error');

        res.send('cancion subida con éxito!');
    });
});
