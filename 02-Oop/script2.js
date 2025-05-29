// OOP
// якщо скріпт оголошує глобальні змінні, то вони доступні
// і в інших скріптах
const _console2 = document.getElementById("console2");
if(!_console2) throw "Element #console2 not found";

// У JavaScript діє прототипний принцип
// Оскільки типізація динамічна, класи як типи даних не фіксуються
// Клас слід  розуміти як прототип, початковий стан об'єкта
// Подальший код може змінити склад об'єкта як у бік збільшення,
// так і зменшення. Аналогічний принцип у Python, PHP
var obj = {};   // {} - конструктор об'єкту ~ new Object()
obj.a = 10;     // звертаємось до неіснуючого поля - створюємо його
_console2.innerHTML += `obj.a = ${obj.a}<br/>`;

// JSON - JavaScript Object Notation
var obj2 = {
    x: 10,
    y: 20,
    str: "The String",
    arr: [1,2,3,4,5],
    "cond": true,
    "nested": {
        a: 30,
        b: 40
    },
    // ----- понад JSON
    // named functional expression
    fun1: function self() {_console2.innerHTML += `fun1 ${self.c}<br/>`}
};
obj2.w = "123";
obj2.fun2 = () => {  
    // пізнє зв'язування - obj2.fun1.c пишемо раніше, ніж створюємо
    _console2.innerHTML += `fun2 ${obj2.fun1.c}<br/>`
    // дані будуть підставлені у момент виконання функції, а не оголошення
};
delete obj2.x;     // видалення поля
obj2.fun1.c = 10;  // об'єктом є все і навіть функції
obj2.fun2();
obj2.fun1();
_console2.innerHTML += `-------<br/>`;
// для того щоб дізнатись склад об'єкту вживається цикл for-in
for(let field in obj2) {
    if( typeof obj2[field] == 'object' ) {

    }
    else {
        // field - string з вмістом імені поля
        _console2.innerHTML += `obj2.${field} = ${obj2[field]}<br/>`;
        // доступ до полів об'єктів можливий як за допомогою "."
        // obj.x, так і "[]": obj["x"], тільки ім'я поля - string
    }
}

var points = [
    {x:10, y:20},
    {x:11, y:21},
    {x:12, y:22},
];