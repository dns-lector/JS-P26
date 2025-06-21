document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById("pause-btn");
    if(!btn) throw "pause-btn not found";
    btn.addEventListener('click', pauseButtonClick);

    const btn2 = document.getElementById("sequence-btn");
    if(!btn2) throw "sequence-btn not found";
    btn2.addEventListener('click', sequenceButtonClick);

    const btnRates = document.getElementById("load-rates");
    if(!btnRates) throw "load-rates not found";
    btnRates.addEventListener('click', ratesButtonClick);

    const searchRate = document.getElementById("search-rate");
    if(!searchRate) throw "search-rate not found";
    searchRate.addEventListener('input', searchKeypress);

    const loadMoon = document.getElementById("load-moon-phase");
    if(!loadMoon) throw "load-moon-phase not found";
    loadMoon.addEventListener('click', moonClick);
});

function moonClick() {
    fetch("https://www.icalendar37.net/lunar/api/?year=2025&month=6&shadeColor=gray&size=150&texturize=true&day=10")
    .then(r => r.json())
    .then(j => {
        const div = document.getElementById("moon-phase");
        div.innerHTML = j.phase["17"].svg;
    });
}

function searchKeypress(e) {
    if(!window.nbuRates) return;

    let fragment = e.target.value;
    if(fragment.length > 0) {
        showRates(window.nbuRates.filter(r => 
            r.cc.includes(fragment) || r.txt.includes(fragment)));
    }
    else {
        showRates(window.nbuRates);
    }
}


function ratesButtonClick() {
    const rates = document.getElementById("rates");
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then(r => {
        if(r.ok) {            
            return r.json();
        }
        else {
            rates.innerHTML = `<div class="alert alert-danger" role="alert">Запит до сайту завершився помилкою ${r.status} </div>`;
        }
    })
    .then(j => {
        window.nbuRates = j;
        showRates(j);
    });
}

function showRates(j) {
    const table = document.createElement('table');
    // class="table table-success table-striped"
    table.classList.add("table", "table-success", "table-striped");
    const thead = document.createElement('thead');
    var line = document.createElement('tr');
    var cell = document.createElement('th');
    cell.innerText = "Code";
    line.appendChild(cell);
    cell = document.createElement('th'); cell.innerText = "Short"; line.appendChild(cell);
    cell = document.createElement('th'); cell.innerText = "Full"; line.appendChild(cell);
    cell = document.createElement('th'); cell.innerText = "Rate"; line.appendChild(cell);
    thead.appendChild(line);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    for(let rate of j) {
        line = document.createElement('tr');
        cell = document.createElement('td'); cell.innerText = rate.r030; line.appendChild(cell);
        cell = document.createElement('td'); cell.innerText = rate.cc;   line.appendChild(cell);
        cell = document.createElement('td'); cell.innerText = rate.txt;  line.appendChild(cell);
        cell = document.createElement('td'); cell.innerText = rate.rate; line.appendChild(cell);
        tbody.appendChild(line);
    }
    table.appendChild(tbody);
    const rates = document.getElementById("rates");
    rates.innerHTML = "";
    rates.appendChild(table);
}

async function sequenceButtonClick() {
    // pause(1000)
    // .then(() => { console.log(1); return pause(1000); })   // результат, повернутий одним .then
    // .then(() => { console.log(2); return pause(1000); })   // передається у наступний
    // .then(() => { console.log(3); });
    await pause(1000); console.log(1);
    await pause(1000); console.log(2);
    await pause(1000); console.log(3);
}

function pause(ms) {
    return new Promise(               // Promise - інструмент асинхронності.
        (resolve, reject) => {        // Завдання приймає два параметри-callbalcks
            setTimeout(               // За результатами роботи Promise має викликати
                () => resolve(ms),    // один з них: resolve() - як успішне завершення,
                ms                    // reject - як проблему.
            );
        }
    );
}

async function pauseAsync(ms) {        // async - синтаксичний "цукор" для new Promise
    return await pause(ms);            // await - для .then
}                                      // 

async function pauseButtonClick() {
    // pause(1500)                     // Виклик Promise-функцій розгалужує роботу на 
    // .then(                          // .then, у який передається аргумент resolve()
    //     (ms) => console.log(ms)
    // )
    // .catch(                         // та .catch, у який передається reject()
    //     (err) => console.error(err)
    // );

    // console.log( await pause(1500) );

    console.log( await pauseAsync(1500) );
}