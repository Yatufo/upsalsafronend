var ctx = require('../util/conf.js').context();
var RRule = require('rrule').RRule;


exports.createRecurrentEvents = function(lEvent, callback) {
    var recurrentEvents = [];
    lEvent.recurrence.forEach(function(lRule) {

        if (lRule.indexOf("RRULE:") > -1) {
            lRule = lRule.replace("RRULE:", '');
            var options = RRule.parseString(lRule);
            options.dtstart = new Date(lEvent.start.dateTime);

            var duration = lEvent.end.dateTime - lEvent.start.dateTime;
            var startDates = new RRule(options).all(function(date, i) {
                return i < ctx.MAX_REPETITIVE_EVENT
            });

            var sequence = 1;
            startDates.forEach(function(startDate, index) {
                var newEvent = cloneEvent(lEvent);
                newEvent.start.dateTime = startDate;
                newEvent.end.dateTime = Date.parse(startDate) + duration;
                newEvent.recurrence = null;
                newEvent.sequence = sequence;

                if (newEvent.sequence <= ctx.SYNC_SEASON_START_SEQ &&
                    newEvent.categories && newEvent.categories.indexOf(ctx.SYNC_SEASON_CATEGORY) != -1) {
                    newEvent.categories.push(ctx.SYNC_SEASON_START);
                }


                recurrentEvents.push(newEvent);

                sequence++;
            });
        }
    });
    callback(recurrentEvents);
}



var cloneEvent = function(lEvent) {
    return JSON.parse(JSON.stringify(lEvent));
};