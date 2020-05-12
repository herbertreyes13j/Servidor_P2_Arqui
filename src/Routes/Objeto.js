const express =  require('express');
const router =  express.Router();
const index = require('../index');
var sql = require("mssql");
var config = require('../conexion');
const pool = require('../database');

router.post('/',async (req,res)=>{
    
    var{posicion, tipo}= req.body;
    const consulta = await pool.query('insert into objeto(id_recorrido, posicion, tipo) values((select id_recorrido from recorrido order by id_recorrido desc limit 1),?,?);',
    [posicion, tipo]);
    res.send(consulta);
});

router.get('/',async (req,res)=>{
    const consulta = await pool.query('select tipo , count(id_objeto) as cantidad from objeto where id_recorrido = (select id_recorrido from recorrido order by id_recorrido DESC limit 1 ) group by tipo;');
    res.send(consulta);
})

module.exports=router;
