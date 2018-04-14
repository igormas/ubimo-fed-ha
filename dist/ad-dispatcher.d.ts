import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/delay';
export interface IAdEvent {
    type: 'IMAGE' | 'VIDEO';
    src: string;
    name: string;
}
export declare class AdDispatcher {
    private _adDispatcher$;
    private firebaseApp;
    constructor();
    private getRandomAd();
    private startEmissions();
    readonly adDispatcher$: Observable<IAdEvent>;
    registerToAdEvents(cb: (adEvent: IAdEvent) => void): {
        removeListener: () => void;
    };
}
export declare const adDispatcher: AdDispatcher;
