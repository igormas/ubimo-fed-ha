import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/delay';
import * as firebase from 'firebase';

export interface ICreative {
    name: string;
    url: string;
}

export interface IAdEvent {
    type: 'IMAGE' | 'VIDEO';
    creative: ICreative;
}

const IMAGE_CREATIVES: ICreative [] = [
    {
        name: 'Amstel',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/images%2Famstel.jpg?alt=media&token=24041706-53fd-438f-9769-610084c446e9'
    }, {
        name: 'At&t',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/images%2Fat%26t.jpg?alt=media&token=f29d0c7b-acb9-4625-bc2d-1306b3d4a285'
    }, {
        name: 'Heinz',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/images%2Fheinz.jpg?alt=media&token=1557704e-7666-4ace-83cb-8367e2d16d84'
    },
    {
        name: 'Hellmanns',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/images%2Fhellmanns.jpg?alt=media&token=707800b5-5f4e-436c-8aad-72a17b945994'
    }, {
        name: 'Hubspot',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/images%2Fhubspot.jpg?alt=media&token=2a33ef53-6b67-4002-a96d-9ff2341bd694'
    }, {
        name: 'Lotus',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/images%2Flotus.jpg?alt=media&token=0abd398c-8dae-43e3-b259-822ec0bf7cec'
    }, {
        name: 'Mcdonald\'s',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/images%2Fmcdonalds.jpg?alt=media&token=15676f70-6b23-4a4f-ace3-c97d5517f7d2'
    }, {
        name: 'Super Skunk',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/images%2Fsuper-skunk.jpg?alt=media&token=dd34a431-c156-42f1-b40e-45a9d1e55d6f'
    }
];

function initFirebase(): void {

    if (firebase.apps.length) {
        return;
    }

    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyDO5Xn5hJmsHPbxN5hV_Ys3ARx3Pvqbhxs",
        authDomain: "ubimo-home-assignment.firebaseapp.com",
        databaseURL: "https://ubimo-home-assignment.firebaseio.com",
        storageBucket: "ubimo-home-assignment.appspot.com",
    };
    firebase.initializeApp(config);

}

export class AdDispatcher {
    private _adDispatcher$ = new Subject<IAdEvent>();

    constructor() {
        this.startEmissions();
    }

    private getRandomAd(): IAdEvent {
        const isRandomImage = Math.random() > 0.5;

        if (true || isRandomImage) { // todo
            const randomImageCreativeIndex = Math.floor(Math.random() * IMAGE_CREATIVES.length);
            const randomImageCreative = IMAGE_CREATIVES[randomImageCreativeIndex];
            return {
                type: 'IMAGE',
                creative: randomImageCreative
            };
        }
    }

    private startEmissions(): void {
        of(null).expand(() => {
            const randomDelay = 3000 + Math.round(Math.random() * 5000);
            return of(this.getRandomAd())
                .delay(randomDelay);
        })
            .subscribe((adEvent) => {
                this._adDispatcher$.next(adEvent);
            });
    }

    get adDispatcher$(): Observable<IAdEvent> {
        return this._adDispatcher$.asObservable();
    }

    registerToAdEvents(cb: (adEvent: IAdEvent) => void): { removeListener: () => void } {
        const sub = this.adDispatcher$
            .subscribe((evt) => {
                cb(evt);
            });

        return {
            removeListener: () => {
                sub.unsubscribe();
            }
        };
    }
}

export const adDispatcher = new AdDispatcher();