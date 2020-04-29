const express =  require('express');
const router =  express.Router();
const index = require('../index');
var sql = require("mssql");
var config = require('../conexion');
const pool = require('../database');

router.post('/',async (req,res)=>{
    
    var{descripcion}= req.body;
    const consulta = await pool.query('insert into recorrido(descripcion) values (?)',[descripcion]);
    res.send(consulta);
});

router.get('/',async (req,res)=>{
    const consulta = await pool.query('SELECT * FROM recorrido');
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