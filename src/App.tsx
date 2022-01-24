import React, { useEffect } from 'react';
import './App.css';
import { Button } from '@mui/material';
import Caver from 'caver-js';
import {
  COUNT_ABI,
  COUNT_CONTRACT_ADDRESS,
  KAIKAS_ADDRESS,
  klaytnApiUrl,
  option,
} from './constant';

const caver: Caver = new Caver(
  new Caver.providers.HttpProvider(klaytnApiUrl, option),
);

const CountContract = new caver.contract(COUNT_ABI, COUNT_CONTRACT_ADDRESS);

const getBalance = (address: string) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(
      caver.utils.hexToNumberString(response),
      'KLAY',
    );
    console.log('balance : ', balance);
    return balance;
  });
};

// 1 smart contract 배포 주소 파악(가져오기)
// 2 caver.js 이용해서 스마트 컨트랙트 연동하기
// 3 가져온 스마트 컨트랙트 실행 결과(데이터) 웹에 표현하기

const App = (): JSX.Element => {
  const readCount = async () => {
    const _count = await CountContract.methods.count().call();
    console.log('_count : ', _count);
  };

  useEffect(() => {
    readCount();
    getBalance(KAIKAS_ADDRESS);
  }, []);

  return <Button variant='contained'>Hello World</Button>;
};

export default App;
