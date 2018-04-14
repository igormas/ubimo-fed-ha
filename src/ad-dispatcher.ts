import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/delay';

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

const VIDEOS_CREATIVES: ICreative[] = [
    {
        name: 'Baby me',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/videos%2Fbaby_me.mp4?alt=media&token=a147d2bb-32dd-4e6e-9b06-08c425f772b7'
    },
    {
        name: 'Bud.TV',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/videos%2Fbud-tv.mp4?alt=media&token=28e72095-13da-416e-b13c-4f5cbbfee6d9'
    },
    {
        name: 'Captain Morgan',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/videos%2Fcaptain_morgan.mp4?alt=media&token=f5678986-7e10-42d4-89d8-c54d394836c9'
    }, {
        name: 'Crazy kid',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/videos%2Fcrazy_kid.mp4?alt=media&token=b916272b-8b74-485e-bb42-e150e5d91a11'
    }, {
        name: 'Ikea',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/videos%2Fikea.mp4?alt=media&token=512402b7-07ca-4059-93c2-4256b6adcebe'
    }, {
        name: 'Shopping',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/videos%2Fshopping.mp4?alt=media&token=7c42c66a-b676-43f5-9714-ef98096e7253'
    }, {
        name: 'Yes Iran',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/videos%2Fyes_iran.mp4?alt=media&token=2ba43a2b-e077-4c9c-9930-84e8c63c8c6c'
    }, {
        name: 'Yes Russian mafia',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/videos%2Fyes_russian_mafia.mp4?alt=media&token=0c2b2c21-a960-4440-8722-83a19afeef07'
    }
];

function raffleCreative(creativesArr: ICreative[]): ICreative {
    const randomImageCreativeIndex = Math.floor(Math.random() * creativesArr.length);
    return creativesArr.splice(randomImageCreativeIndex, 1)[0];
}

export class AdDispatcher {
    private _adDispatcher$ = new Subject<IAdEvent>();
    private imagesCreatives: ICreative[] = [];
    private videoCreatives: ICreative[] = [];

    constructor() {
        this.startEmissions();
    }

    private getRandomAd(): IAdEvent {
        let type: IAdEvent['type'] = Math.random() > 0.5 ? 'IMAGE' : 'VIDEO';
        let creative: ICreative;

        if (type === 'IMAGE') {
            if (!this.imagesCreatives.length) {
                this.imagesCreatives = [...IMAGE_CREATIVES];
            }
            creative = raffleCreative(this.imagesCreatives);
        } else {
            if (!this.videoCreatives.length) {
                this.videoCreatives = [...VIDEOS_CREATIVES];
            }
            creative = raffleCreative(this.videoCreatives);
        }

        return {
            type,
            creative
        };
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