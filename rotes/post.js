var express = require('express');
var router = express.Router();
var product_c =  require('../controllers/database/product.controller');
router.get('/posts', async function(req,res){
    console.log(req.session)
    let date = await product_c.list() 
    
    return res.render('l_posts.ejs',{login: req.session.login,ms: date[0]})
})


module.exports = router