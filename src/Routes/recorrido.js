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

router.post('/Actualizar',async (req,res)=>{
    
    var{distancia_recorrida,tiempo_total}= req.body;
    const consulta = await pool.query(`update recorrido set distancia_recorrida = ?, tiempo_total = ? where id_recorrido = (select id_recorrido from velocidad order by id_recorrido DESC LIMIT 1)`,[distancia_recorrida,tiempo_total]);
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
