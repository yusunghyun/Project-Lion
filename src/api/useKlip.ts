import axios, { AxiosResponse } from 'axios';
const KLIP_POST_API_URL = 'https://a2a-api.klipwallet.com/v2/a2a/prepare';
const KLIP_GET_API_URL =
  'https://a2a-api.klipwallet.com/v2/a2a/result?request_key=';

export const getAddress = async () => {
  const result: AxiosResponse = await axios.post(KLIP_POST_API_URL, {
    bapp: {
      name: 'KLAY_WALLET',
    },
    type: 'auth',
  });

  const { request_key } = result.data;
  let timerId = setInterval(async () => {
    const getResult = await axios.get(KLIP_GET_API_URL + request_key);
    if (getResult.data.result) {
      console.log('result : ', getResult.data.result);
      clearInterval(timerId);
    }
  }, 1000);
};

export const useKlip = () => {};
