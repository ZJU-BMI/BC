var Patient = artifacts.require('Patient');

contract('Patient', function(accounts) {
    var patient;

    it("patient's process should be 0", async() => {
        patient = await Patient.new('gzx', 23);
        var process = await patient.process.call();
        assert.equal(process, 0x0000000000000000000000000000000000000000, "process wasn't that");
    });

    it("patient's process start")
});