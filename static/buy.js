$(document).ready(function(){
    $('.buy').click(async function(){
        
        product_id = $(this)[0].id.slice(4)
        kv = $(this).parent().children('#kv').val()
        if (kv>0){
            let a = await fetch('/by/buy', { 
                method: 'POST', 
                headers: {'Content-Type': 'application/json;charset=utf-8' }, 
                body: JSON.stringify({product_id,kv})
            }).then(val =>{
                j = val.json().then(v2=>{
                    if (v2.result==false){
                        M.toast({html: v2.mes})
                    }
                })
            })
    }
    else{
        M.toast({html: 'недопустимое значение'})
    }
}

)})