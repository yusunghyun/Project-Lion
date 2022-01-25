import axios, { AxiosResponse } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { COUNT_CONTRACT_ADDRESS_MAINNET } from '../constants';
const KLIP_POST_API_URL = 'https://a2a-api.klipwallet.com/v2/a2a/prepare';
const KLIP_GET_API_URL =
  'https://a2a-api.klipwallet.com/v2/a2a/result?request_key=';

export const setCount = async (
  count: number,
  setQrValue: Dispatch<SetStateAction<string>>,
) => {
  const result: AxiosResponse = await axios.post(KLIP_POST_API_URL, {
    bapp: {
      name: 'KLAY_WALLET',
    },
    type: 'execute_contract',
    transaction: {
      // from:
      to: COUNT_CONTRACT_ADDRESS_MAINNET,
      value: '0',
      abi: JSON.stringify({
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
      }),
      params: `[\"${count}\"]`,
    },
  });

  const { request_key } = result.data;
  const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
  setQrValue(qrcode);

  let timerId = setInterval(async () => {
    const getResult = await axios.get(KLIP_GET_API_URL + request_key);
    if (getResult.data.result) {
      console.log('result : ', JSON.stringify(getResult.data.result));
      clearInterval(timerId);
    }
  }, 1000);
};

export const getAddress = async (
  setQrValue: Dispatch<SetStateAction<string>>,
) => {
  const result: AxiosResponse = await axios.post(KLIP_POST_API_URL, {
    bapp: {
      name: 'KLAY_WALLET',
    },
    type: 'auth',
  });

  const { request_key } = result.data;
  const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
  setQrValue(qrcode);

  let timerId = setInterval(async () => {
    const getResult = await axios.get(KLIP_GET_API_URL + request_key);
    if (getResult.data.result) {
      console.log('result : ', JSON.stringify(getResult.data.result));
      clearInterval(timerId);
    }
  }, 1000);
};
