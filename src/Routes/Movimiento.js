const express =  require('express');
const router =  express.Router();
const index = require('../index');
var sql = require("mssql");
var config = require('../conexion');
const pool = require('../database');

router.post('/',async (req,res)=>{
    
    var{tipo_mov}= req.body;
    const consulta = await pool.query('INSERT INTO movimientos(tipo, id_partida) VALUES (?,(SELECT id_partida from partida order by id_partida DESC LIMIT 1));'
    ,
    [tipo_mov]);
    res.send(consulta);
});

router.get('/',async (req,res)=>{
    const consulta = await pool.query('');
    res.send(consulta);
})

module.exports=router;
