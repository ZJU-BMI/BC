var express = require('express');
var router = express.Router();

var myContracts = require('../interact/myContracts.js')

router.post('/new-patient', function(req, res, next) {
    myContracts.patient.new(req.name, req.age).then(function(p) {
        res.send('address');
    });
});

module.exports = router;