
import { BaseButton } from '@w3block/w3block-ui-sdk';
import { Hello } from 'new-sdk-w3block';
import React from 'react';
import '@w3block/w3block-ui-sdk/dist/style.css';



const HomePage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Bem-vindo ao Consumidor do SDK</h1>
      <Hello />
      <BaseButton size='large' variant='outlined' type='button' fullWidth>
        Teste new SDK
      </BaseButton> 
    </div>
  );
};

export default HomePage;