const pool =  require('../database.controller').pool;
class UserController{
    constructor(){
        this.pool = pool
    }

    async all(){
        let test = await pool.query('SELECT * FROM users ');
        return test

    } 
    async to_login(login){
        let test = await pool.query('SELECT * FROM users WHERE name = ?',[login]);
        return test

    }
    async to_id(login){
        let test = await pool.query('SELECT * FROM users WHERE id = ?',[login]);
        return test

    }
    async create (ms){
        let date = await pool.query("INSERT INTO users (name,password, status ) VALUES (?,?,?)",ms )
        return date

    }
    async update (id,name){
        let date = await pool.query("UPDATE users set name =? WHERE id = ?",[name,id] )
        return date

    }
    async delete (id){
        let date = await pool.query("UPDATE users set status = ? WHERE id = ?",['baned',id] )

    }
    

    
}

module.exports = new UserController()