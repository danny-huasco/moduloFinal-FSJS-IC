const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
app.listen(3000, ()=>{
    console.log('servidor funcionando');
})
//declarar que se usara un motor de plantillas
app.set('view engine', 'handlebars');
//configurar el motor de plantillas
app.engine('handlebars', exphbs.engine(
    {
        layoutsDir: __dirname + "/views", //busca especificamente el main
        partialsDir: __dirname + "/views/componentes"
    }
));

app.use('/bootstrap',express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

app.get('/', (req, res)=>{
    res.render('home');
});

/* 
app.get('/contacto', (req, res)=>{
    res.render('contacto', {curso:{ nombre:'fsjs', cant:5}, nombres:['orihana', 'juan', 'frank', 'niko', 'juan ignacio'] })
    exphbs.registerHelper('mayus', ()=>{return this.toUpperCase})
}) */
app.get('/faq', (req, res)=>{
    res.render('faq')
})
app.get('/quienes', (req, res)=>{
    res.render('quienes')
})
app.get('/c', (req, res)=>{   
    res.sendFile(__dirname + '/index.html');
})


app.get('/ventas', (req, res)=>{
    res.render('ventas', {
        ventas:['papas de marte', 'cebollas de saturno', 'zanahorias pluton']
    })
})