pragma solidity ^0.4.21;

import "./Process"
import "./Permission"

contract Patient {
    byte32 public name;
    uint public age;

    Process public process;

    function Patient(byte32 _name, uint _age) public{
        name = _name;
        age = _age;
    }

    function startProcess() {
        process = new Process();
    }
}