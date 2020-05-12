const express =  require('express');
const router =  express.Router();
const index = require('../index');
var sql = require("mssql");
var config = require('../conexion');
const pool = require('../database');

router.post('/',async (req,res)=>{
    
    var{velocidad,tiempo}= req.body;
    const consulta = await pool.query('insert into velocidad(id_recorrido, velocidad, tiempo) values ((select id_recorrido from recorrido order by id_recorrido desc limit 1),?,?);',
    [velocidad,tiempo]);
    res.send(consulta);
});

router.get('/',async (req,res)=>{
    const consulta = await pool.query('SELECT velocidad, tiempo FROM velocidad order by tiempo ASC where id_recorrido = (select id_recorrido from recorrido order by id_recorrido DESC limit 1)');
    res.send(consulta);
})

module.exports=router;
