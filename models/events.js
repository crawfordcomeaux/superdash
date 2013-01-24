var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var eventsSchema = new Schema({
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
	changed: {type: Boolean, default: false}
}, { collection: 'events' });
/*

TODO

eventsSchema.methods.findAll = function(cb) {
        var eventDocs = [];
        var count = events.count({},function(){});
        var stream = events.find().stream();
        var nextEvent = "";
        stream.on('data', function(doc) {
                nextEvent = {
                                  venue: doc.venue
                                , date: doc.date
                                , title: doc.title
                                , start_time: doc.start_time
                                , end_time: doc.end_time
                }
                eventDocs.push(nextEvent);
        });

        stream.on('error', function (err) {
                console.log("Event stream error: %s", err);
        });

        stream.on('close', function () {
                if (count != eventDocs.length) {
                        console.log("Warning: event collection count not equal to # of events returned.");
                        console.log("collection count: %d", count);
                        console.log("events returned: %d", eventDocs.length);
                }
	return eventDocs;
	});
}*/
module.exports = mongoose.model('events', eventsSchema, 'events');

