exports.loggerFormat = 'dev';
exports.useErrorHandler = true;
exports.mongodb = 'mongodb://ec2-50-19-142-220.compute-1.amazonaws.com/superdash';
exports.sessionSecret = 'i love making code really fast';

//exports.enableGuestLogin = true;
//exports.enableEmailLogin = true;
exports.twitter = {
  consumerKey: 'Ak2dsjQhvYtsiJ343Q',
  consumerSecret: 'iuh6rHrlfY7qDnhWMctDCuR4J67N1vOOVq3jL5YVQ',
  enabled: false
};
exports.facebook = {
  clientID: '311801745605588',
  clientSecret: 'cadebf6e81ac21553f76631ed5d50f94',
  callbackURL: 'http://127.0.0.1:3000/auth/facebook/callback',
  enabled: false
};

exports.instagram = {
  clientID: 'f2604eb9377e4b89844d8e743ee930fc',
  clientSecret: 'b720d1c2fc9e4bf2854140d2453af1cd',
  enabled: false
}
