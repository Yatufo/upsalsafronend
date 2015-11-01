var calendarsSync = require('../sync/sync-calendars.js');


exports.syncEvents = function(req, res) {

    calendarsSync.synchronize(req.query.all);
    res.send("request received");
}
