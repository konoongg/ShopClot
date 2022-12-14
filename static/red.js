$(document).ready(function(){

    function return_mas(global_ms,p){
        let ms = []
        let z_id = p.children()[0].id
        let c = p.find('tr').find('input.nb');
        let c_id = p.find('td._id')
        console.log(c,c_id)
        for (let i=0; i< c.length;i++ ){
            
            if (i%2==0){
                console.log(i,Math.floor(i/2))
                ms.push({'id_product': c_id[Math.floor(i/2)].innerHTML, 'price':c[i].value})}

            
            else if (i%2==1){
                ms[ms.length-1]['count'] =c[i].value

            }
          
        }

        global_ms.push({ms:ms,id:z_id})
        



    }
    
    $('._red').click(async function(){
        let global_ms = []
        let p= $(this).parent().parent().parent()
        console.log(p)
        return_mas(global_ms,p)
        console.log(global_ms)
        let p1 = await  fetch('http://localhost:3000/admin/w_order', { 
            method: 'POST',  
            headers: {'Content-Type': 'application/json;charset=utf-8' },
             body: JSON.stringify({global_ms})
        }) 

        
})
    $('.all_red').click(async function(){ 
        let global_ms = []
        let c = $(this).parent().parent().find('li')
        for(let i of c){
            return_mas(global_ms,$(i))

        }
    console.log(global_ms)
    let p1 = await  fetch('http://localhost:3000/admin/w_order', { 
        method: 'POST',  
        headers: {'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({global_ms})
        }) 
    })

    $('._del').click(async function(){
        let _class = $(this).attr('class').split(' ')
        let parent = $(this).parent().parent().remove()
    
        let p1 = await  fetch('http://localhost:3000/admin/w_order/del_product', { 
            method: 'POST',  
            headers: {'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({id_product:_class[1], id_order:_class[2]})
            }) 

    })

    $('._del_order').click(async function(){
        let _class = $(this).attr('class').split(' ')[1]
        let parent = $(this).parent().parent().parent().remove()
    
        let p1 = await  fetch('http://localhost:3000/admin/w_order/del_order', { 
            method: 'POST',  
            headers: {'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ id_order:_class})
            }) 

    })
    $('._red_order').click(async function(){
        let _class = $(this).attr('class').split(' ')[1]
        
    
        let p1 = await  fetch('http://localhost:3000/admin/w_order/red_order', { 
            method: 'POST',  
            headers: {'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ id_order:_class})
            }) 

    })

    $('._dd').click(async function(){
        
        let inp = $(this).parent().find('input.nb')
        let id_z = $(this).parent().parent().parent().parent().find('div')[0].id
        let table = $(this).parent().parent().parent().find('table')
        console.log(table)
        let p1 = await  fetch('http://localhost:3000/admin/w_order/dd', { 
            method: 'POST',  
            headers: {'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ id_order:id_z, id_product:inp[0].value,count:inp[1].value})
            }) .then(value =>{
                let j = value.json().then(val=>{
                    console.log(val)
                    if( val.result == true){
                        $(table[0]).append("<tr> <td class = '_id'>"+inp[0].value+"</td>             <td>"+val.name+"</td><td><input class = 'nb' type='text' value="+val.price+"></td><td><input class = 'nb' type='text' value="+inp[1].value+"></td>          <td>"+val.price*inp[1].value+"</td><td ><input class = '_del "+inp[0].value +"id_z"+"'  type = 'submit' value = 'удалить'></td></tr>");


                    }
                })
            })
        
            
        
    })


})

