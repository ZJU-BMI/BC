var Process = artifacts.require('Process');

var excuteProcess = require('../server/excuteProcess.js');
var stateMap = require('../server/stateMap.js');

contract('Process', function(accounts) {
    var process;

    beforeEach('deploy a process for each test', async() => {
        process = await Process.new();
    });

    it('visit to end', async() => {
        var initState = await process.present.call();
        assert.equal(stateMap[initState.valueOf()], 'Visit', 'init state should be visit');
        await process.changeState(excuteProcess.visitToEnd);
        var state = await process.present.call();
        assert.equal(stateMap[state.valueOf()], 'End', "process isn't ended");
    });

    it('visit to referreal to end', async() => {
        await process.changeState(excuteProcess.visitToSelectHopital);
        var state = await process.present.call();
        assert.equal(stateMap[state.valueOf()], 'SelectHospital', "process isn't in selectHospital");
        await process.changeState(excuteProcess.selectToReferreal);
        state = await process.present.call();
        assert.equal(stateMap[state.valueOf()], 'Referreal', "process isn't in referreal");
        await process.changeState(excuteProcess.referrealToEnd);
        state = await process.present.call();
        assert.equal(stateMap[state.valueOf()], 'End', "process isn't ended");
    });

    it('visit select out into referreal end', async() => {
        await process.changeState(excuteProcess.visitToSelectHopital);
        var state = await process.present.call();
        assert.equal(stateMap[state.valueOf()], 'SelectHospital', "process isn't in selectHospital");
        await process.changeState(excuteProcess.selectToOut);
        state = await process.present.call();
        assert.equal(stateMap[state.valueOf()], 'Out', "process isn't in out");
        await process.changeState(excuteProcess.outToInto);
        state = await process.present.call();
        assert.equal(stateMap[state.valueOf()], 'Into', "process isn't in into");
        await process.changeState(excuteProcess.intoToReferreal);
        state = await process.present.call();
        assert.equal(stateMap[state.valueOf()], 'Referreal', "process isn't in referreal");
        await process.changeState(excuteProcess.referrealToEnd);
        state = await process.present.call();
        assert.equal(stateMap[state.valueOf()], 'End', "process isn't ended");
    })
});
