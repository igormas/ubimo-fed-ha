# ubimo-fed-ha
This library expose an Ad dispatcher service.

Ad event interface
  type: 'IMAGE' or  'VIDEO',
  creative: {
    name: creative name.
    url: media url
  }

Ad Dispatcher service API
  adDispatcher$: Stream which dispatch ad event.
  registerToAdEvents: the provided function will be invoked the dispatched ad event.
