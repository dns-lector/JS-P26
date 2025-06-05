// Події. Умовно події поділяються на 
// - події життєвого циклу
// - події UI 
window.modal = null;
document.addEventListener('DOMContentLoaded', () => {
    // DOMContentLoaded - подія життєвого циклу, яка подається тоді, коли
    // весь HTML оброблений, по всіх елементах створені об'єкти (DOM)
    // Саме у цій події слід звертатись до елементів сторінки
    const block1 = document.getElementById("block-1");    // Варіант, коли
    if(!block1) throw "Block 1 not found";                // елемент повинен
    block1.addEventListener('click', block1Click);        // бути неодмінно

    const block2 = document.querySelector("#block-2");    // Варіант, коли 
    if(block2) block2.onclick = block2Click;              // елемент опціональний

    const block3 = document.querySelector("#block-3");  
    if(block3) block3.onclick = block3Click;         

    const pinCode = document.querySelector("#pin-code");  
    if(pinCode) {
        pinCode.addEventListener('keydown', pinKeyDown);
        pinCode.addEventListener('keypress', pinKeyPress);
    }

    window.modal = document.querySelector("#modal");  
    if(window.modal) window.modal.onclick = modalClick;
    
    const modalCloseBtn = document.querySelector("#modal-close");  
    if(modalCloseBtn) modalCloseBtn.onclick = modalCloseBtnClick;
                    
});

function modalCloseBtnClick(e) {
    window.modal.style.display = 'none';
}
function modalClick(e) {
    e.stopPropagation();
}

function pinKeyDown(e) {
    if(e.keyCode < 48 || e.keyCode > 57) {
        console.log('ignored', e.key);
        e.preventDefault();
        return false;
    }
}
function pinKeyPress(e) {
    // legacy - події - події, що виникають у наслідок інших подій
    // keydown - keyup --> keypress(legacy)
    // такі події фільтруються і не виникають за певних умов, наприклад, для 
    // службових кнопок (<- -> DEL, тощо)
    console.log('keypress', e);
}

function block3Click(e) {
    const block4 = document.querySelector("#block-4");
    block4.style.left = e.offsetX - block4.clientWidth / 2 + 'px';
    block4.style.top = e.offsetY - block4.clientHeight / 2 + 'px';
    block4.style['background-color'] = '#7788' + Math.round(Math.random() * 100);
    console.log(e);
}

function block1Click(e) {
    console.log("Block 1 clicked");
    // console.log(e.target);
    const b1 = e.target                  // closest - відтворює рух події (bubbling)  
        .closest('[data-product-id]');   // і зупиняється на елементі, що відповідає селектору                 
    const productId = b1.getAttribute('data-product-id');
    console.log(productId);
}

function block2Click(e) {
    console.log("Block 2 clicked");
    // console.log(e);
    // e.stopPropagation();
}