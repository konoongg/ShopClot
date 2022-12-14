var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer();
var fs = require("fs");
var user_c =  require('../controllers/database/user.controller');
var product_c =  require('../controllers/database/product.controller');
var productO_c =  require('../controllers/database/productorder.controller');
var order =  require('../controllers/database/order.controller');
const { range } = require('express/lib/request');

function admin(req,res,next){
    if (req.session.login != '0' ){
        return res.redirect("/")   
    }
    else{
        next()
    }
}
router.get('/log_admin', function(req,res){
    console.log( req.session.login)
    return res.render('log_a.ejs',{login: req.session.login})
})

router.post('/log_admin', async function(req,res){
    
    let {login,password} = req.body
    if(login == 'admin' && password=='123') {
        req.session.login = 0
        return res.redirect("/admin")}
    else return res.status(200).json({mes:'вы ввели неверный пароль',result:false})
        
    
})

router.get('/', admin, function (req,res){
    return res.render('index_admin.ejs',{login: req.session.login})
})
//////////////////////////////////////////////////////////////////////////////////////
router.get('/w_order', admin,  async function (req,res){
    
    let ms = await productO_c.all()
    
    ms = ms[0]
    ms_g = {}
    for (let i of ms){
        if((i.id_order in ms_g)==false){
            ms_g[i.id_order]=[]
            ms_g[i.id_order].push(i)

        }
        else{
            ms_g[i.id_order].push(i)
        }
    }
    console.log(ms_g)
    return res.render('w_order.ejs',{login: req.session.login,ms:ms_g})
})

router.post('/w_order', admin,  async function (req,res){
    for (let it of req.body.global_ms){
        let ms = it.ms
        let id = it.id
        for (let i of ms){
            let date = await productO_c.update(id,i)
    
    }  
 }
})

router.post('/w_order/del_product', admin,  async function (req,res){
    let date = await productO_c.delete(req.body.id_product,req.body.id_order)
})

router.post('/w_order/del_order', admin,  async function (req,res){
    console.log(req.body.id_order)
    let date = await productO_c.delete_all(req.body.id_order)
    let date_o = await order.delete(req.body.id_order)
})
router.post('/w_order/red_order', admin,  async function (req,res){
    let date_o = await order.update_status(req.body.id_order)
})

router.post('/w_order/dd', admin,  async function (req,res){
    let product_price = await product_c.all_id(req.body.id_product)
    let product_to_bd = await productO_c.create([req.body.id_order,req.body.id_product,req.body.count,product_price[0][0].price])
    return res.status(200).json({name:product_price[0][0].name,price:product_price[0][0].price ,result:true})

})
//////////////////////////////////////////////////////////////////////////////////////

router.get('/w_product', admin,  async function (req,res){
    
    let ms = await product_c.all()
    
    
    return res.render('w_product.ejs',{login: req.session.login,ms:ms[0]})
})


router.post('/w_product', admin,  async function (req,res){
    let global_ms = req.body.global_ms
    for (let i of global_ms){
        let ms = await product_c.update(i)

    }
    
})

router.post('/w_product/del_product', admin,  async function (req,res){
    let a = req.body.a
    let n = req.body.n +' (del)'
    let ms = await product_c.del(Number(a))

    
    
})
//////////////////////////////////////////////////////////////////////////////////////////////////////


router.get('/w_users',admin, async function(req,res){
    let users = {}
    let ms = await user_c.all()
    ms = ms[0]
    for (let i in ms){
        let ms_o = await order.order_to_user(ms[i].id)
        arr = ''
        for (let a in ms_o[0]){
            arr += ',' + String(ms_o[0][a].id_order )
        }
        ms[i].order = arr.slice(1)
        
    }
   console.log(ms)
    return res.render('w_users.ejs',{login: req.session.login,ms:ms})
})

router.post('/w_users',admin, async function(req,res){
    let ms = await user_c.update(req.body.id,req.body)
})

router.post('/w_users/dd',admin, async function(req,res){
    let ms = await user_c.delete(req.body.id)
})
//////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/create_post',admin,function(req,res){
    
    return res.render('reate_post.ejs',{login: req.session.login})
})

router.post('/create_post',admin, upload.single('file'),  async function(req,res){
    let imageName = req.file.originalname
    let newPath =`./uploads/${imageName}`
    let date = await product_c.create([req.body.nm,req.body.des,req.body.price,req.body.cn,imageName])
    fs.writeFile(newPath, req.file.buffer, async function (err) {
        res.redirect("create_post");
    });
    }
    
    
)
module.exports = router