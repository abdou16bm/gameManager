const catBlockList = document.querySelectorAll('.catBlock');
const btnHideContent = document.querySelector('#btnHideContent');
const tab_content = document.querySelector('.tab_content');
const searchBlock = document.querySelector("#searchBlock");
const myInputSearch = document.querySelector("#myInputSearch");
let filterCat = null

if (catBlockList && btnHideContent) {

  catBlockList.forEach(catBlock => {
    
    const catId = catBlock.getAttribute("catId");
    catBlock.removeAttribute("catId");

    catBlock.addEventListener('click', function (){

      tab_content.classList.remove('option_hide');
      btnHideContent.style.display = "inline";
        
      OpenFilterCat(catId);
      
    })

  });

 
  btnHideContent.addEventListener('click',function (){
      
    /* tab_content.classList.contains("option_hide") != true ? tab_content.classList.add('option_hide') : location.replace("/") */
    if (tab_content.classList.contains("option_hide") != true) {

      tab_content.classList.add('option_hide');
      btnHideContent.style.display = "none";

      hideFilterCat();
      
    }

  })
  
}




function OpenFilterCat(catId) {
  
  if (catId) {
    
    filterCat = catId;
    const productsTab = document.querySelector("#productsTab-" + filterCat);
    const productBlock_list = productsTab.querySelectorAll("#productBlock");

    myInputSearch.oninput = () => {

      const value = myInputSearch.value;
      if (value) {
          
        productBlock_list.forEach(product => {
        
          const name = product.getAttribute("productData-search");
          name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ? product.style.display = "block" : product.style.display = "none"
    
        });

      } else productBlock_list.forEach(product => product.style.display = "block");

    }

    searchBlock ? searchBlock.style.display = "flex" : false;
    myInputSearch.focus()

  }

}

function hideFilterCat() {
  
  const productsTab = document.querySelector("#productsTab-" + filterCat);
  const productBlock_list = productsTab.querySelectorAll("#productBlock");

  myInputSearch ? myInputSearch.value = "" : false;
  productBlock_list.forEach(product => product.style.display = "block");

  filterCat = null;
  searchBlock ? searchBlock.style.display = "none" : false;

}