var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
var should = chai.should();
var assert = require('assert');

chai.use(chaiHttp);

console.log('testing');

describe('simple', function() {
    it('should give simple response', function() {
        chai.requset(server)
            .get('/simple')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });
});

describe('add', function() {
    it('1 + 1 = 2', function() {
        a = 1 + 2;
        assert(a, 2);
    })
})