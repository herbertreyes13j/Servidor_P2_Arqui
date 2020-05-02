const express =  require('express');
const router =  express.Router();
const index = require('../index');
var sql = require("mssql");
var config = require('../conexion');
const pool = require('../database');

router.get('/',async (req,res)=>{
    const consulta = await pool.query(`select r.id_recorrido, r.descripcion, r.distancia_recorrida, r.tiempo_total,
    cast(((sum(v.velocidad)/count(v.velocidad))/10) as decimal(10,2)) as VelocidadPromedio,
    (select count(o.id_objeto)
    from objeto o, recorrido r
    where o.id_recorrido = r.id_recorrido
    group by o.id_recorrido
    order by o.id_recorrido DESC limit 1) as Objetos_Evadidos, avg(a.tiempo) as TiempoDecision
    from recorrido r, velocidad v, objeto o, accion a
    where r.id_recorrido=v.id_recorrido and r.id_recorrido = o.id_recorrido and r.id_recorrido=a.id_recorrido
    group by r.id_recorrido
    order by r.id_recorrido DESC`);
    res.send(consulta);
});

module.exports=router;