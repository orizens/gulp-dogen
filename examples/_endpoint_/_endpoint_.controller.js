var _ = require('lodash');
var rest = require('restler');
var restUrl = config.restUrl + '/_endpoint_';
var =endpoint=; // this will be converted to camelCase
exports.index = get;
exports.create = create;
exports.update = update;

function get (req, res) {
	rest.get(restUrl).on('complete', handleGet);

	function handleGet (response){
		res.json(response._endpoint_);
	}
}

function create (req, res) {
	var data = { _endpoint_: req.body };
	var url = restUrl;
	rest.post(url, data).on('complete', returnJson);
}

function update (req, res) {
	var id = req.param('id');
	var data = { _endpoint_: req.body };
	var url = restUrl + '/' + id;
	rest.putJson(url, data).on('complete', returnJson);
}

function returnJson (data, response){
	res.json(data);
}