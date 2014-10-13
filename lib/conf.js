var fs = require('fs');

module.exports = function(env) {
    return {
        initContext: function() {
            if (env === 'dev') {
	            console.log("Loading the configuration");
               	var context = JSON.parse(fs.readFileSync('./conf/project.json', 'utf8'));
            } else {
                console.error("Configuration for this environment is not found");
            }

            return context;
        }
    };
}
