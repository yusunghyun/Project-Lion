import React, { useState } from 'react';
import './App.css';
import { Button } from '@mui/material';
import QRCode from 'qrcode.react';
import { getAddress } from './api/useKlip';

const DEFAULT_QR_CODE = 'DEFAULT';

const App = (): JSX.Element => {
  const [balance, setBalance] = useState<string>('0');
  const [qrValue, setQrValue] = useState<string>(DEFAULT_QR_CODE);
  const onClickGetAddress = () => {
    getAddress(setQrValue);
  };

  return (
    <>
      <Button variant='contained' onClick={onClickGetAddress}>
        클립 주소 가져오기
      </Button>
      <QRCode value={qrValue} />
    </>
  );
};

export default App;
