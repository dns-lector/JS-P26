window.addEventListener('hashchange', () => {
    selectPage();
});

document.addEventListener('DOMContentLoaded', () => {
    selectPage();
});

function selectPage() {
    const route = window.location.hash.split('/');
    switch(route[0]) {
        case '':
        case '#home': homePage(); break;
        case '#rate': ratePage(route[1]); break;
        default: notFoundPage();
    };
}
function ratePage(cc) {
    document.getElementById('main-block').innerHTML = cc;
}

function notFoundPage() {
    document.getElementById('main-block').innerHTML = "Not Found";
}

function homePage() {
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then(r => r.json())
    .then(j => {
        let table = "<table class='table table-striped table-dark'><thead><tr><th>Код</th><th>Назва</th><th>Курс (₴)</th></tr></thead><tbody>";
        for(let r of j) {
            table += `<tr data-cc="${r.cc}"><td>${r.cc}</td><td>${r.txt}</td><td>${r.rate}</td></tr>`;
        }
        table += "</tbody></table>";
        const mainBlock = document.getElementById('main-block');
        mainBlock.innerHTML = table;
        for(let e of mainBlock.querySelectorAll('[data-cc]')) {
            e.onclick = rateClick;
        }
    });
}
function rateClick(e) {
    const cc = e.target.closest('[data-cc]').getAttribute('data-cc');
    console.log(cc);
    window.location.hash = "#rate/" + cc;
}