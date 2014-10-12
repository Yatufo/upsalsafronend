


exports.findAll = function(req, res) {
	res.send([{name:'wine1'}, {name:'Demonio'}, {name:'wine3'}]);
};

exports.findById = function(req, res) {
	res.send({id:req.params.id, name: "The Name", description: "description"});
};