var express = require('express');
var router = express.Router();
var user_c =  require('../controllers/database/user.controller');


router.get('/log', function(req,res){
    console.log( req.session.login)
    return res.render('log.ejs',{login: req.session.login})
})

router.post('/log', async function(req,res){
    
    let {login,password} = req.body  
    let test = await user_c.to_login(login) ;
    if (test[0].length ==0)
        return res.status(200).json({mes:'такого логина не существует',result:false})
    if (bcrypt.compareSync(password,test[0][0].password)){
            req.session.login = test[0][0].id
            return res.redirect("/")
    }
    else return res.status(200).json({mes:'вы ввели неверный пароль',result:false})
        
    
});


router.get('/reg',function(req,res){
    return res.render('reg.ejs',{login: req.session.login})
})



router.post('/reg', async function(req,res){
    let {login,password,mail} = req.body
    console.log(req.body)
    let salt = await bcrypt.genSalt(saltRounds);
    let hash =  await bcrypt.hash(password, salt)
    let date = await user_c.to_login(login)
    if (date[0].length ==0){
        date = await user_c.create([login,hash,"user"] ) 
        return res.redirect('/')
    }
    else{
        return res.status(200).json({mes:'этот логин занят',result:false})  
    }
        
});

 

router.post('/btn', function(req,res){
    let ur_l = req.body.pathname
    console.log(req.cookies)
    req.session.destroy()

    return res.redirect(ur_l)
});
module.exports = router

