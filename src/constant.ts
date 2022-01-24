/* eslint-disable @typescript-eslint/no-unused-vars */
import { AbiItem, HttpProviderOptions } from 'caver-js';

export const COUNT_CONTRACT_ADDRESS: string =
  '0x2804bcDA9DfF25d8B5f1ed589C138B96fCb4Ac4c';
const ACCESS_KEY_ID: string = 'KASKPIWZ8QHF1Z869HBWD7ON';
const SECRET_ACCESS_KEY: string = 'YwTX2ZekQJmgWNwuz2Rttb4QQXzn5S2gbg97iAg4';
const CHAIN_ID = '1001'; //babob test net 1001 main net 8217
const AUTHORIZATION: string =
  'Basic S0FTS1BJV1o4UUhGMVo4NjlIQldEN09OOll3VFgyWmVrUUptZ1dOd3V6MlJ0dGI0UVFYem41UzJnYmc5N2lBZzQ=';
export const KAIKAS_ADDRESS = '0xb1857609c1df97a385d97aabcd61ed3d1c61a9d6';
export const COUNT_ABI: AbiItem[] = [
  {
    constant: true,
    inputs: [],
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

export const option: HttpProviderOptions = {
  headers: [
    {
      name: 'Authorization',
      // 이게 결국 klaytn api Authorization과 같다
      value: AUTHORIZATION,
      // 'Basic' +
      // Buffer.from(ACCESS_KEY_ID + ':' + SECRET_ACCESS_KEY).toString('base64'),
    },
    {
      name: 'x-chain-id',
      value: CHAIN_ID,
    },
  ],
};

export const klaytnApiUrl: string = 'https://node-api.klaytnapi.com/v1/klaytn';
