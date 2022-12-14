$(document).ready(function(){
    $('#btn_ofor').click(async function(){
        let m = $('.avatar')
        let n_n = 0
        let body = []
        for (let i of m){
            console.log(i)
            let id = []
            let count = $('#'+String(i.id)).children("input").val()
            console.log(count)
            id.push(i.id)
            if (count<=0){
                body = []
                M.toast({html: 'Недопустимое знаение'})
                n_n =1 
            } 
            id.push(count) 
            body.push(id)
        }
        if (n_n==0){
            a =  fetch('/by/ofor', { method: 'POST', headers: {'Content-Type': 'application/json;charset=utf-8' }, body: JSON.stringify(body)}).then(value => {
                j = value.json().then(val=>{
                    console.log(val)
                    if (val.result==true){
                        M.toast({html: val.mes})
                        window.location.href = 'http://localhost:3000/by/order/'+val.id
                        
                    }
                })
                
            })
        }
})

})