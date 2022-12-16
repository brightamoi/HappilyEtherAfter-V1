export const CONTRACT_ADDRESS = "0x896b59bFE64CeF0d215Cc9C70aa1fA2Bf71DeEC5";
export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "weddingId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "spouse2",
        type: "address",
      },
    ],
    name: "Accepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "weddingId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "spouse1",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "spouse2",
        type: "address",
      },
    ],
    name: "Married",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "weddingId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "spouse1",
        type: "address",
      },
    ],
    name: "Proposed",
    type: "event",
  },
  {
    inputs: [],
    name: "accept",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getSpouses",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "partner",
        type: "address",
      },
    ],
    name: "marry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "spouse1",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "spouse2",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "weddingId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
