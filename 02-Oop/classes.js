class MyClass0 { }
class MyClass1 extends MyClass0 {  // оголошення класу
    x = 10;                        // оголошення поля: завжди public
    #y = 20;                       // імена, що починаються з "#" - private
    get y() {                      // оголошення get-тера
        return this.#y;            // Доступ до полів: ОБОВ'ЯЗКОВО через this
    }                              // Методи (у т.ч. get/set) розділюються без ";"
    set y(val) {
        this.#y = val;
    }
    getX() {
        // return x;               // Без this мова іде про глобальні змінні
        return window.x;           // Пряме звернення до об'єкту глобалізації 'window'
    }  
    constructor(a) {               // Конструктор - спец.метод, не за іменем класу
        this.a = a || "A";         // створення додаткового поля
    }                              // Логічний оператор повертає перший елемент,
}                                  // який вирішив умову

const myObj1 = new MyClass1("AA");
const myObj2 = new MyClass1();     // Перевіряємо чи є статичним поле "х"
myObj2.x = 50;                     // змінюючи його значення через інший об'єкт
console.log(myObj1.x);             // Виводить 10, що засвідчує НЕстатичність поля

console.log(myObj1.a, myObj2.a);
// console.log(myObj1.#y);         // блокується як private
myObj1.y = 40;                     // неявний запуск set-тера
console.log(myObj1.y);
try {
    console.log(myObj1.getX());    // помилка: ReferenceError: x is not defined
} 
catch(err) { 
    console.error(err); 
}
window.x = 30;                     // те ж саме, що x = 30;  !! украй не рекомендується 
                                   // лишати x = 30 без зазначення належності до об'єкту
console.log(myObj1.getX());        // 30 -- пізнє зв'язування - обрахунок під час виклику

myObj1.b = "B";                    // Чи можна модифікувати об'єкти після створення?
console.log(myObj1.b);             // Так, поле додається
console.log(myObj2.b);             // У другому - немає

MyClass1.prototype.fun1 = () => {  // [this == window.this] - автоматичний захват
    return "My x = " + this.x;     // Лексичний (лексикографічний) окіл функції (scope)                          
}                                  // це область видності змінних (імен, лекзем)    
console.log(myObj1.fun1());        // C++: (x)[scope]{}                              
console.log(myObj2.fun1());        // У цей окіл копіюються змінні, які не будуть видні
                                   // у тілі функції, але видні при її оголошенні

MyClass1.prototype.fun2 = function() {
    return "My x = " + this.x;     // Різниця у стрілковій та function деклараціях, зокрема,
}                                  // полягає у тому, що стрілкова автоматично формує
console.log(myObj1.fun2());        // scope, а function - ні
console.log(myObj2.fun2());        // Іншими словами проводиться аналіз усіх змінних 
                                   // у тілі функції і ті, які не належать тілу функції
                                   // копіюються у scope
/*
    funs = [];
    for(i){ funs[i] = () => {print(i)} }

    funs[0]
    пізнє зв'язування -- дані на момент виконання -- яке значення матиме "і"?
    Або останнє по циклу, або взагалі ніяке, якщо "і" локальна у циклі.

    for(i){ funs[i] = () =>[enclosure "і"]=> {print(i)} }
    Якщо "і" поміщене у лексичний окіл (захоплене, enclosured), 
    то тіло функції звертається не до глобальної області, а саме до околу.

    for(i){ funs[i] = function()[enclosure nothing]{print(i)} }
*/

class Component1 {   // клас-компонент для "картки" товару у магазині
    name;
    price;
    rating;
    constructor(name,price,rating) {
        this.name = name || "Без назви";
        this.price = price || "Не вказано";
        this.rating = rating || 0;
    }
    toHtml() {
        return (
        `<div class="product">
            <h3>${this.name}</h3>
            <h4>Ціна: ${this.price}</h4>
            <h5>Оцінка: ${this.rating}</h5>
        </div>`);
    }
}

const products = [ 
    new Component1("Олівець", 14.50, 5),
    new Component1("Ручка",   19.50, 4),
    new Component1("Ластик",  9.50,  3),  // ★★★☆☆
    new Component1("Зошит",   14.50),
];

const container = document.getElementById("container");
if(!container) throw "#container not found";
for(let product of products) {
    container.innerHTML += product.toHtml();
}