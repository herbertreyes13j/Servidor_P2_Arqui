const express =  require('express');
const router =  express.Router();
const index = require('../index');
var sql = require("mssql");
var config = require('../conexion');




router.post('/',(req,res)=>{
    console.log(req.body);
    var {estado}=req.body;          
    index.estado.push(estado);
    
    res.send('{"respuesta":"Estado Insertado"}');
});



router.get('/',(req,res)=>{
    
    if(index.estado.length>0){
        var resp = index.estado.shift();
        res.send(resp); 
    }else{
        res.send('0');
    }
});


module.exports=router;