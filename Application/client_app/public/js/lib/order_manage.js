const order_id = location.pathname.split("/")[2];
const order_table = document.querySelector("#order_table tbody");
const order_total_price = document.querySelector("#order_total_price");
const btn_confirm_product = document.querySelector('#btn_confirm_product');
const btn_cancel_product = document.querySelectorAll('.btn_cancel_product');
const btn_order_next = document.querySelector("#btn_order_next");
const optionsAddModalSimple = document.querySelector('#optionsAddModal');
const optionsAddModal = new bootstrap.Modal(document.querySelector('#optionsAddModal'), {
    keyboard: false
})
const optionsCard = optionsAddModalSimple.querySelectorAll('.card-2');
const optionsBody = optionsAddModalSimple.querySelectorAll('.card-2__body');
const order_detail_left = new bootstrap.Offcanvas('#order_detail_left')

const menu_list_block = document.querySelector(".menu-list-tab ")
const order_detail_block = document.querySelector("#order_detail_block");

let options_add = [];

let options_add_list = document.querySelector('#optionsAddModal').querySelectorAll('input');

let productOptionsCount = 0;

for (let i = 0; i<options_add_list.length; i++){
    options_add_list[i].addEventListener('change',function (e){
        console.log("options_add : ",options_add)
        if(e.target.checked)
            options_add.push(e.target.value)
        else
            // delete options_add[event.target.value]
            options_add.shift(e.target.value)

        console.log("options_add later : ",options_add)
    })
}


const order_products_load = function (order){

    // order_table = document.querySelector("#order_table tbody");
    // console.log('order_table ',order_table)
    // console.log('typeof order_table ',typeof order_table)
    // if (order_table != null && typeof(order_table) != "undefined") order_table.innerHTML = "";
    // order_table.innerHTML = "";

    let url = "/api/order/"+order;

    fetch(url)
        .then((response)=>{
            if(response.status == 200) return response.json()
        })
        .then((data)=>{

            console.log(data)
            const {order} = data;
            const order_info = data.order_info[0];
            order_table.innerHTML = "";

            if(order.length > 0) {
                
                btn_order_confirm.style.visibility = "visible";
                btn_order_next.style.visibility = "visible"

            }
            else {

                btn_order_confirm.style.visibility = "hidden";
                btn_order_next.style.visibility = "hidden"

            }

            for(let i=0; i<order.length;i++)
            {
                let trElement = document.createElement('tr');
                let tdElement1 = document.createElement('td');
                let tdElement2 = document.createElement('td');
                let tdElement3 = document.createElement('td');
                let tdElement4 = document.createElement('td');
                let tdElement5 = document.createElement('td');
                let tdElement6 = document.createElement('td');
                let removeBtn = document.createElement('button');
                console.log(order)
                tdElement1.innerHTML = "<div class ='d-flex justify-content-center align-items-start flex-column gap-2'><strong class='text-dark'>"+order[i].product_name+"</strong><p class='test-muted'>"+order[i].cat_name+"</p></div>";

                if(order[i].sauces.length > 0) tdElement1.innerHTML += "<p>Sauces : "+order[i].sauces.replaceAll(',',' / ')+"</p>";
                if(order[i].supplements.length > 0) tdElement1.innerHTML += "<p>Supplements : "+order[i].supplements.replaceAll(',',' / ')+"</p>";
                if(order[i].others.length > 0) tdElement1.innerHTML += "<p>Autres : "+order[i].others.replaceAll(',',' / ')+"</p>";

                tdElement2.innerText = order[i].supplements.replaceAll(',',' / ');
                tdElement3.innerText = order[i].sauces.replaceAll(',',' / ');
                tdElement4.innerText = order[i].others.replaceAll(',',' / ');
                tdElement5.innerText = order[i].detail_price + " DA";
                removeBtn.innerHTML = "<i class='bx bx-trash'></i>";
                removeBtn.className = "btn-light remove";
                removeBtn.style.fontSize = "20px";
                removeBtn.addEventListener("click",function (e){e.preventDefault();order_product_remove(order[i].detail_id);})

                tdElement1.className = "col-2";
                tdElement2.className = "col-2";
                tdElement3.className = "col-2";
                tdElement4.className = "col-2";
                tdElement5.className = "col-3";
                tdElement6.className = "product-subtotal d-flex";

                trElement.append(tdElement1)
                // trElement.append(tdElement2)
                // trElement.append(tdElement3)
                // trElement.append(tdElement4)
                trElement.append(tdElement5)
                trElement.append(tdElement6)
                tdElement6.append(removeBtn)
                order_table.append(trElement)

                order_total_price.innerText = order_info.order_total_price + " DA";
            }
        })

};

const reset_checkBox = function (checkBox_list){
    for (let i = 0; i<checkBox_list.length; i++){
        checkBox_list[i].checked = false;
    }
}


const order_product_select = function (order,product){
    productOptionsCount = 0;

    // btn_confirm_product.addEventListener('click',()=>{order_option_add(order,product);})
    btn_confirm_product.onclick = function () {
        order_option_add(order,product);
        order_detail_block.style.visibility = 'visible'
        order_detail_left.show();
    };
    options_add = [];

/*    for(let i=0; i<optionsBody.length;i++){
        if ( !optionsBody[i].getAttribute('products_data').includes(product) ) optionsBody[i].className = "card-2__body option_hide"
        else optionsBody[i].className = "card-2__body option_show"
    }    */

    for(let i=0; i<optionsCard.length;i++){
        if ( optionsCard[i].getAttribute('products_data').split(',').indexOf(product) > -1 ) {

            optionsCard[i].className = "card-2 col-3 option_show"
            productOptionsCount++;
        }
        else {
            optionsCard[i].className = "card-2 col-3 option_hide"
        }
    }

    if (productOptionsCount == 0) {
        order_option_add(order,product);
        order_detail_block.style.visibility = 'visible'
        order_detail_left.show();
    }
    else {
        optionsAddModal.toggle()
    }

}

const order_product_remove = function (detail_id){

    let urlApi = '/api/order/product_remove/'+detail_id;
    let configApi = {
        method : "DELETE",
    };

    fetch(urlApi,configApi)
        .then((response)=>{ if (response.status == 200) return response.json()})
        .then((data)=>{
            console.log(data)
            const {order_totalPrice} = data.data;
            if(data.err) { alert('erreur !! veuillez reesayer')}
            else {
                order_products_load(order_id)
                order_total_price.innerText = order_totalPrice + " DA";
            }
        })
}

const order_option_add = function (order,product){

    let product_options = {
        order_id : order,
        product_id : product,
        options_add : options_add
    }

    let urlApi = '/api/order/product_add';
    let configApi = {
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method : "POST",
        body : JSON.stringify(product_options)
    };

    console.log('order',product_options)

    fetch(urlApi,configApi)
        .then((response)=>{ if (response.status == 200) return response.json()})
        .then((data)=>{
            console.log(data)
            if(data.err) { alert('erreur !! veuillez reesayer')}
            else {
                order_products_load(order_id);
                optionsAddModal.hide()
            }
        })

}


btn_cancel_product.forEach((btnElement)=>{
    btnElement.addEventListener('click',function (e){
        e.preventDefault();

        let urlApi = '/api/order/'+order_id+'/delete';
        let configApi = {
            method : "DELETE",
        };
        fetch(urlApi,configApi)
            .then((response)=>{ if (response.status == 200) return response.json()})
            .then((data)=>{
                console.log(data)
                if(data.err) alert('erreur !! veuillez reesayer')
                else location.href = "/";
            })
    })
})



optionsAddModalSimple.addEventListener('hidden.bs.modal',function (){
    reset_checkBox(options_add_list)
})



/*
menu_list_block.addEventListener('click',function (){
    order_detail_block.style.visibility = 'hidden'
})
*/

order_products_load(order_id);
