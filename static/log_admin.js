$(document).ready(function(){
    $('#bt_lg').click(async function(){
            let login = $('#lg').val()
            let password = $('#ps').val()
            let body ={login,password}
            console.log(1)
            a = fetch('/admin/log_admin', { method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8' }, body: JSON.stringify(body)}).then(value => {
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