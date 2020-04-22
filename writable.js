const { Writable } =  require('stream');

const outStream = new Writable({
    // simple echo stream, echos back everything
    write(chunk, encoding, callback){
        console.log(chunk.toString())
        callback();
    }
})

// process.stdin.pipe(outStream) // same as piping to stdout
process.stdin.pipe(process.stdout)