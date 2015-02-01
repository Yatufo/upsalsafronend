var mongoose = require('mongoose');
var ctx = require('../util/conf.js').context();

var Schema = mongoose.Schema;

var EventSchema = new Schema({
    title: String,
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
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
    sequence: Number,
    categories: [{
        type: String,
        ref: 'Category'
    }]
});

EventSchema.virtual('duration').get(function() { return Math.round((this.end.dateTime - this.start.dateTime)/360000)/10; });
EventSchema.set('toJSON', { virtuals: true });  


var CategorySchema = new Schema({
    _id: {
        type: String,
        index: true
    },
    name: String,
    parent: {
        type: String,
        ref: 'Category'
    },
    categories: [{
        type: String,
        ref: 'Category'
    }]
});


CategorySchema.virtual('id').get(function() { return this._id; });
CategorySchema.set('toJSON', { virtuals: true });  


var LocationSchema = new Schema({
    id: {
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
