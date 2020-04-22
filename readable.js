const { Readable } =  require('stream');

// const inStream = new Readable();

// inStream.push('ABCDEFFFFF');
// inStream.push(null);


const inStream = new Readable({
    read(size){
        setTimeout(()=>{
            this.push(String.fromCharCode(this.curentCharCode++));
            if (this.curentCharCode > 90){
                this.push(null)
        }
        }, 100)
        
    }
})

inStream.curentCharCode = 65;

inStream.pipe(process.stdout);

process.on('exit', ()=> {
    console.error(
        `\n\ncurrentCharCode is ${inStream.curentCharCode}`
    )
})

process.stdout.on('error', process.exit())
