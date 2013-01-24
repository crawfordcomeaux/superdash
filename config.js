var debug = false;
if (process.env.NODE_ENV === 'development') {
  debug = true;
}

module.exports = {
  'debug': debug,
  'port': 3000,
  'pwd': process.cwd(),
  'root': '/',
  'mongodb': 'mongodb://' + process.env.NODE_MONGODB || 'ec2-50-19-142-220.compute-1.amazonaws.com/superdash',
  'sessionSecret': 'i love making code really fast',
  'title': 'SuperDash - A Super Dashboard for a Super Bowl',
  'twitter_ids': [
    '1072729021',
    '1104932480'
  ],

  // APIs
  'twitter': {
    'consumer_key': 'Ak2dsjQhvYtsiJ343Q',
    'consumer_secret': 'iuh6rHrlfY7qDnhWMctDCuR4J67N1vOOVq3jL5YVQ',
    'access_token': '16586793-rBtnLLXcQ8wt5gBjP99SFUrtKiSSRCg3uN3PdIpaR',
    'access_token_secret': 'iMMjANsVy9DvrB53dd5LQvH4nzU05X0djo5mmuUw',
    'enabled': true
  },
  'instagram': {
    'client_id': 'f2604eb9377e4b89844d8e743ee930fc',
    'client_secret': 'b720d1c2fc9e4bf2854140d2453af1cd',
    'callback_url': 'instagram/callback',
    'enabled': true
  }
};
