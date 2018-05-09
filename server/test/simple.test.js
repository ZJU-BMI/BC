var chai = require('chai');
var chaiHttp = require('chai-http');
// var server = require('../index.js');
import server from "../index.js";
var should = chai.should();
var assert = require('assert');

chai.use(chaiHttp);

console.log('testing');

describe('simple', function() {
    it('should give simple response', function() {
        chai.request(server)
            .get('/simple')
            .end(function(err, res) {
                res.should.have.status(200);
                assert(res.text, 'simple response')
            });
    });
});