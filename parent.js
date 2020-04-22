// variation on the spawn function for spawning processes

// diff: fork -> comms channel is extablished to the child process 
// when using fork, can use send method on fork process and global 
// process to exchange messages between child and parent in manner 
// similar to events


const { fork } = require('child_process');

const forked = fork('child.js');

forked.on('message', msg => {
    console.log('Message from child', msg);
});

forked.send({ hello: 'world'})

