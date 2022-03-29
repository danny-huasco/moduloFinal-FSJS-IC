const http = require('http');

http.createServer((req, res)=>{
    if(req.url == '/' && req.method == "GET"){
        res.end('llamaste a raiz')
    }
})
.listen(3000, ()=>{
    console.log('servidor operando');
})