const express =  require('express');
const router =  express.Router();
const index = require('../index');
var sql = require("mssql");
var config = require('../conexion');

router.post('/',(req,res)=>{
    
    var{descripcion}= req.body;
    res.send(InsertarDescripcion(descripcion));
});

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