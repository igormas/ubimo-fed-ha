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
    private firebaseApp = initFirebase();

    constructor() {
        this.startEmissions();
        firebase.storage().ref().getMetadata().then((res) => {
            debugger;
        });
        debugger;
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
            const randomDelay = Math.round(Math.random() * 5000);
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