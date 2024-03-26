/*let modal_new = document.querySelector('#new');
let next_click = document.querySelector('.next_click');

let n = 1;

let next_sound = document.createElement('AUDIO')
document.body.appendChild(next_sound)

let New_audio_next_source = document.createElement('source')
New_audio_next_source.setAttribute('src','/assets/1.mp3')
New_audio_next_source.setAttribute('type','audio/mp3')
next_sound.appendChild(New_audio_next_source)


next_click.addEventListener('click',function (){

    n++;
    this.innerText =  "0"+n;
    next_click_txt.innerText =  "0"+n;
    next_sound.play()
})*/

//////////////////////////////////////////////////////


// let orders = document.querySelectorAll('[id^="order"]');
let next_client = document.querySelector('.next_client');

let modal_newtOrder = document.querySelector('#newtOrder');
let newtOrder_client = document.querySelector('#newtOrder_client');
let newtOrder_name = document.querySelector('#newtOrder_name');
let initValues = [];
let newValues = [];

let next_sound = document.createElement('AUDIO')
document.body.appendChild(next_sound)

let New_audio_next_source = document.createElement('source')
New_audio_next_source.setAttribute('src','/son/main_song.mp3')
New_audio_next_source.setAttribute('type','audio/mp3')
next_sound.appendChild(New_audio_next_source)




const getOrders = function (){
    const url='/api/display/';
    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method : 'GET',
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
        let orders = data.order.reverse()
        showWaiting(orders)

    }).catch(console.error)
    newWaitingCheck(initValues,newValues)
}

const showWaiting = function (order){
    initValues = newValues;
    newValues = [];
    // console.log('data',order)
    if (typeof order == "string") order = JSON.parse(order);
    // console.log('orders',order)
    // console.log('order.length',order.length)
    let order_number = 0;

    if (typeof (order) != "undefined" &&  order.length > 0 ) {
        for(let i = 0; i<order.length; i++) {
            if (typeof (order[i].order_number) != "undefined" &&  order[i].order_number != null && order[i].order_statut == 2) order_number = order[i].order_number;
            // next_client.innerHTML = order_number;
            newValues.push(order[i])
            order_number = 0;
        }
    }

    // console.log(initValues)
    // console.log(newValues)
}

const newWaitingCheck = function (initValues,newValues){


    // console.log('initValues',initValues)
    // console.log('newValues',newValues)


    for(let i =0; i<initValues.length;i++){
        // console.log('newValues[i].order_statut',newValues[i].order_statut)
        // console.log('initValues[i].order_statut',initValues[i].order_statut)
        if (/*initValues[i].order_number != newValues[i].order_number &&  */initValues[i].order_statut != newValues[i].order_statut  /*&& newValues[i].order_number != null*/  && newValues[i].order_statut == 2){

            console.log('change')
            console.log('newValues[i].order_number != null',newValues[i].order_number != null)
            console.log('newValues[i].order_number',newValues[i].order_number)
            console.log('initValues[i].order_number',initValues[i].order_number)


        /*    $('#newtOrder').modal('show')
            setTimeout(function (){
                $('#newtOrder').modal('toggle')
            },5000)*/

            next_client.innerText = newValues[i].order_number;

            // alert('next order:'+newValues[i].order_number)


            // newtOrder_client.innerText = newValues[i].order_number ;
            // newtOrder_name.innerText = newValues[i].order_title;
            next_sound.play()
        }
    }

}



