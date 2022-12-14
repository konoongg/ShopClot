const express = require("express"),
    port = 3000,
    app = express(),
    multer  = require('multer'),
    upload = multer(),
    fs = require("fs"),
    session = require('express-session'),
    redis = require('redis'),
    client = redis.createClient()
    redisStorage = require('connect-redis')(session),
    cookieParser = require('cookie-parser'),
    bcrypt = require('bcrypt'),
    saltRounds = 10,
    pool =  require('./controllers/database.controller').pool;
    
function func_get(req,res,next){
    if((req.session.login != undefined ) && (req.path == "/reg" || req.path == "/log")){
        console.log(2)
        res.redirect("/")
    }else{
        console.log(3)
        next()
    }
}

function func_post(req,res,next){
    if (req.session.login == undefined ){
        return res.redirect("/")   
    }
    else{
        console.log(req.session.login)
        next()
    }
}


        
(async () =>{
    app.set("view engine", "ejs")
    app.use(express.urlencoded({extended: false}))
    app.use('*/static',express.static(__dirname + "/static"))
    app.use('*/upload',express.static(__dirname + "/uploads"))
    app.use(cookieParser('secret key'))
    app.use(express.json({limit:"50mb"}))
    
    let Rclient = redis.createClient({legacyMode: true})
    Rclient.on("connect", (err) => console.log("Redis connected"))
    await Rclient.connect()

    app.use(session({
        store: new redisStorage({client:Rclient}),
        secret: 'key',
        saveUninitialized: true,
        resave:true,
        cookie: {
            secure: false,
            maxAge: 600000
        },
        rolling: true
    }))

    app.use('/auth', require('./rotes/auth'))
    app.use('/by', require('./rotes/by'))
    app.use('/admin', require('./rotes/admin'))
    app.use('/post', require('./rotes/post'))
    app.get('/', func_get, function (req,res){
        return res.render('index.ejs',{login: req.session.login})
    })
    
    
    
  
    
   
    
    
   

    
    app.listen(port,function(){

        console.log("server is working ")
    })
})()


