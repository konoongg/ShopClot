const pool =  require('../database.controller').pool;
class OrderController{
    constructor(){
        this.pool = pool
    }
    async create(ms){
        let date = await pool.query("INSERT INTO orders (id_user,date,status ) VALUES (?,?,?)",ms )
        return date
    }
    async delete(id_o){
        let date = await pool.query("DELETE from orders WHERE id_order = ?",[id_o])
        
    }
    async update_status(id_o){
        let date = await pool.query("UPDATE orders set status ='ofor' WHERE id_order = ?",[id_o])
    }
    async order_to_user(id){
        let date = await pool.query("SELECT id_order FROM orders where id_user = ? ",[id])
        return date
    
    }

    
}

module.exports = new OrderController()