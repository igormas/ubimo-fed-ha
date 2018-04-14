import { AdDispatcher } from './../src/ad-dispatcher';

const dispatcher = new AdDispatcher();

dispatcher.registerToAdEvents((evt) => {
    console.log('callback', evt);
});

dispatcher.adDispatcher$
    .subscribe((evt) => {
        console.log('stream', evt);
    });