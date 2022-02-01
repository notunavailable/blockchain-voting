pragma solidity >= 0.5.16;

contract Election {
    address public owner;
    string[2] public candidates;

    modifier onlyOwner {
        if(owner == msg.sender){
        _;
        }
    }

    constructor() public{
        owner = msg.sender;
        candidates[0] = "candidate 1";
        candidates[1] = "candidate 2";
    }

    /*function getCandidates() public view returns (string[2] memory) {
        return candidates;
    }*/

    function getCandidateName() public view returns (string[2] memory) {
        return candidates;
    }

    function setCandidateName(string memory name, uint index) public {
        candidates[index] = name;
    }

    /*function setCandidate(string memory name, uint  index) public returns (uint){
        candidates[0] = name;
        return index;
    }*/
}