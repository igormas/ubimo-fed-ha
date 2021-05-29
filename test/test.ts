import {
  adDispatcher,
  IAdEvent,
} from './../src/ad-dispatcher';

function appendRecord(evt: IAdEvent, isCb: boolean): void {
  const selector: string = isCb ? '.cb-log-js' : '.stream-log-js';

  const titleElement: HTMLDivElement = document.createElement('DIV') as HTMLDivElement;
  titleElement.innerHTML = `${evt.type} ${evt.creative.url} <br>`;

  let creativeElement: HTMLImageElement | HTMLVideoElement;
  if (evt.type === 'IMAGE') {
    creativeElement = document.createElement('IMG') as HTMLImageElement;
    creativeElement.src = evt.creative.url;
  } else {
    creativeElement = document.createElement('video');
    creativeElement.src = evt.creative.url;
    creativeElement.controls = true;
  }
  titleElement.appendChild(creativeElement);

  document.querySelector(selector)
      .appendChild(titleElement);
}

adDispatcher.registerToAdEvents((evt) => {
  console.log('callback', evt);
  appendRecord(evt, false);
});

adDispatcher.adEvents$
    .subscribe((evt: IAdEvent) => {
      console.log('stream', evt);
      appendRecord(evt, true);
    });
