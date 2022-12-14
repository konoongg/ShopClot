const pool =  require('../database.controller').pool;
class ProductorderController{
    constructor(){
        this.pool = pool
    }
    async create(ms){
        console.log(ms)
        let date = await pool.query("INSERT INTO productOrders (id_order,id_product, count,price_product) VALUES (?,?,?,?)",ms )
        return date

    }
    async all(){
        let date = await pool.query("SELECT * FROM productorders INNER JOIN orders  ON productorders.id_order = orders.id_order INNER JOIN products ON productorders.id_product = products.id")
        return date
    }

    async update(id,ms){
        let date = await pool.query("UPDATE productorders SET price_product =? ,count =? WHERE id_product=? and id_order = ?",[ms.price,ms.count,ms.id_product,id])
    }

    async delete(id_p,id_o){
        let date = await pool.query("DELETE from productorders  WHERE id_product=? and id_order = ?",[id_p,id_o])
    }
    async delete_all(id){
        let date = await pool.query("DELETE from productorders  WHERE  id_order = ?",[id])
    }
   
    

    
}

module.exports = new ProductorderController()