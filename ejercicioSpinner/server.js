const express = require('express');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const app = express();

app.listen(3000, ()=>{
    console.log('servidor corriendo');
})
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs.engine(
    {
    layoutsDir : __dirname + '/views',
    partialsDir: __dirname + '/views/componentes'
    }
));

app.use('/css', express.static(__dirname+'/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname+ '/node_modules/bootstrap/dist/js'));
app.get('/', (req, res)=>{
    res.render('inicio', {
        colores:['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
        color: 'info',
        texto:'minusculas'
    });
})

app.get('/:color', (req, res)=>{  
    res.render('inicio', {
        colores:['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
        color: req.params.color
    })
})

