var Patient = artifacts.require('./Patient.sol');
var Process = artifacts.require('./Process.sol');

module.exports = function(deployer) {
    deployer.deploy(Patient, 'gzx', 23);
    deployer.deploy(Process);
}
