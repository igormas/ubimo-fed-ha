import { AdEmitter } from './../src/index';

const emitter = new AdEmitter();

emitter.registerToAdEvents((evt) => {
    console.log('callback', evt);
});

emitter.adEmitter$
    .subscribe((evt) => {
        console.log('stream', evt);
    });