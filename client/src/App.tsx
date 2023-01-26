import React, { useState } from 'react';
import './App.css';
import { LoginForm } from './components/LoginForm';
import { MessageBox } from './components/MessageBox';

function App() {

  let [isConnected, setIsConnected] = useState(false);



  return (
    <div className="App">
      <h1>Chat TPT ugly version</h1>
      {isConnected ? <MessageBox /> : <LoginForm setLogin={() => setIsConnected(true)}/>}
      
    </div>
  );
}

export default App;
