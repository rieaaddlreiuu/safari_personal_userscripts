function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve()
        }, ms)
    })
}
async function cyclicExecute(interval, exec_function) {
    while (1) {
        await sleep(interval);
        exec_function();
    }
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateRandomSequence(length) {
    let sequence = [];
    for (let i = 0; i < length; i++) {
        sequence.push(i);
    }
    let work, index;
    for (let i = 0; i < length; i++) {
        //swap i,random(0,length - 1)
        work = sequence[i];
        index = random(0, length - 1);
        sequence[i] = sequence[index];
        sequence[index] = work;
    }
    return sequence
}