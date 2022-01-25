import React, { useState } from 'react';
import './App.css';
import { Button } from '@mui/material';
import QRCode from 'qrcode.react';

const App = (): JSX.Element => {
  const [balance, setBalance] = useState<string>('0');

  const onClickGetAddress = () => {};

  return (
    <>
      <Button variant='contained' onClick={onClickGetAddress}>
        {balance}
      </Button>
      <QRCode value='DEFAULT' />
    </>
  );
};

export default App;
