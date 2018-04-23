pragma solidity ^0.4.21;

import "./Hospital.sol";

contract Process {
    address public patient; // Patient who create the instance of Process
    
    enum State { Visit, Referreal, DevelopTreatmentMethods, ReceiveTreatment, Reimbursement, Into, Out, End }
    // 就诊， 复诊， 制定治疗方案， 接受治疗， 报销， 转入，转出，结束

    address public hospital;

    State public present;
    State public previous;
    // State public next;

    function Process() public{
        patient = msg.sender;
        present = State.Visit;
    }

    event ProcessEnd(address patient);
    event StateChanged(address patient);

    modifier beforeEnd(State _state) {
        require(_state != State.End);
        _;
    }

    modifier requireOwner(address _patient) {
        require(msg.sender == _patient);
        _;
    }

    function changeState() public beforeEnd(present) requireOwner(patient){

        emit StateChanged(patient);
    }

}