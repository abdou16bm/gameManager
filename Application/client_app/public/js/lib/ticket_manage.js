let btn_order_confirm = document.querySelector('#btn_order_confirm');

let printUrl = "http://localhost:6601/api/print/1/1";
let printConfig = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
    }

};
let printTicket = function (element){

    fetch('/api/print/'+element.getAttribute('order_id')+'/1/')
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{

            console.log('init print',data);
            printConfig.body = JSON.stringify(data.printData);
            fetch(printUrl,printConfig)
                .then((response) => response.json)
            .then(data => console.log(data))
        })
}

btn_order_confirm.addEventListener('click',function(e){
    e.preventDefault()

    fetch('/api/order_client/'+this.getAttribute('order_id')+'/valid')
        .then((response)=>{
            if(response.status == 200)  printTicket(btn_order_confirm)
            else alert ("erreur veuillez appeler l'administrateur")

            setTimeout(function (){
               /*  location.href = "/"; */
               location.href = "/order/new";
            },6000)
        })
})

