var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/upsalsa');

var Schema = mongoose.Schema;

var EventSchema = new Schema({
    id: { type: [String], index: true },
    title: String,
    location: String,
    sync: [{
        uid: { type: [String], index: true },
        lastUpdate: Date
    }],
    timeZone: String,
    start: [{
        dateTime: Date
    }],
    end: [{
        dateTime: Date
    }],
    categories: [CategorySchema]
});

var CategorySchema = new Schema({
    id: { type: [String], index: true },
    name: String,
    parent: CategorySchema,
    categories: [CategorySchema]
});


exports.Cagegory = mongoose.model('Category', CategorySchema);
exports.Event = mongoose.model('Event', EventSchema);
