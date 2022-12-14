const pool =  require('../database.controller').pool;
class ProductController{
    constructor(){
        this.pool = pool
    }
    async all(){
        let date = await pool.query("SELECT * FROM products")
        return date
    }

    async all_id(id){
        let date = await pool.query("SELECT * FROM products WHERE id = ? ORDER BY id DESC ",[id])
        return date
    }
    async price_id(id){
        let date =await pool.query("SELECT price FROM products WHERE id =?  ",[id])
        return date
        
    }
    async id_in(id){
        let date =await pool.query("SELECT * FROM products WHERE id in (?) ORDER BY id DESC ",[id])
        return date

    }
    async create (ms){
        ms.push('есть')
        let date =  await pool.query("INSERT INTO products(name,des,price,amount, img,statuss  ) VALUES (?,?,?,?,?,?)", ms)
        return date
    }
    async update(ms){
        console.log(ms.name)
        let date = await pool.query("UPDATE products SET name =? ,des =? , price = ?, amount =?, img =? WHERE id=?",[ms.name,ms.des,ms.price,ms.amount,ms.img,ms.id])
    }
    async min(id,k){
        console.log(id,k)
        let date = await pool.query("UPDATE products SET amount =?  WHERE id=?",[k,id])

    }

    async del(id){
        let date = await pool.query("UPDATE products SET   statuss = 'del' WHERE id=?",[id])
    
    }

    async list(){
        let date = await pool.query("SELECT * FROM products ORDER BY id DESC ")
        return date
    
    }

    
}

module.exports = new ProductController()