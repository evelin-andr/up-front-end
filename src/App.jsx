import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard'; 
import MinhaConta from './MinhaConta';
import Dependentes from './Dependentes'; 
import Agendamentos from './Agendamentos'; 
import SelecionarConsulta from './SelecionarConsulta';
import NovoAgendamento from './NovoAgendamento';
import AlterarSenha from './AlterarSenha';
import EsqueciSenha from './EsqueciSenha';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [userName, setUserName] = useState('Maria Souza');
  const [profilePic, setProfilePic] = useState(null);
  const [dadosAgendamento, setDadosAgendamento] = useState(null);

  // Estado global dos agendamentos (incluindo os iniciais)
  const [agendamentos, setAgendamentos] = useState([
    {
      id: 1,
      type: "Avaliação Psicopedagógica",
      date: "12 de junho de 2026 às 14h30",
      professional: "Dra. Ana Beatriz",
      dependent: "Lucas Souza",
      status: "Confirmado"
    },
    {
      id: 2,
      type: "Sessão de Acompanhamento",
      date: "28 de maio de 2026 às 10:00",
      professional: "Dra. Ana Beatriz",
      dependent: "Lucas Souza",
      status: "Realizado"
    }
  ]);

  // Função para adicionar um novo agendamento vindo do fluxo de marcação
  const handleAdicionarAgendamento = (novoItem) => {
    setAgendamentos([novoItem, ...agendamentos]);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <Login 
            onSwitchToRegister={() => setCurrentScreen('register')} 
            onNavigate={setCurrentScreen} 
          />
        );
        case 'register':
          return <Register onSwitchToLogin={() => setCurrentScreen('login')} />;
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
            setUserName={setUserName}
            profilePic={profilePic} 
            setProfilePic={setProfilePic} 
            onNavigate={setCurrentScreen} 
            onLogout={() => setCurrentScreen('login')} 
          />
        );
      case 'dependentes':
        return <Dependentes onNavigate={setCurrentScreen} />;
      case 'agendamentos':
        return (
          <Agendamentos 
            agendamentos={agendamentos}
            setAgendamentos={setAgendamentos}
            onNavigate={setCurrentScreen} 
          />
        );
      case 'selecionar-consulta':
        return (
          <SelecionarConsulta 
            onNavigate={setCurrentScreen} 
            setDadosAgendamento={setDadosAgendamento}
          />
        );
      case 'novo-agendamento':
        return (
          <NovoAgendamento 
            onNavigate={setCurrentScreen} 
            dadosAgendamento={dadosAgendamento}
            onAdicionarAgendamento={handleAdicionarAgendamento}
          />
        );
        case 'esqueci-senha':
        return <EsqueciSenha onNavigate={setCurrentScreen} />;
      default:
        return (
          <Dashboard 
            userName={userName} 
            profilePic={profilePic} 
            onNavigate={setCurrentScreen} 
            onLogout={() => setCurrentScreen('login')} 
          />
        );
        case 'alterar-senha':
        return <AlterarSenha onNavigate={setCurrentScreen} />;
        case 'esqueci-senha':
        return <EsqueciSenha onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="font-sans bg-ivory min-h-screen">
      {renderScreen()}
    </div>
  );
}