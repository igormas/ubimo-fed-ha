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
    coordinates: {
        x: number;
        y: number;
    },
    creative: ICreative;
}

const IMAGE_CREATIVES: ICreative [] = [
    {
        name: 'Bad breath',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/images%2Fbad-breath.jpeg?alt=media&token=3db2a043-49c9-45fb-86e9-f272659d8b35'
    }, {
        name: 'Cepera',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/images%2Fcepera.jpg?alt=media&token=9abbe371-e37b-45f6-b951-a1aadce68f03'
    }, {
        name: 'Eat more chicken',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/images%2Feat_more_chicken.jpeg?alt=media&token=ce05f9a2-5727-4076-a5ab-2f64cef80979'
    }, {
        name: 'McDonal\'s',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/images%2Fmcdonalds.jpg?alt=media&token=15676f70-6b23-4a4f-ace3-c97d5517f7d2'

    }, {
        name: 'Peanuts',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/images%2Fpeanuts.jpeg?alt=media&token=ccd3536c-cec0-4641-9685-593845fcb522'
    }, {
        name: 'Pepsi',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/images%2Fpepsi.jpeg?alt=media&token=101fbc3e-7fa7-4579-a1dd-fd87c8044780'
    }, {
        name: 'Ray Ban',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/images%2Fray_ban.jpg?alt=media&token=65c9f096-c24c-44c3-b7e0-480a6938e740'
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
        name: 'Yes Iran',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/videos%2Fyes_iran.mp4?alt=media&token=2ba43a2b-e077-4c9c-9930-84e8c63c8c6c'
    }, {
        name: 'Yes Russian mafia',
        url: 'https://firebasestorage.googleapis.com/v0/b/ubimo-home-assignment.appspot.com/o/videos%2Fyes_russian_mafia.mp4?alt=media&token=0c2b2c21-a960-4440-8722-83a19afeef07'
    }
];

const MAP_WIDTH = 1280;
const MAP_HEIGHT = 1887;

function generateRandomCoordinate(): IAdEvent['coordinates'] {
    return {
        x: Math.round(Math.random() * MAP_WIDTH),
        y: Math.round(Math.random() * MAP_HEIGHT),
    };
}

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
            creative,
            coordinates: generateRandomCoordinate()
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