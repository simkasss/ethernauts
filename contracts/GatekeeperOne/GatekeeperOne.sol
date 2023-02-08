// SPDX-License-Identifier: MIT

// Task:
// Make it past the gatekeeper and register as an entrant to pass this level.
pragma solidity ^0.8.0;

contract GatekeeperOne {
    address public entrant;

    modifier gateOne() {
        require(msg.sender != tx.origin); // My entrant contract will be a msg.sender, while my acc will be a msg.sender
        _;
    }

    modifier gateTwo() {
        require(gasleft() % 8191 == 0); // C2
        _;
    }

    modifier gateThree(bytes8 _gateKey) {
        require(
            uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)),
            "GatekeeperOne: invalid gateThree part one"
            // uint16 max value is 65535, so uint64 can be from 0 to 65535
            // both sides should be equal to 43774
        );
        require(
            uint32(uint64(_gateKey)) != uint64(_gateKey),
            "GatekeeperOne: invalid gateThree part two"
            // uint32 max value is 4,294,967,295
            // this means that the number in uint64 is bigger
        );
        require(
            uint32(uint64(_gateKey)) == uint16(uint160(tx.origin)),
            "GatekeeperOne: invalid gateThree part three"
            //  uint16(uint160(tx.origin)) is equal to 43774
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
