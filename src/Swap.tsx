import React, { useState } from 'react';
import axios from 'axios';

console.log("🔄 Swap component loaded");

const BACKEND_API = import.meta.env.VITE_BACKEND_URL;
console.log("🔥 BACKEND_API URL:", BACKEND_API);

function Swap() {
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [amount, setAmount] = useState('');
  const [response, setResponse] = useState(null);

  const handleSwap = async () => {
    try {
      const result = await axios.post(BACKEND_API, {
        fromToken,
        toToken,
        amount
      });
      setResponse(result.data);
    } catch (error) {
      console.error(error);
      setResponse({ error: 'Swap failed' });
    }
  };

  return (
    <div>
      <h1>Kuru Swap</h1>
      <input placeholder="From Token" onChange={(e) => setFromToken(e.target.value)} />
      <input placeholder="To Token" onChange={(e) => setToToken(e.target.value)} />
      <input placeholder="Amount" type="number" onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleSwap}>Swap</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}

export default Swap;
