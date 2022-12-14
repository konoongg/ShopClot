var express = require('express');
var router = express.Router();
var  product_c =  require('../controllers/database/product.controller');
var productO_c =  require('../controllers/database/productorder.controller');
var order =  require('../controllers/database/order.controller');
var user_c =  require('../controllers/database/user.controller');
router.post('/buy',  async function(req,res){
    let id = parseInt(req.body.product_id)
    let kv = parseInt(req.body.kv)
    // Проверка на 0
    if (kv>0){
        if (req.session.products == undefined){
            req.session.products=[]
            req.session.products.push({id, count:kv})
        }else{
            let pr = req.session.products.find(item => item.id == id);
            if (pr == undefined){
                req.session.products.push({id, count:kv})
            }else{
                req.session.products.map(item => item.id == id ? item.count+=kv : item)
            }
        }
    }else{
        return res.status(200).json({mes:'недопустимое значение',result:false})   
    }
    req.session.save()
    return res.status(200)


})

router.get('/buy_cor', async function(req,res){
    pr = []
    ms = []
    if(req.session.products == undefined){
        return res.render('buy_cor.ejs',{login: req.session.login, ms})
    }
    if (req.session.products!=undefined ){
        for(let v of req.session.products){
            pr.push(v.id)
        }
         ms = await product_c.id_in(pr)
         
        ms = ms[0]
        for (let v of ms){
            v['count']=req.session.products.find(item => item.id == v.id).count
        }
        return res.render('buy_cor.ejs',{login: req.session.login, ms})
    }
   
    
    
})


router.post('/ofor', async function(req,res){
    req.session.products=undefined
    let st = await user_c.to_id(req.session.login)
    if (st[0][0].status =='baned'){
        return res.status(200).json({mes:'вы не можете оформлять заказы',result:true}) 
    }
    let zak = req.body
    let dt = new Date()
    let date = await order.create([req.session.login,dt,'pending'])
    let idmax = date[0].insertId
    for (let i of zak){
        let ms = await product_c.all_id(i[0])
        let date = await productO_c.create([idmax,i[0],i[1],ms[0][0].price])
        ms = await product_c.min(ms[0][0].id,ms[0][0].amount -i[1] )
        
        
    }
    req.session.save()
    return res.status(200).json({mes:'ваш заказ офрмлен', id:idmax ,result:true}) 
    
})

router.get('/order/:id', async function(req,res){
    return res.render('ofor_id.ejs',{login: req.session.login,id_o:req.params.id})
    
    
})
module.exports = router