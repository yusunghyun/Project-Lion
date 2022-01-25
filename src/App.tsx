import React, { useEffect } from 'react';
import './App.css';
import { Button } from '@mui/material';
import { getBalance, readCount, setCount } from './api/useCaver';
import { KAIKAS_ADDRESS } from './constants/constants.baobab';

// 1 smart contract 배포 주소 파악(가져오기)
// 2 caver.js 이용해서 스마트 컨트랙트 연동하기
// 3 가져온 스마트 컨트랙트 실행 결과(데이터) 웹에 표현하기

const App = (): JSX.Element => {
  useEffect(() => {
    readCount();
    getBalance(KAIKAS_ADDRESS);
    setCount(3);
  }, []);

  return <Button variant='contained'>Hello World</Button>;
};

export default App;
