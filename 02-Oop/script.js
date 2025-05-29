const _console = document.getElementById("console");
if(!_console) throw "Element #console not found";
// Принцип hoisting - підняття коду (оголошень) - 
// оголошення фукнцій та змінних за допомогою var
// піднімаються до верху блоку локалізації (тіла 
// функції або скрипту)
fun1();  // відповідно, функцію можна викликати ДО її оголошення
function fun1() {  
    _console.innerHTML += "fun1 works<br/>";
    fun2();  // те ж саме і про взаємний виклик функцій
}
function fun2() {
    _console.innerHTML += "fun2 works<br/>";
    fun3(1);   // кількість аргументів та параметрів може відрізнятись
    _console.innerHTML += "----<br/>";
    fun3(1,2,3,4);   // у т.ч. аргументів може бути більше
    _console.innerHTML += "----<br/>";
    _console.innerHTML += sum(1,2,3,'4',5) + "<br/>";
    // fun4();   // підняття працює тільки для оголошення, але не
    // для присвоювання. До цього змінна є, а значення немає
}
// передача аргументів, параметри
function fun3(a, b, c) {
    _console.innerHTML += `a: ${typeof a}<br/>`;
    _console.innerHTML += `b: ${typeof b}<br/>`;
    _console.innerHTML += `c: ${typeof c}<br/>`;
    _console.innerHTML += `args: ${arguments.length}<br/>`;
}
function sum() {
    res = 0;
    for(let arg of arguments) {
        res += arg;
    }
    return res;
}
// functional expression
var fun4 = function() {
    _console.innerHTML += "fun4 works<br/>";
}
fun4();
// arrow functional expression (анонімні функції)
const fun5 = () => _console.innerHTML += "fun5 works<br/>";
// оголошення const не підіймається, звернення тільки після коду
fun5();
// IIFE - Immediately Invoked Functional Expression
// нотації миттєвого виклику - економія ресурсів для одноразових ф.
(function() {
    _console.innerHTML += "IIFE works<br/>";
})();