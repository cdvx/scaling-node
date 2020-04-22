const { spawn } = require('child_process');

// const child = spawn('find', ['.','-type', 'f']);

// child.stdout.on('data', data=> {
//     console.log(`child stdout: ${data}`)
// })

// child.stderr.on('data', data=> {
//     console.log(`child stderr: ${data}`)
// })

// child.on('exit', (code, signal)=> {
//     console.log(`child process exited with code ${code}, signal ${signal}`)
// })

// other events on child:
// disconnect, error, message, close
// stdio objects: child.stdin, child.stdout, child.stderr

// Unlike in the normal streams, in a child stream the stdout and stderr streams 
// are readable and stdin is the writable one

// const child = spawn('find', ['.','-type', 'f'], {
//     stdio: 'inherit'
// })

const child = spawn('find . -type f | wc -l', {
    stdio: 'inherit',
    shell: true, //to use shell syntax n not buffer the data
    cwd: '/Users/cdvx/Downloads', // change cwd
    env: {ANSWER: 42} // override parrent process env object
})