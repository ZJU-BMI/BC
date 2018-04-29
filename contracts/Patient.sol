pragma solidity ^0.4.21;

import "./Process.sol";

contract Patient {
    bytes32 public name;
    uint public age;
    
    Process public process;

    function Patient(bytes32 _name, uint _age) public{
        name = _name;
        age = _age;
    }

    event RestartProcess(address patient);

    modifier ProcessStarted(Process _process) {
        require(address(_process) != 0x0000000000000000000000000000000000000000);
        _;
    }

    function startProcess() public{
        if (address(process) != 0x0000000000000000000000000000000000000000) {
            if (_compaireString(process.getPresentState(), "END")) {
                process = new Process();
                return;
            }
            emit RestartProcess(this);
            return;
        }
        process = new Process();
    }

    function forceEndProcess() public {
        if (address(process) != 0x0000000000000000000000000000000000000000) {
            process.forceEnd();
        }
    }
    
    function _compaireString(bytes32 a, bytes32 b) private pure returns (bool) {
        return keccak256(a) == keccak256(b);
    }

    // result由nodejs后端来传入。
    function changeState(uint result) public ProcessStarted(process){
        process.changeState(result);
    }
}