import React, { useState } from 'react';
import Login from './assets/Login';
import Register from './assets/Register';
import Dashboard from './assets/Dashboard'; 

function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'login' ou 'register'

  return (
    <div>
      {currentScreen === 'login' && (
        <Login 
          onSwitchToRegister={() => setCurrentScreen('register')} 
        />
      )}
      {currentScreen === 'register' && (
        <Register 
          onSwitchToLogin={() => setCurrentScreen('login')} 
        />
      )}
      {currentScreen === 'dashboard' && (
        <Dashboard 
          onLogout={() => setCurrentScreen('login')} 
        />
      )}
    </div>
  );
}
export default App;