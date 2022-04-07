const express = require('express');
const users = require('./data/users.js');
const app = express();
app.listen(3000, () => console.log('Your app listening on port 3000'));

const jwt = require('jsonwebtoken');
//crear llave ultra mega secreta
let clave = 'tokensito';

//crear y firmar el token

let token = jwt.sign(users[1], clave);//1.- metodo para crear y firmar -- 2.-payload -- 3.- llave secreta

app.get('/', (req, res) => {
  res.send('El token es: '+token);
});

app.get('/token', (req, res)=>{
  let tokensito = req.query.token;

  jwt.verify(tokensito, clave, (error, data)=>{
    res.send(error ? "fallaste" : data);
  });

});
 
app.get('/login', (req, res)=>{
  const {email, pass} = req.query;
  let usuario = users.find(u => u.email==email && u.password==pass);
  
  if(usuario){
    let llave = jwt.sign(usuario, clave, {expiresIn: "120s"});
    res.send(
      `<a href="/Dashboard?token=${token}"> <p> Ir al Dashboard </p> </a>
      Bienvenido, ${email}.      
      <p>${token}</p>
      <script>
        localStorage.setItem('tokensito', ${llave});
      </script>`
    );

  }else{
    res.status(401).send('el mail o contraseña no coinciden, buuuu');
  }
});

app.get('/dashboard', (req, res)=>{
  let token = req.query.token;
  jwt.verify(token, clave, (err, data)=>{
    if(err){
      res.status(401).send('Unauthorized '+ err.message);
    }else{
      res.status(200).send('Bienvenido '+ data.email);
    }
  });
});