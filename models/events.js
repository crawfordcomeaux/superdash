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
	description: String
}, { collection: 'events' });


module.exports = mongoose.model('Events', eventsSchema, 'Events');

