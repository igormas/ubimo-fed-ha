import { Observable } from 'rxjs';
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
export interface IAdDispatcher {
    adEvents$: Observable<IAdEvent>;
    registerToAdEvents(cb: (adEvent: IAdEvent) => void): {
        removeListener: () => void;
    };
}
export declare const adDispatcher: IAdDispatcher;
