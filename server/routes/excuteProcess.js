var express = require('express');
var router = express.Router();

var myContracts = require('../interact/myContracts.js');

router.get('/excute', async(req, res, next) => {
    var address = req.address;

    var patient = await myContracts.patient.at(address);
    await patient.changeState(req.excuteCode);

    res.send('state changed');
});

module.exports = router;