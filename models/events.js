var mongoose = require('mongoose');

var events = new mongoose.Schema({
  date: String,
  start_time: String,
  end_time: String,
  title: String,
  event_type: String,
  venue: String,
  registration: String,
  ticket_details: String,
  contact1: String,
  contact2: String,
  contact3: String,
  contact4: String,
  contact_email1: String,
  contact_email2: String,
  contact_email3: String,
  contact_number1: String,
  contact_number2: String,
  ticket_info: String,
  privacy: String,
  expected_attendance: String,
  description: String,
  changed: Boolean
}, { collection: 'events' });


events.methods.findAll = function (cb) {
    var events = [];
    var count = events.count({}, function() {});
    var stream = events.find().stream();
    var nextEvent = "";
    stream.on('data', function(doc) {
      events.push({
        venue: doc.venue,
      date: doc.date,
      title: doc.title,
      start_time: doc.start_time,
      end_time: doc.end_time
      });
    });

    stream.on('error', function (err) {
      console.log("Event stream error: %s", err);
    });

    stream.on('close', function () {
      if (count != events.length) {
              console.log("Warning: event collection count not equal to # of events returned.");
              console.log("collection count: %d", count);
              console.log("events returned: %d", events.length);
      }
      return events;
    });
};
module.exports = mongoose.model('events', events, 'events');
