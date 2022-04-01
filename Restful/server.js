const express = require('express');
const app = express();
const port = process.env.port || 3000;
app.listen(port, ()=>console.log('server corriendo'));

const bodyParser = require('body-parser');
const { json } = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//llamar a funciones del archivo consultas.js
const querys = require('./consultas')

app.get('/canales', async(req, res)=>{
    const resp = await querys.consultaCanales();
    res.json(resp);
})

app.post('/canal', async(req, res)=>{
    const chn = req.body.nombre;
    const resp = await querys.nuevoCanal(chn);
    res.status(201).json(resp);  
})

/* app.put('/canal/:chn', async(req, res)=>{
    const nomcanal = req.params.chn;//parametro para ir a buscar
    const editcanal = req.body.nombre;//nombre nuevo del canal
   /*  let obj = {nombre:`${nomcanal}`}
    if(canales.includes(obj)){
        let i = canales.indexOf(nomcanal);
        canales[i].nombre = editcanal;
        res.json(canales);
    }else{
        res.status(418).send('el nombre que mandaste, no existe');
    } 
    canales = canales.map((e)=>(e.nombre==nomcanal? {editcanal} : e))
    res.send(canales);
}); */
/* urlbase.com/hombre/pantalones/ellus
urlbase.com/:genero/:tipo/:marca  req.params --> {
    genero:"res",
    tipo: "res", 
    marca: "res"
}

urlbase.com/?name="algo"&edad="valor"&otro="valor" -->req.query{
    name:"algo",
    edad:"valor",
    otro:"valor"
} */

//put con bbdd
app.put('/canal/:id', async (req, res)=>{
    const id = req.params.id;
    const nombre = req.body.nombre;

    let resp = await querys.editarCanal(id, nombre);
    res.json(resp);    
})


app.delete('/canal/:id', async(req, res)=>{
    const id = req.params.id;
    let resp = await querys.eliminarCanal(id);
    
    resp == 0 ? res.send('no hay un canal con ese id') : res.send('canal eliminado')
});