import React, { ReactElement } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Button } from '@mui/material';

const queryClient = new QueryClient();

const App = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <Button variant='contained'>Hello World</Button>
    </QueryClientProvider>
  );
};

export default App;
