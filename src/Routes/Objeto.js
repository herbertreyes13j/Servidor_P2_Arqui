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
    const consulta = await pool.query('select count(o.id_objeto) as objeto
     from objeto o, recorrido r where r.id_recorrido = o.id_recorrido group by o.tipo order by o.id_recorrido DESC limit 1');
    res.send(consulta);
})

module.exports=router;
