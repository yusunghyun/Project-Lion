import React, { useState } from 'react';
import './App.css';
import { Button } from '@mui/material';
import QRCode from 'qrcode.react';
import { useGetAddress, useSetCount } from './api/useKlip';

const DEFAULT_QR_CODE = 'DEFAULT';

const App = (): JSX.Element => {
  //state data

  //global data
  //address
  //nft
  const [balance, setBalance] = useState<string>('0');

  //ui
  const [qrValue, setQrValue] = useState<string>(DEFAULT_QR_CODE);
  const { getAddress } = useGetAddress(setQrValue);
  const { setCount } = useSetCount(setQrValue);
  //mintInput

  //modal

  //fetchMarketNFTs
  //fetch
  //getbalance(0xsfsdfdsfsdf????)

  const onClickGetAddress = () => {
    getAddress();
  };
  const onClickSetCount = () => {
    setCount(2000);
  };

  return (
    <>
      <Button variant='contained' onClick={onClickGetAddress}>
        클립 주소 가져오기
      </Button>
      <Button variant='contained' onClick={onClickSetCount}>
        카운트 변경
      </Button>
      <QRCode value={qrValue} />
    </>
  );
};

export default App;
