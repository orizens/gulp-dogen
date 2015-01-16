var _endpoint_GetMock = require('./_endpoint_.get.mock.json');

exports.index = get;
exports.create = create;
exports.update = update;

function get (req, res) {
	res.json(_endpoint_GetMock);
}

function create (req, res) {
	var _endpoint_ = req.body;
	res.json(_endpoint_);
}

function update (req, res) {
	var _endpoint_ = req.body;
	res.json(_endpoint_);
}