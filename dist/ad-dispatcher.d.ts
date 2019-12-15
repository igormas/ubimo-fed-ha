import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
export interface ICreative {
    name: string;
    url: string;
}
export interface IAdEvent {
    type: 'IMAGE' | 'VIDEO';
    coordinates: {
        x: number;
        y: number;
    };
    creative: ICreative;
}
export declare class AdDispatcher {
    private _adEvents$;
    private imagesCreatives;
    private videoCreatives;
    adEvents$: Observable<IAdEvent>;
    constructor();
    private getRandomAd;
    private startEmissions;
    registerToAdEvents(cb: (adEvent: IAdEvent) => void): {
        removeListener: () => void;
    };
}
export declare const adDispatcher: AdDispatcher;
