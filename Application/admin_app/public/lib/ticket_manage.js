let btn_order_confirm = document.querySelector('#btn_order_confirm');

let printTicket = function (element){
    alert('distant print')
    fetch('/api/print/'+element.getAttribute('order_id')+'/1/')
        .then((response)=>{
            return response;
        })
        .then((data)=>{console.log(data)})

    fetch('http://192.168.8.105:6601/api/print/test/'+element.getAttribute('order_id')+'/1/')
    // fetch('http://192.168.8.58:6601/api/print/test/'+element.getAttribute('order_id')+'/1/')
        .then((response)=>{
            return response;
        })
        .then((data)=>{console.log(data)})

}

btn_order_confirm.addEventListener('click',function(e){
    e.preventDefault()

    fetch('/api/order_client/'+this.getAttribute('order_id')+'/confirm')
        .then((response)=>{
            if(response.status == 200)  printTicket(btn_order_confirm)
            else alert ("erreur veuillez appeler l'administrateur")

            location.href = "/order_client/admin/list"

            /* setTimeout(function (){
                location.href = "/";
            },6000)*/
        })
})

