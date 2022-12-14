$(document).ready(function(){
    $('#bt_rg').click(async function(){
        let login = $('#lg').val()
        let password = $('#ps').val()
        let mail = $('#mail').val()
        let body ={login,password,mail}
        a =  fetch('/auth/reg', { method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8' }, body: JSON.stringify(body)})
        .then(value =>{
            console.log(value)
            let j = value.json().then(val=>{
                console.log(val)
                if (val.result==false){
                    M.toast({html: val.mes})
                }})
            if (value.redirected == true){
                  console.log(11111)
                  M.toast({html: 'вы зарегистрировались'})
                  window.location.href = value.url
            }
            
        })
    })


        $('#bt_lg').click(async function(){
            let login = $('#lg').val()
            let password = $('#ps').val()
            let body ={login,password}
            console.log(1)
            a = fetch('/auth/log', { method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8' }, body: JSON.stringify(body)}).then(value => {
                j = value.json().then(val=>{
                    console.log(val)
                    if (val.result==false){
                        M.toast({html: val.mes})
                    }
                })
                if (value.redirected == true){
                    M.toast({html: 'вы вошли'})
                    window.location.href = value.url
                }
            })
        })
    })