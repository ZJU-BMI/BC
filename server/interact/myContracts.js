const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider("http://localhost:7545");
const web3 = new Web3(provider);

var contract = require('truffle-contract');

var fs = require('fs');
var path = require('path');

function initProcess() {
    var processContents = fs.readFileSync(path.join(__dirname, "../..", "build/contracts/Process.json"));
    var processContract = JSON.parse(processContents);

    var Process = contract({
        abi: processContract.abi,
        unlinked_binary: processContract.bytecode
    });

    Process.setProvider(provider);
    return Process;
}

function initPatient() {
    var patientContents = fs.readFileSync(path.join(__dirname, "../..", "build/contracts/Patient.json"));
    var patientContract = JSON.parse(patientContents);
    
    var Patient = contract({
        abi: patientContract.abi,
        unlinked_binary: patientContract.bytecode
    });
    
    Patient.setProvider(provider);
    return Patient;
}

module.exports = {
    patient: initPatient(),
    process: initProcess(),
};