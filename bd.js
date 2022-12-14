const mysql = require("mysql2");
 
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "base_ms",
  password: "root"
});
 

connection.query("DROP TABLE IF EXISTS productOrders;",
  function(err, results) {
    if(err) console.log(err);
    else console.log("bd del");
});

// connection.query("DROP TABLE IF EXISTS products;",
//   function(err, results) {
//     if(err) console.log(err);
//     else console.log("bd del");
// });

// connection.query("DROP TABLE IF EXISTS orders;",
//   function(err, results) {
//     if(err) console.log(err);
//     else console.log("bd del");
// });

// connection.query("DROP TABLE IF EXISTS users;",
//   function(err, results) {
//     if(err) console.log(err);
//     else console.log("bd del");
// });


// connection.query("CREATE DATABASE if not exists base_ms",
//   function(err, results) {
//     if(err) console.log(err);
//     else console.log("База данных создана");
// });
 
 const sql = `create table if not exists users(
    id int primary key auto_increment,
    name varchar(255) not null,
    password text not null,
    status varchar(255)
  )`;
   
   connection.query(sql, function(err, results) {
       if(err) console.log(err);
       else console.log("Таблица создана");
   });


   const sql2 = `create table if not exists products(
    id int primary key auto_increment,
    name varchar(255) not null,
    des text not null,
    price integer,
    amount int,
    img text,
    statuss text
  )`;
   
   connection.query(sql2, function(err, results) {
       if(err) console.log(err);
       else console.log("Таблица 2 создана");
   });

   const sql3 = `create table if not exists orders(
    id_order int primary key auto_increment,
    id_user int,
    date DATETIME,
    status varchar(255),
    FOREIGN KEY (id_user)  REFERENCES users (Id) 
  )`;
   
   connection.query(sql3, function(err, results) {
       if(err) console.log(err);
       else console.log("Таблица 3 создана");
   });

   const sql4 = `create table if not exists productOrders(
    id int primary key auto_increment,
    id_order int,
    id_product int,
    count int,
    price_product int, 
    FOREIGN KEY (id_product)  REFERENCES products (id),
    FOREIGN KEY (id_order)  REFERENCES orders (id_order) 
  )`;
   
   connection.query(sql4, function(err, results) {
       if(err) console.log(err);
       else console.log("Таблица 4 создана");
   });

connection.end();