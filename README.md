# ubimo front end home assignment
This library expose an Ad dispatcher service.

## Ad event interface:

 - type: 'IMAGE' or  'VIDEO',
  - coordinates: {
    x: number between 0 - 1280;
    y: number between 0 - 1887;
  }
  - creative: {
    name: creative name.
    url: media url
  }
}


## Ad Dispatcher service API
  - adDispatcher$: Stream which dispatch ad event.
  - registerToAdEvents: function which except a callback as input, the callback is invoked each time the service dispatch<br/> an ad event.
