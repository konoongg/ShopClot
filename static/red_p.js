$(document).ready(function(){

    function return_mas(global_ms,p){
        ms = {}
        ms.id  = p.find('td')[0].textContent
        ms.name  = $(p.find('td')[1]).find('input')[0].value
        ms.des  = $(p.find('td')[2])[0].textContent  
        ms.price  = $(p.find('td')[3]).find('input')[0].value  
        ms.amount  = $(p.find('td')[4]).find('input')[0].value
        ms.img = $(p.find('td')[7]).find('input')[1].value
        console.log(ms)         
        global_ms.push(ms)
          
        

        
        



    }
    
    $('._red').click(async function(){
        let global_ms = []
        let p= $(this).parent().parent()
        return_mas(global_ms,p)
        let p1 = await  fetch('http://localhost:3000/admin/w_product', { 
            method: 'POST',  
            headers: {'Content-Type': 'application/json;charset=utf-8' },
             body: JSON.stringify({global_ms})
        }) 

        
})
    $('.all_red').click(async function(){ 
        let global_ms = []
        let c = $(this).parent().parent().parent().find('tr.nh')
        for(let i of c){
             return_mas(global_ms,$(i))

        }
    console.log(global_ms)
    let p1 = await  fetch('http://localhost:3000/admin/w_product', { 
        method: 'POST',  
        headers: {'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({global_ms})
        }) 
    })

    $('._dd').click(async function(){
        let a = $($(this).parent().parent()[0]).find('td')[0].textContent
        let p1 = await  fetch('http://localhost:3000/admin/w_product/del_product', { 
            method: 'POST',  
            headers: {'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({a})
        }) 
    })

    })

    
   

   



