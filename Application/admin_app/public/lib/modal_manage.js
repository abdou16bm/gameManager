let new_option_add = document.querySelector('#new_option_add');
let option_add_edit = document.querySelector('#option_add_edit');
let new_option_priceInput = new_option_add.querySelector('input[name=option_price]')
let option_edit_priceInput = option_add_edit.querySelector('input[name=option_price]')



if (typeof new_option_add != 'undefined' && typeof option_add_edit != 'undefined' && new_option_add != null && option_add_edit != null && new_option_priceInput != null  ){
   if (location.pathname.split("/")[location.pathname.split("/").length-1] == 1) {
      new_option_priceInput.parentNode.style.visibility = 'hidden'
      option_edit_priceInput.parentNode.style.visibility = 'hidden'
   }
   else {
      new_option_priceInput.parentNode.style.visibility = 'visible'
      option_edit_priceInput.parentNode.style.visibility = 'visible'
   }

}
