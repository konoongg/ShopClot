

$(function(){
    
    $('#bt_post').click(async function(){
        const formData = new FormData();
        let nm = $('#nm').val()
        let cn = $('#cn').val()
        let price = $('#price').val()
        let des = $('#des').val()
        let img = document.getElementById('img').files[0]
        formData.append('nm', nm);
        formData.append('cn', cn);
        formData.append('price', price);
        formData.append('des', des);
        formData.append('file', img, img.name)
        let p1 = await  fetch('http://localhost:3000/admin/create_post', { 
            method: 'POST', 
            body: formData 
        }).then( values => {
            console.log(values)
            
            if (values.redirected == true){
                  document.location.href=values.url
            }
          })
    }) 

 
});