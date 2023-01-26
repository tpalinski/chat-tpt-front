import React, { useState } from 'react';
import './App.css';
import { LoginForm } from './components/LoginForm';

function App() {

  let [isConnected, setIsConnected] = useState(false);



  return (
    <div className="App">
      <h1>Chat TPT ugly version</h1>
      {isConnected ? "Logged in" : <LoginForm setLogin={() => setIsConnected(true)}/>}
      
    </div>
  );
}

export default App;
