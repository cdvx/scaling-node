const cluster = require('cluster');

const os = require('os');

// **** Mock DB Call
const numberOfusersInDB = () => {
    this.count = this.count || 5
    this.count = this.count * this.count
    return this.count;
};
// ****

if (cluster.isMaster){
    const cpus = os.cpus().length;

    console.log(`Forking for ${cpus} CPUs`);
    for (let i=0; i<cpus; i++){
        cluster.fork();
    }

    console.log(`Master PID: ${process.pid}`)

    // const upDateWorkers = () => {
    //     const usersCount = numberOfusersInDB()
    //     Object.values(cluster.workers).forEach(worker => {
    //         worker.send({ usersCount })
    //     })
    // }

    cluster.on('exit', (worker, code, signal)=> {
        if (code !== 0 && !worker.exitedAfterDisconnect){
            console.log(`Worker ${worker.id} crashed. Starting a new worker...`);
            cluster.fork();
        }
    })

    // can trigger master to restart using a signal
    // eg: $ kill -SIGUSR2 PID
    // make master listen to signal
    process.on('SIGUSR2', () => {
        const workers = Object.values(cluster.workers);
        const restartWorker = workerIndex => {
            const worker = workers[workerIndex]
            if (!worker) return;

            worker.on('exit', () => {
                if(!worker.exitedAfterDisconnect) return;
                console.log(`Exited process ${worker.process.pid}`);
                cluster.fork().on('listening', ()=> {
                    restartWorker(workerIndex+1);
                });
            });
            worker.disconnect();
        };
        restartWorker(0);
    })

    

    // upDateWorkers();
    // setInterval(upDateWorkers, 10000)

    // console.dir(cluster.workers, { depth: 0});
    // broadcast messages to workers
    // Object.values(cluster.workers).forEach(worker => {
    //     worker.send(`Hello Worker ${worker.id}`)
    // })
} else {
    // os.isWorker   
    require('./server.js')
}

// apache benchmark server

// --------------------- results without forking ------------------------
// This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
// Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
// Licensed to The Apache Software Foundation, http://www.apache.org/

// Benchmarking localhost (be patient)
// Finished 2137 requests


// Server Software:        
// Server Hostname:        localhost
// Server Port:            8080

// Document Path:          /
// Document Length:        24 bytes

// Concurrency Level:      200
// Time taken for tests:   10.004 seconds
// Complete requests:      2137
// Failed requests:        0
// Total transferred:      212355 bytes
// HTML transferred:       51480 bytes
// Requests per second:    213.61 [#/sec] (mean)
// Time per request:       936.299 [ms] (mean)
// Time per request:       4.681 [ms] (mean, across all concurrent requests)
// Transfer rate:          20.73 [Kbytes/sec] received

// Connection Times (ms)
//               min  mean[+/-sd] median   max
// Connect:        0    4  13.7      0      93
// Processing:    79  889 187.0    951    1199
// Waiting:       40  821 228.3    914    1156
// Total:         79  893 185.0    953    1199

// Percentage of the requests served within a certain time (ms)
//   50%    953
//   66%    984
//   75%   1006
//   80%   1021
//   90%   1068
//   95%   1122
//   98%   1148
//   99%   1164
//  100%   1199 (longest request)