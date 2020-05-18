const express =  require('express');
const router =  express.Router();
const index = require('../index');
var sql = require("mssql");
var config = require('../conexion');
const pool = require('../database');

router.post('/',async (req,res)=>{
    
    var{username}= req.body;
    const consulta = await pool.query('INSERT INTO partida(username) values(?)',[username]);
    res.send(consulta);
});

router.post('/Actualizar',async (req,res)=>{
    
    var{puntaje, estado}= req.body;
    const consulta = await pool.query('UPDATE partida SET puntaje = ?, estado = ? WHERE id_partida = (select id_partida from partida ORDER BY id_partida DESC LIMIT 1)',[puntaje,estado]);
    res.send(consulta);
});

router.get('/',async (req,res)=>{
    const consulta = await pool.query('select id_recorrido, distancia_recorrida from recorrido;');
    res.send(consulta);
})

module.exports=router;

async function InsertarDescripcion(descripcion) {
    try {
        let pool = await sql.connect(config)
        let result1 = await pool.request()
            .input('param1', sql.VarChar,descripcion)
            .query('insert into recorrido(descripcion) values(@param1);')           
        return result1
    } catch (err) {
        return err;
    }
}
