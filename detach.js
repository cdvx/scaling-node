const { spawn } = require('child_process');

const child = spawn('node', ['timer.js'], {
    detached: true, // detach child process from parent
    stdio: 'ignore'
})


child.unref();



