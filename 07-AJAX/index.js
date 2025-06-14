document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById("pause-btn");
    if(!btn) throw "pause-btn not found";
    btn.addEventListener('click', pauseButtonClick);

    const btn2 = document.getElementById("sequence-btn");
    if(!btn2) throw "sequence-btn not found";
    btn2.addEventListener('click', sequenceButtonClick);
});

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