const longComputation = () => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++){
        sum += 1;
    };
    return sum;
}

process.on('message', msg => {
    if (msg === 'start'){
        let sum  = longComputation()
        process.send({ sum })
    }
})