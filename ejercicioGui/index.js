const express = require('express')
const { splice } = require('./data/guitarras.js')
const guitarras = require('./data/guitarras.js')
const app = express()
app.listen(3000, () => console.log("Servidor encendido!"))

app.use(express.static('public'))

//version 1
const hateoas = () =>{
  let arr = guitarras.map((e)=>{// arr.map((e)=>e.name=algo);
    return {
      nombre: e.name,
      url: `http://localhost:3000/guitarra/${e.id}`
    }
  })
  return arr;
}
//version 2
const hateoas2 = () =>{
  let arr = guitarras.map((e)=>{// arr.map((e)=>e.name=algo);
    return {
      nombre: e.name,
      precio: e.value,
      url: `http://localhost:3000/guitarra/${e.id}`
    }
  })
  return arr;
}
//VERSION 1
app.get('/api/v1', async (req, res) => {
  
  res.send({guitarras: hateoas()});
});
 
app.get('/api/v1/guitarra/:id', (req, res)=>{
  let id = req.params.id;
  let obj = guitarras.find(e=> e.id == id);
  obj ? res.status(200).send(obj) : res.status(404).send('no la encontramos');  //res.sendStatus(200);
});
//VERSION 2
app.get('/api/v2', async (req, res) => {
  res.send({guitarras: hateoas2()});
});
 
/* app.get('/api/v2/guitarra/:id', (req, res)=>{
  let id = req.params.id;
  let obj = guitarras.find(e=> e.id == id);
  obj ? res.status(200).send(obj) : res.status(404).send('no la encontramos');  //res.sendStatus(200);
}); */

app.get('/api/v2/guitarra/:id', (req, res)=>{ //quitarra/:id?fields=uno,dos,tres,cuatro
  //ver si vienen querys y rescatar el parametro
  let gui2 = guitarras;
  let id = req.params.id;
  let obj = gui2.find(e=> e.id == id);
  //separar campos para evaluar lo que necesitamos
  let fields = req.query.fields;
  if(fields){
    fields = fields.split(',');
    //usar funcion para reducir campos
    if(fields.length>0){
      for(prop in obj){
        if(!fields.includes(prop)) delete obj[prop];  //['algo', 123123, null, false, {}, undefined]
        console.log(`${prop} - ${obj}`);              //{key:value, key:value, undefined, key:value}
      }
    }
  }else{
  //devolver el objeto reducido
    obj ? 
    res.status(200).send({guitarra:obj})
    : res.status(404).send({error:'404 Not Found', message: 'guitarra no encontrada'});
  }
});


app.get('/api/v2/body/:cuerpo', (req, res)=>{
  let cuerpo = req.params.cuerpo;
  let filtrados = guitarras.filter(e=>e.body==cuerpo);
  if(filtrados.length==0){
    res.status(404).send({error:'404 Not Found', message: 'no existe una guitarra con ese cuerpo'});
  }else{
    res.status(200).send(filtrados);
  }
});

/* app.get('/api/v2/guitarras', (req, res)=>{
  let valor = req.query.values;//valor de page
  let ord;
  switch(valor){
    case 'asc': ord = guitarras.sort((a,b)=>(a.value - b.value));
      res.send({guitarras:ord});
      break;
    case 'desc': ord = guitarras.sort((a,b)=>(b.value - a.value));
      res.send({guitarras:ord});
      break;
    default: res.redirect('/api/v2')
  }
}); */

const orderValues= (string)=>{
  let ord;
  if(string == 'asc'){
    ord = guitarras.sort((a,b)=>(a.value - b.value));
    return({guitarras:ord});
  }
  if(string == 'desc'){
    ord = guitarras.sort((a,b)=>(b.value - a.value));
    return({guitarras:ord});
  }
}

app.get('/api/v2/guitarras', (req, res)=>{
  let {page, values} = req.query;
  if(values =='asc') return res.send(orderValues('asc'));
  if(values =='desc') return res.send(orderValues('desc'));

  if(page){
    res.send({guitarras: hateoas2().slice(page*2-2, page*2)});//pag =1 -->(0, 2) pag=2 --> (2, 4) [1, 2, 3, 4]
  }

  res.redirect('/api/v2');//res.send({guitarras: hateoas2()})
//if(values=='asc' && page)
//if(values=='desc && page)
})
//guitarras.lenght -->cant total
//cantElemPosibles
//nroPags -> cantTotal/cantElemPosibles
/* 117 -> res.send({
    prev:null,
    next: `url/guitarras?offset=0&page=2`,
    data:{guitarras: arr.slice(0, cantElemPosibles)}
})
//const {offset, page, values} = req.query
114-> res.send({
  prev:`url/guitarras?offset=${(offset-cantElemPosibles)}&page=${(page - 1)}`,
  next: `url/guitarras?offset=${(offset+cantElemPosibles)}&page=${(page + 1)}`,
  data:{guitarras: arr.slice(offset, (offset+cantElemPosibles))}
})
 */