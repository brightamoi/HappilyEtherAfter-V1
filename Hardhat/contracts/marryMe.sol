//SPDX-License-Identifier: MIT 
pragma solidity ^0.8.9;

contract MarriageCertificate {
  address public spouse1;
  address public spouse2;
  

  // current wedding id
  uint256 public  weddingId;
  
  // emitted when a user propose 
  event Proposed(uint256 weddingId, address spouse1);

  // emited when user accept the marriage proposal 
  event Accepted(uint256 weddingId, address spouse2);

  // emitted when two users get married
  event Married(uint256 weddingId, address spouse1, address spouse2);


  function marry(address partner) public {
    require(partner != address(0), "Cannot marry to a null address");
    require(partner != msg.sender, "Cannot marry yourself");
    require(partner != spouse1, "Cannot marry a married person");
   
      spouse1 = msg.sender;
      spouse2 = partner;
      weddingId += 1;
      
      emit Proposed(weddingId, spouse1);
    
  }
    

  function accept() public {
    //only allow the proposal to be accecpted by the Spouse 2
    require(msg.sender == spouse2);

    emit Accepted(weddingId, spouse2);
    emit Married(weddingId, spouse1, spouse2);

  }

  function getSpouses() public view returns (address, address) {
    return (spouse1, spouse2);
  }

 
}