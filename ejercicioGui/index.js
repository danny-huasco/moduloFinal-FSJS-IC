const express = require('express')
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
 
app.get('/api/v2/guitarra/:id', (req, res)=>{
  let id = req.params.id;
  let obj = guitarras.find(e=> e.id == id);
  obj ? res.status(200).send(obj) : res.status(404).send('no la encontramos');  //res.sendStatus(200);
});

app.get('/api/v2/body/:cuerpo', (req, res)=>{
  let cuerpo = req.params.cuerpo;
  let filtrados = guitarras.filter(e=>e.body==cuerpo);
  if(filtrados.length==0){
    res.status(200).send('no hay guitarras con este cuerpo');
  }else{
    res.status(200).send(filtrados);
  }
});

app.get('/api/v2/guitarras', (req, res)=>{
  let valor = req.query.values;
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
});