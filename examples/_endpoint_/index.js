'use strict';

var express = require('express');
var controller = require('./_endpoint_.controller');
var mockController = require('./mocks/_endpoint_.controller');

var router = express.Router();
router.get('/', apiHandler.index);
router.post('/', apiHandler.create);
router.put('/:id', apiHandler.update);

module.exports = router;