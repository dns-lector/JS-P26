document.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = validateForm(e.target);
    if(!data) return;
    window.phoneBook.push(data);
    showPhones();
    e.target.reset();
    // console.log("Submit cancelled");
});

function validateForm(form) {
    let nameInput = form.querySelector('[name="username"]');
    let name = nameInput.value;
    if(!name) {
        nameInput.classList.add("is-invalid");
        nameInput.parentNode.querySelector(".invalid-feedback").innerText = 
            "Заповніть дане поле";
        return false;
    }
    // регулярні вирази: обмежуються слешами (/), після останнього 
    // слешу - опціонально "флаги" /\d+/g
    // або через конструктор об'єкту  new RegExp("\d+", "g")
    // Joe, Joe Dow, Joe Dow Abu, Joe o'Dow, d'Alamber,
    const cyrPattern = /^[А-ЯЄЇІҐ][а-яєїіґ']+([-\s][А-ЯЄЇІҐ][а-яєїіґ']+)*$/;
    const latPattern = /^([od]')?[A-Z][a-z]+(\s([od]')?[A-Z][a-z]+)*$/;
    if(!(cyrPattern.test(name) || latPattern.test(name))) {
        setInvalid(nameInput,
             "Ім'я має починатись з великої літери та продовжуватись малими");
        return false;
    }
    const emailInput = form.querySelector('[name="useremail"]');
    let email = emailInput.value;
    const emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(!emailPattern.test(email)) {
        setInvalid(emailInput, "E-mail не відповідає правилам");
        return false;
    }  // +38(098)7654321

    let phone = form.querySelector('[name="userphone"]').value;
    let type  = form.querySelector('[name="phone-type"]').value;
    return {
        "name": name,    
        "email": email, 
        "phone": phone, 
        "type": type
    };
}

function setInvalid(input, message) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    input.parentNode.querySelector(".invalid-feedback").innerText = message;
}

function inputKeyPressed(e) {
    e.target.classList.remove('is-invalid');
    e.target.classList.remove('is-valid');
}

document.addEventListener('DOMContentLoaded', () => {
    for(let ctr of document.querySelectorAll("form .form-control")) {
        ctr.onkeypress = inputKeyPressed;
        ctr.onchange = inputKeyPressed;
    }

    window.phoneBook = [
        {"name": "Петрович",    "email": "p@i.ua", "phone":"123", "type": "cellular"},
        {"name": "Олексійович", "email": "o@i.ua", "phone":"345", "type": "work"},
        {"name": "Семенович",   "email": "s@i.ua", "phone":"567", "type": "cellular"}
    ];
    showPhones();
    const btnGo = document.getElementById("vars-btn");
    if(!btnGo) throw "#vars-btn not found";
    btnGo.onclick = btnGoClick;
});

function btnGoClick() {
    const vars = document.querySelectorAll('.vars-box:checked');
    alert("Selected " + [...vars.values().map(v => v.id)].join(','));

    const rate = document.querySelector('.rate:checked');
    if(rate) {
        alert("Оцінка " + rate.id);
    }
    else {
        alert("Оцінки немає");
    }
}

function showPhones() {
    const container = document.getElementById("phones");
    if(!container) throw "#Phones not found";
    container.innerHTML = "";
    for(let phone of window.phoneBook) {
        const item = document.createElement('div');
        item.innerHTML = `name: ${phone.name}, email: ${phone.email}, phone: ${phone.phone}, type: ${phone.type}`;
        container.appendChild(item);
    }
}