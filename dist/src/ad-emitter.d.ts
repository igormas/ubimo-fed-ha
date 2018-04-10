import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/delay';
export interface IAdEvent {
    type: 'IMAGE' | 'VIDEO';
    src: string;
    name: string;
}
export declare class AdEmitter {
    private _adEmitter$;
    constructor();
    private getRandomAdd();
    private startEmissions();
    readonly adEmitter$: Observable<IAdEvent>;
    registerToAdEvents(cb: (adEvent: IAdEvent) => void): {
        removeListener: () => void;
    };
}
export declare const adDispatcher: AdEmitter;
