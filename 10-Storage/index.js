const authContent = `<button id="exit-button" class="btn btn-danger">Вихід з системи</button>`;
const anonContent = `<button id="auth-button" class="btn btn-primary">Вхід до системи</button>`;

document.addEventListener('DOMContentLoaded', () => {
    updateAuthBlock();
});

function updateAuthBlock() {
    const authBlock = document.getElementById('auth-block');
    if(!authBlock) throw "auth-block not found";
    const token = window.localStorage.getItem('token');
    if(token) {
        // const payload = JSON.parse( window.atob(token.split('.')[1]) ) ;
        const payload = JSON.parse( decodeURIComponent( encodeURIComponent(window.atob(token.split('.')[1])))) ;
        console.log(payload);
        authBlock.innerHTML = authContent;
    }
    else {
        authBlock.innerHTML = anonContent;
    }
    updateListeners();
}

function updateListeners() {
    const authBtn = document.getElementById('auth-button');
    if(authBtn) {
        authBtn.onclick = authBtnClick;
    }
    const exitBtn = document.getElementById('exit-button');
    if(exitBtn) {
        exitBtn.onclick = exitBtnClick;
    }
}

function exitBtnClick() {
    window.localStorage.removeItem('token');
    updateAuthBlock();
}

function authBtnClick() {
    authenticate()
    .then(token => {
        window.localStorage.setItem('token', token);
        updateAuthBlock();
    });
}

function authenticate() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBenVyZVB2MzExIiwic3ViIjoiMzJkMGY2MDItOGZmZS00NmM2LWEwZDItYzU5ZGY1ZDllZDQ1IiwiYXVkIjoiU2VsZlJlZ2lzdGVyZWQiLCJpYXQiOjE3NTA3NzcyODIzLCJleHAiOjE3NTA3NzczMTIzLCJuaWQiOiJqYyIsIm5hbSI6ItCf0LXRgNGC0LjQutGDINCfJ9GP0YLQvtGH0LrRltC9In0=.86eAgeEcQBQGsoBj4ubFoFTINLDEt4UEK9R4k0A5pjY";
    return new Promise(
        (resolve,reject) => setTimeout(resolve(token), 600)
    );
}