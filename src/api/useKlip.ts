import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { COUNT_CONTRACT_ADDRESS_MAINNET } from '../constants';
const KLIP_POST_API_URL = 'https://a2a-api.klipwallet.com/v2/a2a/prepare';
const KLIP_GET_API_URL =
  'https://a2a-api.klipwallet.com/v2/a2a/result?request_key=';

export const useSetCount = (setQrValue: Dispatch<SetStateAction<string>>) => {
  // const result: AxiosResponse = await ;
  const [refetchInterval, setRefetchInterval] = useState<number>(1000);

  const { mutate, data: mutationData } = useMutation(
    ({ count }: { count: number }) =>
      axios.post(KLIP_POST_API_URL, {
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
      }),
    {
      onSuccess: () => {
        const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
        setQrValue(qrcode);
      },
    },
  );
  const request_key = mutationData?.data?.request_key;
  const {} = useQuery(
    'GET_ADDRESS_RESULT',
    () => axios.get(KLIP_GET_API_URL + request_key),
    {
      enabled: request_key !== undefined,
      refetchInterval: refetchInterval,
      onSuccess: (data) => {
        console.log('success : ', JSON.stringify(data));
        setRefetchInterval(0);
      },
    },
  );

  const setCount = (cnt: number) => {
    mutate({ count: cnt });
  };

  return { setCount };
};

export const useGetAddress = (setQrValue: Dispatch<SetStateAction<string>>) => {
  const [refetchInterval, setRefetchInterval] = useState<number>(1000);
  const { mutateAsync, data: mutationData } = useMutation(() =>
    axios.post(KLIP_POST_API_URL, {
      bapp: {
        name: 'KLAY_WALLET',
      },
      type: 'auth',
    }),
  );
  const request_key = mutationData?.data?.request_key;
  const {} = useQuery(
    'GET_ADDRESS_RESULT',
    () => axios.get(KLIP_GET_API_URL + request_key),
    {
      enabled: request_key !== undefined,
      refetchInterval: refetchInterval,
      onSuccess: (data) => {
        console.log('success : ', data);
        setRefetchInterval(0);
      },
    },
  );

  const getAddress = async () => {
    if (setQrValue) {
      const result = await mutateAsync();
      const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${result.data.request_key}`;
      setQrValue(qrcode);
    }
  };

  return { getAddress };
};
