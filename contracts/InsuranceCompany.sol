pragma solidity ^0.4.21;

import "./Permission.sol";
import "./Patient.sol";

contract InsuranceCompany {

    event Paid(Patient patient);

    function payout(Patient patient) public {
        emit Paid(patient);
    }
}