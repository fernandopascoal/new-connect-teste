
import { BaseButton } from '@w3block/w3block-ui-sdk';
import React from 'react';
import '@w3block/w3block-ui-sdk/dist/style.css';



const HomePage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Bem-vindo ao Consumidor do SDK</h1>
      <BaseButton size='large' variant='outlined' type='button' fullWidth>
        Teste new SDK 18.20.7
      </BaseButton> 
    </div>
  );
};

export default HomePage;