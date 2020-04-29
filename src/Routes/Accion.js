const express =  require('express');
const router =  express.Router();
const index = require('../index');
var sql = require("mssql");
var config = require('../conexion');
const pool = require('../database');

router.post('/',async (req,res)=>{
    
    var{tipo_accion, tiempo}= req.body;
    const consulta = await pool.query('insert into accion(id_recorrido, tipo_accion, tiempo) values ((select id_recorrido from recorrido order by id_recorrido desc limit 1),?,?);'
    ,
    [tipo_accion, tiempo]);
    res.send(consulta);
});

router.get('/',async (req,res)=>{
    const consulta = await pool.query('SELECT * FROM accion');
    res.send(consulta);
})

module.exports=router;