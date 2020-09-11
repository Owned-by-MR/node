var assert  = require('chai').assert;
var app  = require('../app');

describe('App', function() {
	it('Returning true', function(){
		assert.equal(app(), 'todoList');
	});
    });

