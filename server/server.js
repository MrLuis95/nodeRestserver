require ('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
 
app.get('/usuario', function (req, res) {
  res.json('get Usuario')
});

app.post('/usuario',function(req,res){
    console.log("post");
    let body = req.body;
    if(body.nombre==undefined){
        res.status(400).json({ok:false,description:"Name is needed"});
    }else{
    res.json({persona:body});
    }
})

app.put('/usuario/:id',function(req,res){
    let id = req.params.id;
    res.json({id});
})

app.delete('/usuario',function(req,res){
    
    res.json('delete usuario');
})

 
app.listen(process.env.PORT,()=>console.log("Escuchando puerto: ",process.env.PORT))