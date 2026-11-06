import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard'; 
import MinhaConta from './MinhaConta';
import Dependentes from './Dependentes'; 
import Agendamentos from './Agendamentos'; 
import NovoAgendamento from './NovoAgendamento';
import SelecionarConsulta from './SelecionarConsulta';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [userName, setUserName] = useState('Maria Souza');
  const [profilePic, setProfilePic] = useState(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <Login onNavigate={setCurrentScreen} />;
      case 'register':
        return <Register onNavigate={setCurrentScreen} />;
      case 'dashboard':
        return (
          <Dashboard 
            userName={userName} 
            profilePic={profilePic} 
            onNavigate={setCurrentScreen} 
            onLogout={() => setCurrentScreen('login')} 
          />
        );
      case 'minha-conta':
        return (
          <MinhaConta 
            userName={userName} 
            profilePic={profilePic} 
            setProfilePic={setProfilePic} 
            onNavigate={setCurrentScreen} 
            onLogout={() => setCurrentScreen('login')} 
          />
        );
      case 'dependentes':
        return (
          <Dependentes 
            onNavigate={setCurrentScreen} 
          />
        );
        case 'agendamentos':
        return (
          <Agendamentos 
            onNavigate={setCurrentScreen} 
          />
        );
        case 'novo-agendamento':
        return (
          <NovoAgendamento 
            onNavigate={setCurrentScreen} 
          />
        );
        case 'selecionar-consulta':
        return (
          <SelecionarConsulta 
            onNavigate={setCurrentScreen} 
          />
        );
      case 'novo-agendamento':
        return (
          <NovoAgendamento 
            onNavigate={setCurrentScreen} 
          />
        );
      default:
        return (
          <Dashboard 
            userName={userName} 
            profilePic={profilePic} 
            onNavigate={setCurrentScreen} 
            onLogout={() => setCurrentScreen('login')} 
          />
        );
    }
  };

  return (
    <div className="font-sans bg-ivory min-h-screen">
      {renderScreen()}
    </div>
  );
}