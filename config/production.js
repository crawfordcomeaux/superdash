exports.loggerFormat = 'dev';
exports.useErrorHandler = true;
exports.mongodb = process.env.MONGODB || 'mongodb://superdash:sup3rdashm3@ds047447.mongolab.com:47447/heroku_app11073055';
exports.sessionSecret = process.env.SESSION_SECRET || 'i love making code really fast';

//exports.enableGuestLogin = true;
//exports.enableEmailLogin = true;
exports.twitter = {
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  enabled: true
};
exports.facebook = {
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: process.env.FB_CALLBACK || 'http://superdash.superdash.jit.su/auth/facebook/callback',
  enabled: true
};
exports.instagram = {
  clientID: 'f2604eb9377e4b89844d8e743ee930fc',
  clientSecret: 'b720d1c2fc9e4bf2854140d2453af1cd',
  enabled: true
}

