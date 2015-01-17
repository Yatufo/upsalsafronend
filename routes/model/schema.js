var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    title: String,
    location: String,
    sync: {
        uid: {
            type: String,
            index: true
        },
        lastUpdate: Date
    },
    timeZone: String,
    start: {
        dateTime: Date
    },
    end: {
        dateTime: Date
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }]
});

var CategorySchema = new Schema({
    _id: {
        type: String,
        index: true
    },
    name: String,
    categories: [{
        type: String,
        ref: 'Category'
    }]
});


exports.Category = mongoose.model('Category', CategorySchema);
exports.Event = mongoose.model('Event', EventSchema);

exports.connect = function() {
    mongoose.connect('mongodb://localhost/upsalsa');
}

exports.disconnect = function() {
    mongoose.disconnect();
}
