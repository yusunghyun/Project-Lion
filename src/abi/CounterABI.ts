import { AbiItem } from 'caver-js';

export const COUNT_ABI: AbiItem[] = [
  {
    constant: true,
    inputs: [],
    //메소드명
    name: 'count',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_count',
        type: 'uint256',
      },
    ],
    name: 'setCount',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
