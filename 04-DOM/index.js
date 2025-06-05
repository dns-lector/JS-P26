document.addEventListener('DOMContentLoaded', () => {
    const appendTaskButton = document.getElementById('append-task');
    if(!appendTaskButton) throw "append-task not found";
    appendTaskButton.addEventListener('click', appendTaskClick);

    const printTaskButton = document.getElementById('print-task');
    if(!printTaskButton) throw "print-task not found";
    printTaskButton.addEventListener('click', printTaskClick);

    const todoList = document.getElementById('todo-list');
    if(!todoList) throw "todo-list not found";
    window.todoList = todoList;

    updateClickListeners();
});

function updateClickListeners() {
    for(let btn of document.querySelectorAll('[data-action="insert"]') ) {
        btn.onclick = insertButtonClick;
    }
    for(let btn of document.querySelectorAll('[data-action="delete"]') ) {
        btn.onclick = deleteButtonClick;
    }
}

function deleteButtonClick(e) {
    if(window.todoList.children.length == 1) {
        alert("Неможна видалити останню задачу");
        return;
    }
    const li = e.target.closest('li');
    window.todoList.removeChild(li);
}

function insertButtonClick(e) {
    // замість створення на налаштування можно використати клонування
    const li = e.target.closest('li');  // зразок - елемет LI на якому був клік
    const task = li.cloneNode(true);
    // змінюємо надпис
    // task.innerText = "New task";  // видаляє внутрішню структуру
    task.firstElementChild.innerText = "New task";
    // додаємо до ДОМ
    window.todoList.insertBefore(task, li);
    updateClickListeners();
}

function printTaskClick() {
    const todoList = document.getElementById('todo-list');
    if(!todoList) throw "todo-list not found";

    // перебираємо всі дочірні елементи UL, вилучаємо з них текст і
    // формуємо представлення "для друку"
    var txt = "";
    for(let li of todoList.children) {
        txt += li.innerText + '\r\n';
    }
    // створюємо блок-аркуш, виводимо на нього текст
    const sheet = document.createElement('div');
    sheet.style.border = "1px solid lightgray";
    sheet.style.margin = "10px";
    sheet.style.padding = "10px";
    sheet.style['box-shadow'] = "5px 5px 3px #ddd";
    sheet.innerText = txt;
    document.body.appendChild(sheet);
    console.log(txt);
}

function appendTaskClick() {
    const todoList = document.getElementById('todo-list');
    if(!todoList) throw "todo-list not found";

    // створюємо елемент як об'єкт
    const task = document.createElement('li');
    // заповнюємо елемент
    task.innerText = "New task";
    // додаємо до ДОМ
    todoList.appendChild(task);
}