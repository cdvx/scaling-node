const http = require('http');
const pid = process.pid;


let usersCount;
http.createServer((req, res)=> {
    for (let i=0; i<1e7; i++); // simulate CPU work
    res.write(`Handled by process ${pid}\n`);
    res.end(`Users: ${usersCount}`);
}).listen(8080, ()=>{
    console.log(`Started process ${pid}`)
})


// setTimeout(()=> {
//     process.exit(1) // death by random timeout
// }, Math.random()*10000);

// process.on('message', msg => {
//     usersCount = msg.usersCount;
// })


// apache benchmark server
// ab -c200 -t10 http://localhost:8080/
// loads 200 concurrent connection for 10s to server


// --------------------- results without forking ------------------------
// This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
// Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
// Licensed to The Apache Software Foundation, http://www.apache.org/

// Benchmarking localhost (be patient)
// Finished 1663 requests


// Server Software:        
// Server Hostname:        localhost
// Server Port:            8080

// Document Path:          /
// Document Length:        24 bytes

// Concurrency Level:      200
// Time taken for tests:   10.126 seconds
// Complete requests:      1663
// Failed requests:        0
// Total transferred:      174537 bytes
// HTML transferred:       42312 bytes
// Requests per second:    164.23 [#/sec] (mean)
// Time per request:       1217.810 [ms] (mean)
// Time per request:       6.089 [ms] (mean, across all concurrent requests)
// Transfer rate:          16.83 [Kbytes/sec] received

// Connection Times (ms)
//               min  mean[+/-sd] median   max
// Connect:        0    4  17.3      1     115
// Processing:    21 1127 157.8   1157    1462
// Waiting:       15  624 199.0    641    1097
// Total:         21 1131 159.7   1158    1463

// Percentage of the requests served within a certain time (ms)
//   50%   1158
//   66%   1211
//   75%   1254
//   80%   1267
//   90%   1316
//   95%   1333
//   98%   1463
//   99%   1463
//  100%   1463 (longest request)
// cdvx@💥.ssh$ ab -c200 -t10 http://localhost:8080/
// This is ApacheBench, Version 2.3 <$Revision: 1826891 $>
// Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
// Licensed to The Apache Software Foundation, http://www.apache.org/

// Benchmarking localhost (be patient)
// apr_socket_recv: Connection reset by peer (54)
// Total of 201 requests completed

