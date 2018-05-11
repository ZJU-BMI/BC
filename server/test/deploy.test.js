var chai = require('chai');
var chaiHttp = require('chai-http');
// var server = require('../index.js');
import server from "../index.js";
var should = chai.should();
var assert = require('assert');

chai.use(chaiHttp);

describe('deploying', function() {
    it('one patient should be deployed', function() {
        chai.request(server)
            .post("/deploy/new/patient")
            .type('form')
            .timeout(10000)
            .send({
                "name": "gzx",
                "age": 23
            })
            .end((err, res) => {
                res.should.have.status(200);
            })
    })
})