document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('buttons-container');
    if(!container) throw "#buttons-container not found";
    // for(i = 1; i < 10; i++) {                        // i без операторів (let, var) -
    //     var btn = document.createElement('button');  // глобальна змінна window.i
    //     btn.innerText = i;                           // 
    //     btn.onclick = function() { alert(i); };      // Пізнє зв'язування - визначення
    //     container.appendChild(btn);                  // величини "і" в момент виклику
    // }                                                // window.i = 10 (кінець циклу)
    
    // for(i = 1; i < 10; i++) {
    //     var btn = document.createElement('button'); 
    //     btn.innerText = i;                          
    //     btn.onclick =                                // enclosure
    //     ( function(x) {                              // ефект локалізації області видності
    //         return function() { alert(x); }          // змінної "х" - як параметр функції
    //     } )(i);                                      // вона обмежена тілом функції
    //     container.appendChild(btn);                  // відповідно захоплюється
    // }    
    
    // for(i = 1; i < 10; i++) {
    //     var btn = document.createElement('button');  // Принцип інкапсуляції + динамічне
    //     btn.innerText = i;                           // створення нових полів + функція
    //     btn.onclick = function self() {              // теж є об'єктом.
    //         alert(self.x);                           // btn.onclick.x - створення нового
    //     };                                           // поля у ф-ції btn.onclick
    //     btn.onclick.x = i;                           // А звернення до цього поля - через
    //     container.appendChild(btn);                  // self (named func expression)
    // }    

    for(let i = 1; i < 10; i++) {                    // використання let локалізує циклову 
        var btn = document.createElement('button');  // змінну, а стрілкова декларація ф-цій
        btn.innerText = i;                           // автоматично захоплює все локальне
        btn.onclick = () => alert(i);                //
        container.appendChild(btn);                  //
    }    

    window.field = document.getElementById("field-block");
    if(!window.field) throw "#field-block not found";
    window.ball  = document.getElementById("ball-block" );
    if(!window.ball) throw "#ball-block not found";
    window.ball.vx = -1;
    window.ball.vy = -1;
    moveBall(); 
});

function moveBall() {
    // console.log(window.field.style.width,   // Для визначення розмірів style небажано вживати,
    //     'x', window.field.style.height);    // оскільки значення передаються тільки з inline-стилів
    // console.log(window.field.clientWidth, window.field.offsetWidth);
    // console.log(window.field.clientHeight, window.field.offsetHeight);
    // console.log(window.ball.style.left, window.ball.style.top);
    // console.log(window.ball.offsetLeft, window.ball.offsetTop);
    let posX = Number(window.ball.offsetLeft) + Number(window.ball.vx);
    let posY = Number(window.ball.offsetTop ) + Number(window.ball.vy);
    if(posY <= 0) {
        posY = 0;
        window.ball.vy *= -1;
    }
    if(posX <= 0) {
        posX = 0;
        window.ball.vx *= -1;
    }
    if(posX >= window.field.clientWidth - window.ball.offsetWidth) {
        posX = window.field.clientWidth - window.ball.offsetWidth;
        window.ball.vx *= -1;
    }
    if(posY >= window.field.clientHeight - window.ball.offsetHeight) {
        posY = window.field.clientHeight - window.ball.offsetHeight;
        window.ball.vy *= -1;
    }
    window.ball.style.left = posX + 'px';
    window.ball.style.top = posY + 'px';
    setTimeout(moveBall, 17);
}