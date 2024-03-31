let catBlock = document.querySelectorAll('.catBlock');
let btnHideContent = document.querySelector('#btnHideContent');
let tab_content = document.querySelector('.tab_content')


if (catBlock != null && typeof catBlock != 'undefined' && btnHideContent != null && typeof btnHideContent != 'undefined')
{

    for (let i=0;i<catBlock.length; i++)
    {
        catBlock[i].addEventListener('click', function (){
            tab_content.classList.remove('option_hide')
        })
    }

    btnHideContent.addEventListener('click',function (){
        
        tab_content.classList.contains("option_hide") != true ? tab_content.classList.add('option_hide') : location.replace("/")

    })
}
