var debug = false;
if (process.env.NODE_ENV === 'development') {
  debug = true;
}

module.exports = {
  'debug': debug,
  'port': 3000,
  'pwd': process.cwd(),
  'root': '/',
  'mongodb': process.env.NODE_MONGODB || 'mongodb://ec2-50-19-142-220.compute-1.amazonaws.com/superdash',
  'sessionSecret': 'i love making code really fast',
  'title': 'SuperDash - A Super Dashboard for a Super Bowl',
  'twitter_ids': [
    '1072729021',
    '1104900210'
  ],

  // APIs
  'twitter': {
    'consumer_key' : 'LYuiiOzuQHn1XuMqCCwBQ',
    'consumer_secret' : '5wrXaat5dOh6jm7L5fRhgCXyul9wAA1jUPix4PhXA',
    'access_token_key' : '1104640333-oPMy5KM8QChABRvSRPgdLEFwuBa46YWbigDtzJI',
    'access_token_secret' : 'u2BguxHFCjv5rgSGm1o1rMkdlVR3uCzvptws2Oc1w0',
    'enabled': true
  },
  'instagram': {
    'client_id': 'f2604eb9377e4b89844d8e743ee930fc',
    'client_secret': 'b720d1c2fc9e4bf2854140d2453af1cd',
    'callback_url': 'instagram/callback',
    'enabled': true
  }
};
