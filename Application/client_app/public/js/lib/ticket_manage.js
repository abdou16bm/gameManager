let btn_order_confirm = document.querySelector('#btn_order_confirm');

let printTicket = function (element){
    fetch('/api/print/'+element.getAttribute('order_id')+'/1/')
}

btn_order_confirm.addEventListener('click',function(e){
    e.preventDefault()

    fetch('/api/order_client/'+this.getAttribute('order_id')+'/valid')
        .then((response)=>{
            if(response.status == 200)  printTicket(btn_order_confirm)
            else alert ("erreur veuillez appeler l'administrateur")

            setTimeout(function (){
                location.href = "/";
            },6000)
        })
})

