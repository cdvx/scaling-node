const http = require('http');

const { fork } = require('child_process');


// optimisation to stop blocking code 
// for http request, move code to own file
// `compute.js`

// const longComputation = () => {
//     let sum = 0;
//     for (let i = 0; i < 1e9; i++){
//         sum += 1;
//     };
//     return sum;
// }

const server = http.createServer();

server.on('request', (req, res) => {
    if(req.url === '/compute'){
        // const sum = longComputation();
        // return res.end(`Sum is ${sum}`);
        // loadbalancing the request
        const compute = fork('compute.js');
        compute.send('start');
        compute.on('message', ({ sum })=> {
            return res.end(`Sum is ${sum}`);
        })
    } else {
        res.end('Ok')
    }
});

server.listen(3000);