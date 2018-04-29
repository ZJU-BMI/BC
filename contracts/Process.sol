pragma solidity ^0.4.21;

contract Process {
    address public patient; // Patient who create the instance of Process
    
    enum State { 
        Visit,  // 就诊
        Referreal,  // 复诊
        DevelopTreatmentMethods,  // 制定治疗方案
        ReceiveTreatment,  // 接受治疗
        Reimbursement,  // 报销
        SelectHospital,  // 选择医院
        Into,  // 转入
        Out,  // 转出
        End  // 结束
    }

    State public present;
    State public previous;
    // State public next;
    
    uint hospitalLevel;

    function Process() public{
        patient = msg.sender;
        present = State.Visit;
        hospitalLevel = 0;
    }

    event ProcessEnd(address patient);
    event StateChanged(address patient);
    event StateChangedIncorrectly(address patient);

    modifier beforeEnd(State _state) {
        require(_state != State.End);
        _;
    }
    
    modifier requireOwner(address _patient) {
        require(msg.sender == _patient);
        _;
    }
    
    function getPresentState() public view returns (bytes32) {
        if (present == State.End) {
            return "END";
        } else {
            return "Ongoing";
        }
    }

    function changeState(uint result) public beforeEnd(present) requireOwner(patient){
        State temp = present;
       
        // all in hard coded
        if (present == State.Visit) {
            _visitNext(result);
        } else if (present == State.SelectHospital) {
            _selectHospitalNext(result);
        } else if (present == State.Out) {
            present = State.Into;
            if (hospitalLevel == 0) {
                hospitalLevel = 1;
            } else {
                hospitalLevel = 0;
            }
        } else if (present == State.Into) {
            _intoNext(result);
        } else if (present == State.Referreal) {
            _referrealNext(result);
        } else if (present == State.DevelopTreatmentMethods) {
            _developTreatmentMethodsToNext(result);
        }
       
        previous = temp;
        emit StateChanged(msg.sender);
    }

    function forceEnd() public {
        previous = present;
        present = State.End;
        emit ProcessEnd(patient);
    }
    
    function _visitNext(uint result) private {
        if (result == 0) {
            present = State.End;
            emit ProcessEnd(patient);
        } else {
            present = State.SelectHospital;
        }
    }
    
    function _selectHospitalNext(uint result) private {
        if (result == 1) {
            present = State.Out;
        } else if (result == 2) {
            present = State.Referreal;
        } else if (result == 3) {
            present = State.DevelopTreatmentMethods;
        } else {
            emit StateChangedIncorrectly(patient);
        }
    }
    
    function _intoNext(uint result) private {
        if (result == 4) {
            present = State.Referreal;
        } else if (result == 5) {
            present = State.ReceiveTreatment;
        } else {
            emit StateChangedIncorrectly(patient);
        }
    }
    
    function _referrealNext(uint result) private {
        if (result == 6) {
            present = State.DevelopTreatmentMethods;
        } else if (result == 7) {
            present = State.End;
            emit ProcessEnd(patient);
        } else {
            emit StateChangedIncorrectly(patient);
        }
    }

    function _developTreatmentMethodsToNext(uint result) private {
        if (result == 8) {
            present = State.ReceiveTreatment;
        } else if (result == 9) {
            present = State.Out;
        } else {
            emit StateChangedIncorrectly(patient);
        }
    }

}
