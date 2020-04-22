const { exec } = require('child_process');

exec('find . -type f | wc -l', (err, stdout, stderr)=> {
    if (err) {
        console.err(`exec error: ${err}`);
        return;
    }

    console.log(`Number of files ${stdout}`)
})

// execFile executes a file but does not use the shell
// hence more efficient, does not support io redirection
// and file globbing not supported