let confirmDelMessage = "Etes-vous sure de vouloir supprimer ?";
let confirmValidationMessage = "Etes-vous sure de vouloir confirmer ?";


const confirmmodal = function(id,type,info){

    let link,linkMethod, linkRedirect,bodyContent;
    let modal_del_btn =document.getElementById('confirmActionModal').querySelectorAll("a")[1];
    let modal_text =document.querySelector('#modal_text');
    let modal_message =document.querySelector('#modal_message');

    if (type == 1){
        modal_text.innerHTML = confirmDelMessage;
        link = '/api/product/'+id+'/delete';
        linkMethod = 'GET';
        linkRedirect = '/product/admin/list'
        modal_del_btn.setAttribute('onclick','fetchDataApi(\''+link+'\',\''+linkMethod+'\',null,\''+linkRedirect+'\')');
    }
    if (type == 2){
        modal_text.innerHTML = confirmDelMessage;
        modal_message.innerHTML = 'Vous allez supprimer tous les produits : <br><strong>'+ info + '</strong>';
        link = '/api/category/'+id+'/delete';
        linkMethod = 'GET';
        linkRedirect = '/category/admin/list'
        modal_del_btn.setAttribute('onclick','fetchDataApi(\''+link+'\',\''+linkMethod+'\',null,\''+linkRedirect+'\')');
    }
    if (type == 3){
        modal_text.innerHTML = confirmDelMessage;
        link = '/api/option_add/'+id+'/delete';
        linkMethod = 'GET';
        linkRedirect = '/option_add/list/'+location.pathname.split("/")[location.pathname.split("/").length-1]
        modal_del_btn.setAttribute('onclick','fetchDataApi(\''+link+'\',\''+linkMethod+'\',null,\''+linkRedirect+'\')');
    }
    if (type == 4){
        modal_text.innerHTML = confirmValidationMessage;
        link = '/api/order_client/'+id+'/valid';
        linkMethod = 'GET';
        linkRedirect = '/order_client/admin/list'
        modal_del_btn.setAttribute('onclick','fetchDataApi(\''+link+'\',\''+linkMethod+'\',null,\''+linkRedirect+'\')');
    }
    if (type == 5){
        modal_text.innerHTML = confirmValidationMessage;
        link = '/api/user/'+id+'/delete';
        linkMethod = 'GET';
        linkRedirect = '/user/admin/page/1'
        modal_del_btn.setAttribute('onclick','fetchDataApi(\''+link+'\',\''+linkMethod+'\',null,\''+linkRedirect+'\')');
    }

}


const fetchDataApi = function (link, linkMethod, bodyContent, linkRedirect) {
    fetch(link, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method : linkMethod,
        body : bodyContent,
    }).then(function (response){
        if (response.status == 200) {
            if (linkRedirect != 'null' && linkRedirect != null && typeof linkRedirect != 'undefined') window.location.replace(linkRedirect);
        }
        else {
            window.location.reload();
        }
    })
}



const set_info = function (info,type){

    let edit_info = JSON.parse(info);
    let product_optionsIdData = new Array();

    let modal_inputs,modal_form,product_edit_options,checkbox_inputs,services_counter;

    if (type==1) {
        modal_inputs = document.querySelector('#product-edit').querySelectorAll('input,textarea,select');
        modal_form = document.querySelector('#product-edit').querySelector('form');
        product_edit_options = document.querySelector('#product-edit-options').querySelectorAll('input[type=checkbox]');
        if ( edit_info.product_optionsId != null && typeof(edit_info.product_optionsId) != 'undefined') product_optionsIdData = edit_info.product_optionsId.split(",");
        else product_optionsIdData = []

        modal_form.setAttribute('action','/product/'+edit_info.product_id+'/edit')

        modal_inputs[0].value = edit_info.product_id;
        modal_inputs[1].value = edit_info.cat_id;
        modal_inputs[3].value = edit_info.product_name;
        modal_inputs[4].value = edit_info.product_price;
        modal_inputs[5].value = edit_info.product_desig;

        console.log(product_edit_options)

        for (let i = 0; i<product_edit_options.length;i++){
            if (typeof product_optionsIdData.find(element => element == product_edit_options[i].value) != 'undefined') product_edit_options[i].checked = true
            else product_edit_options[i].checked = false;
        }


    }
    else if (type==2) {
        modal_inputs = document.querySelector('#category-edit').querySelectorAll('input,textarea,select');
        modal_form = document.querySelector('#category-edit').querySelector('form');

        modal_form.setAttribute('action','/category/'+edit_info.cat_id+'/edit')

        modal_inputs[0].value = edit_info.cat_id;
        modal_inputs[2].value = edit_info.cat_name;


    }
    else if (type==3) {
        modal_inputs = document.querySelector('#option_add_edit').querySelectorAll('input,textarea,select');
        modal_form = document.querySelector('#option_add_edit').querySelector('form');

        modal_form.setAttribute('action','/option_add/'+edit_info.option_id+'/edit')

        modal_inputs[0].value = edit_info.option_id;
        modal_inputs[2].value = edit_info.option_name
        modal_inputs[3].value = edit_info.option_price


    }

    else if (type=='action') {

        modal_inputs = document.querySelector('#action-edit').querySelectorAll('input,textarea,select');
        modal_form = document.querySelector('#action-edit').querySelector('form');

        modal_form.setAttribute('action','/action/'+edit_info.action_id+'/edit')

        modal_inputs[0].value = edit_info.action_id;
        modal_inputs[1].value = edit_info.action_title;

    }
    else if (type=='counter') {

        modal_inputs = document.querySelector('#counter-edit').querySelectorAll('input,textarea,select');
        checkbox_inputs = document.querySelector('#counter-edit').querySelectorAll('input[type=checkbox]');
        modal_form = document.querySelector('#counter-edit').querySelector('form');

        modal_form.setAttribute('action','/counter/'+edit_info[0].counter_id+'/edit')

        services_counter = edit_info[0].services_id.split(',');
        // modal_inputs[0].value = edit_info[0].counter_id;
        modal_inputs[0].value = edit_info[0].counter_title;

        for (let i = 0; i<checkbox_inputs.length;i++){
            if (typeof services_counter.find(element => element == checkbox_inputs[i].value) != 'undefined') checkbox_inputs[i].checked = true;
            else checkbox_inputs[i].checked = false;
        }
    }
    else if (type==4) {


        modal_inputs = document.querySelector('#user_edit').querySelectorAll('input,textarea,select');
        checkbox_inputs = document.querySelector('#user_edit').querySelectorAll('input[type=checkbox]');
        modal_form = document.querySelector('#user_edit').querySelector('form');
        console.log(edit_info)
        modal_form.setAttribute('action','/user/'+edit_info.user_id+'/update')

        modal_inputs[0].value = edit_info.user_id;
        modal_inputs[1].value = edit_info.user_username;
        modal_inputs[4].value = edit_info.user_lastname;
        modal_inputs[5].value = edit_info.user_name;


    }

}
