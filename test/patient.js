var Patient = artifacts.require('Patient');
var Process = artifacts.require('Process');

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
        assert.equal(state.valueOf(), 0, "init state of process is not visit");
    });

    it("if there is no abnormality in the new diagnosis, the process is ended", async() => {
        await patient.changeState(0);
        var state = await process.present.call();
        assert.equal(state.valueOf(), stateMap[8], "process isn't ended");
    });

});