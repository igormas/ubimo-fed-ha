# ubimo front end home assignment
This library expose an Ad dispatcher service.

## Ad event interface:
{
  type: 'IMAGE' or  'VIDEO',
  creative: {
    name: creative name.
    url: media url
  }
}

## Ad Dispatcher service API
  adDispatcher$: Stream which dispatch ad event.
  registerToAdEvents: function which except a callback as input, the callback is invoked each time the service dispatch an ad   
  event.
