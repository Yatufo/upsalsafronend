var mongoose = require('mongoose');
var ctx = require('../util/conf.js').context();

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
    recurrence: [String],
    categories: [{
        type: String,
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

var LocationSchema = new Schema({
    code: {
        type: String,
        index: true
    },
    name: String,
    address: String,
    url: String,
    phone: String,
    coordinates: {
        longitude: Number,
        latitude: Number
    }
});




exports.Category = mongoose.model('Category', CategorySchema);
exports.Event = mongoose.model('Event', EventSchema);
exports.Location = mongoose.model('Location', LocationSchema);


exports.connect = function() {
    mongoose.connect(ctx.MONGO_CONNECTION);
}

exports.disconnect = function() {
    mongoose.disconnect();
}

exports.connect();
