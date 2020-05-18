const express =  require('express');
const router =  express.Router();
const index = require('../index');
var sql = require("mssql");
var config = require('../conexion');
const pool = require('../database');

router.get('/',async (req,res)=>{
    const consulta = await pool.query('SELECT username, puntaje as score, tiempo, fecha from partida');
    res.send(consulta);
});

module.exports=router;
