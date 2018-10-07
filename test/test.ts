import {
    adDispatcher,
    IAdEvent
} from './../src/ad-dispatcher';

adDispatcher.registerToAdEvents((evt) => {
    console.log('callback', evt);
});

adDispatcher.adEvents$
    .subscribe((evt: IAdEvent) => {
        console.log('stream', evt);
    });