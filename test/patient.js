var Patient = artifacts.require('Patient');
var Process = artifacts.require('Process');

var stateMap = require('../server/stateMap.js');

contract('Patient', function(accounts) {
    var patient;
    var process;

    it("patient's process should be 0", async() => {
        patient = await Patient.new('gzx', 23);
        var processAddr = await patient.process.call();
        assert.equal(processAddr, 0x0000000000000000000000000000000000000000, "process wasn't that");
    });

    it("process could be started", async() => {
        await patient.startProcess();
        var processAddr = await patient.process.call();
        assert.notEqual(processAddr, 0, "process hasn't started");
    });

    it('first state should be visit', async() => {
        var processAddr = await patient.process.call();
        process = await Process.at(processAddr);
        var state = await process.present.call();
        assert.equal(stateMap[state.valueOf()], "Visit", "init state of process is not visit");
    });

    it("has no abnormality in visit, the process is ended", async() => {
        await patient.changeState(0);
        var state = await process.present.call();
        assert.equal(stateMap[state.valueOf()], "End", "process isn't ended");
    });

    it("has abnormality in visit, the process should be selectHospital", async() => {
        await patient.startProcess();
        var processAddr = await patient.process.call();
        process = await Process.at(processAddr);
        await patient.changeState(1);
        var state = await process.present.call()
        assert.equal(stateMap[state.valueOf()], 'SelectHospital', "process is not in selecting hospital");
    });

});