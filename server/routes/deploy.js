var express = require('express');
var router = express.Router();

var myContracts = require('../interact/myContract.s.js')

router.post('/new-patient', function(req, res, next) {
    myContracts.patient.new(req.name, req.age).then(function(p) {
        res.send(p.address);
    });
});

module.exports = router;