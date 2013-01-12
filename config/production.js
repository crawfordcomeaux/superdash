exports.loggerFormat = 'dev';
exports.useErrorHandler = true;
exports.mongodb = process.env.MONGODB || 'mongodb://localhost/superdash';
exports.sessionSecret = process.env.SESSION_SECRET || 'i love making code really fast';

//exports.enableGuestLogin = true;
//exports.enableEmailLogin = true;
exports.twitter = {
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET
};
exports.facebook = {
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_SECRET,
  callbackURL: process.env.FB_CALLBACK || 'http://superdash.superdash.jit.su/auth/facebook/callback'
};