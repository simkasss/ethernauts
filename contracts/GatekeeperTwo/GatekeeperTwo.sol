// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GatekeeperTwo {
    address public entrant;

    modifier gateOne() {
        require(msg.sender != tx.origin);
        _;
    }

    modifier gateTwo() {
        uint x;
        assembly {
            x := extcodesize(caller()) // code size at the caller address should be 0
            // for existing contracts this will return a size that is > 0;
            // if the contract is being deployed in the exact same transaction when this function is called, the size will be equal to zero
            // so we have to call a function inside a contructor of the entrant contract
        }
        require(x == 0);
        _;
    }

    modifier gateThree(bytes8 _gateKey) {
        require(
            uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^ // ^ is a Bitwise operation XOR
                // XOR returns 1 only if one of a bits is equal to 1. It means that all the 64 bits have to be different
                uint64(_gateKey) ==
                type(uint64).max // max size of uint64 is 18,446,744,073,709,551,615 or 0xFFFFFFFFFFFFFFFF
            // in binary it is 64 of 1
        );
        _;
    }

    function enter(
        bytes8 _gateKey
    ) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
        entrant = tx.origin;
        return true;
    }
}
