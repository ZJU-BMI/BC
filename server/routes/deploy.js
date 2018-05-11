var express = require('express');
var router = express.Router();

var myContracts = require('../interact/myContracts.js')

router.post('/new/patient', async(req, res) => {
    console.log(req.body.name);
    console.log(req.body.age);

    patient = await myContracts.patient.new(req.body.name, req.body.age);
    console.log(patient);

    if (patient) {
        res.status(200).send(patient.address);
    } else {
        res.status(500).send(`can't deploy patient`);
    }
});

module.exports = router;