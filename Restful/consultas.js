const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "canales",
    password: "010101"
});
 //post new canal
const nuevoCanal = async (canal)=>{
    try{
        let resultado = await pool.query(`insert into canales (nombre) values ('$1') returning *`, [canal]);
        return resultado.rows;
    }catch(e){
        console.log(e.code +'-'+ e.details);
    }
}
 const consultaCanales = async ()=>{
     try{
        let resultado = await pool.query(`select * from canales`);
        return resultado.rows;
     }catch(e){
         console.log(e.code +'-'+e.details);
     }
 }

 const editarCanal = async (id, nombre)=>{
     try{
        let resultado = await pool.query(`update canales set nombre = '$1' where id = '$2' returning *`, [nombre, id]);
        return resultado.rows;
     }catch(e){
        console.log(e.code +'-'+e.details);
     }
 }

 const eliminarCanal = async(id)=>{
     try{
        let resultado = await pool.query(`delete from canales where id = '${id}'`);
        return resultado.rowCount;
     }catch(e){
         console.log(e.code +'-'+ e.details);
     }
 }

module.exports = {
    nuevoCanal,
    consultaCanales,
    editarCanal,
    eliminarCanal
};