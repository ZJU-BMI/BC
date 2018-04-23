pragma solidity ^0.4.21;

import "./Process.sol";
import "./Permission.sol";

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
            emit RestartProcess(this);
            return;
        }
        process = new Process();
    }

    function changeState() public ProcessStarted(process){
        process.changeState();
    }
}