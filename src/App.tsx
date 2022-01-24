import React, { useEffect } from 'react';
import './App.css';
import { Button } from '@mui/material';
import Caver, { KeyringContainer } from 'caver-js';
import {
  COUNT_ABI,
  COUNT_CONTRACT_ADDRESS,
  KAIKAS_PRIVATE_KEY,
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

const setCount = async (newCount: number) => {
  try {
    const caverWallet = caver.wallet as KeyringContainer;
    // 사용할 account 설정
    const deployer =
      caverWallet.keyring.createFromPrivateKey(KAIKAS_PRIVATE_KEY);
    caverWallet.add(deployer);
    // 스마트 컨트렉트 실행 트랜잭션 날리기
    // 결과 확인

    const receipt = await CountContract.methods.setCount(newCount).send({
      from: deployer.address,
      gas: '0x4bfd200',
    });
    console.log('receipt,', receipt);
  } catch (error) {
    console.log('error : ', error);
  }
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
    getBalance(KAIKAS_PRIVATE_KEY);
    setCount(3);
  }, []);

  return <Button variant='contained'>Hello World</Button>;
};

export default App;
