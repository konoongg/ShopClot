$(document).ready(function(){
    body = window.location.pathname
    $('#lv').click(async function(){
        let a = await fetch('/auth/btn', { method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8' }, body: JSON.stringify({pathname:body})}).then(value =>{
            let a2 = value.json().then(vl2 =>{
                if (vl2.result ==false){
                    M.toast({html: vl2.mes})
                    window.location.href = '/'
                }
            })
            if (value.redirected == true){
                window.location.href = value.url
            }
        })
        })


    })