import React, { useState } from 'react';
import './App.css';
import { LoginForm } from './components/LoginForm';
import { MainScreen } from './components/MainScreen';

function App() {

  let [isConnected, setIsConnected] = useState(false);



  return (
    <div className="App">
      <h1>Chat TPT ugly version</h1>
      {isConnected ? <MainScreen setLogin={() => setIsConnected(false)}/> : <LoginForm setLogin={() => setIsConnected(true)}/>}
      
    </div>
  );
}

export default App;
