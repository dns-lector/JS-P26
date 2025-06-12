document.addEventListener('DOMContentLoaded', () => {
    const fig2 = document.getElementById('fig-2');
    if(!fig2) throw "#fig-2 not found";
    window.dc2 = fig2.getContext('2d');
    showStatistics();

    const fig1 = document.getElementById('fig-1');
    if(!fig1) throw "#fig-1 not found";
    window.dc1 = fig1.getContext('2d');
    /* Контекст пристрою (DC, Device context) - інтерфейс доступу до його графіки - 
       набір методів для зміни його "поверхні": рисування.       
     */
    const drawLineBtn = document.getElementById('draw-line-btn');
    if(drawLineBtn) {
        drawLineBtn.onclick = drawLineBtnClick;
    }
    const drawRectBtn = document.getElementById('draw-rect-btn');
    if(drawRectBtn) {
        drawRectBtn.onclick = drawRectBtnClick;
    }
    const fillRectBtn = document.getElementById('fill-rect-btn');
    if(fillRectBtn) {
        fillRectBtn.onclick = fillRectBtnClick;
    }
    const fullRectBtn = document.getElementById('full-rect-btn');
    if(fullRectBtn) {
        fullRectBtn.onclick = fullRectBtnClick;
    }
    const clearBtn = document.getElementById('clear-btn');
    if(clearBtn) {
        clearBtn.onclick = clearBtnClick;
    }
    const circleBtn = document.getElementById('circle-btn');
    if(circleBtn) {
        circleBtn.onclick = circleBtnClick;
    }
    const halfBtn = document.getElementById('half-btn');
    if(halfBtn) {
        halfBtn.onclick = halfBtnClick;
    }
});

function halfBtnClick() {
    window.dc1.beginPath();
    window.dc1.strokeStyle = "#2233ee";
    window.dc1.strokeWidth = 2;
    window.dc1.arc(30,140,20,0,Math.PI,true );
    window.dc1.stroke();
}

function circleBtnClick() {
    window.dc1.beginPath();
    window.dc1.strokeStyle = "#ee2233";
    window.dc1.strokeWidth = 2;
    window.dc1.arc(30,80,20,0,Math.PI * 2);
    window.dc1.stroke();
}

function clearBtnClick() {
    window.dc1.beginPath();
    window.dc1.clearRect(0,0,300,150);
}

function drawLineBtnClick() {
    window.dc1.strokeStyle = "black";     // Полотно рисує у двох режимах: stroke та fill
    window.dc1.strokeWidth = 2;           // stroke - лінії/контур, fill - заповнення фігури
    window.dc1.moveTo(0,0);               // moveTo - Переміщення без рисування
    window.dc1.lineTo(150,150);           // lineTo - Переміщення з рисуванням
    window.dc1.lineTo(300,0);             // наступна лінія - від попередньої позиції
    window.dc1.stroke();                  // завершення рисування з показом ліній (контурів)
    console.log(window.dc1);              // 
}

function drawRectBtnClick() {
    window.dc1.strokeStyle = "green";  // Зміни вносяться до всієї траєкторії
    window.dc1.strokeWidth = 3;        // та після команди stroke()
    window.dc1.rect(50,10,200,30);     // змінюють і попередні лінії
    window.dc1.stroke();               // 
}

function fillRectBtnClick() {
    window.dc1.beginPath();            // Почати нову траєкторію (відокремитись від попередньої)
    window.dc1.fillStyle = "gold";     // Зміни вносяться до всієї траєкторії
    window.dc1.rect(100,50,100,30);    // змінюють і попередні лінії
    window.dc1.fill();                 // 
}

function fullRectBtnClick() {
    window.dc1.beginPath();            // Необхідний елемент - початок траєкторії
    window.dc1.fillStyle = "lime";     // встановлюємо обидва кольори - 
    window.dc1.strokeStyle = "salmon"; // і заливку і рамку
    window.dc1.rect(200,110,80,30);    // 
    window.dc1.fill();                 // спочатку заповнюємо
    window.dc1.stroke();               // потім рамка (інакше половина рамки заливається)
}

function showStatistics() {
    window.dc2.beginPath();
    window.dc2.clearRect(0,0,300,150);
    const figWidth = 300;
    const maxHeight = 130;
    const stat = getStatistics();
    let n = stat.length;
    let w = figWidth / n * 0.68;
    let W = figWidth / n;
    let offset = (figWidth - w * n) / (n) / 2;
    let maxSold = 2900;
    let k = maxHeight / maxSold;
    for(let i = 0; i < n; i += 1) {
        window.dc2.beginPath();
        window.dc2.fillStyle = "tomato";
        window.dc2.rect(offset + i*W, 140-k*stat[i].sold, w, k*stat[i].sold);
        window.dc2.fill();
        
        window.dc2.beginPath();
        window.dc2.fillStyle = "black";
        window.dc2.fillText(stat[i].sold, W*0.32 + i*W, 140-k*stat[i].sold - 2);
        window.dc2.fill();
    }
    
}

function getStatistics() {
    return [
        { "day": 1, "sold": 2100 },
        { "day": 2, "sold": 2130 },
        { "day": 3, "sold": 2800 },
        { "day": 4, "sold": 2900 },
        { "day": 5, "sold": 2150 },
        { "day": 6, "sold": 2550 },
    ];
}
