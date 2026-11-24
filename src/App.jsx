import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import MinhaConta from './MinhaConta';
import Dashboard from './Dashboard';
import Dependentes from './Dependentes';
import Agendamentos from './Agendamentos';
import SelecionarConsulta from './SelecionarConsulta';
import NovoAgendamento from './NovoAgendamento';
import AlterarSenha from './AlterarSenha';
import EsqueciSenha from './EsqueciSenha';
import DashboardProfissional from './DashboardProfissional';
import MarcarConsultaProfissional from './MarcarConsultaProfissional';
import Pacientes from './Pacientes';
import DetalhePaciente from './DetalhePaciente';
import CadastrarPaciente from './CadastrarPaciente';
import MinhaContaProfissional from './MinhaContaProfissional';
import ConfiguracoesProfissional from './ConfiguracoesProfissional';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard-profissional');
  const [userName, setUserName] = useState('Dra. Maria Souza');
  const [profilePic, setProfilePic] = useState(null);
  const [dadosAgendamento, setDadosAgendamento] = useState(null);

  // Estado para controlar qual paciente está selecionado na ficha detalhada
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Estado global de pacientes preenchido com todos os novos campos
  const [pacientes, setPacientes] = useState([
    {
      id: 1,
      nome: "João Silva",
      username: "joao_silva",
      email: "joao.silva@email.com",
      telefone: "(85) 98888-1234",
      cpf: "123.456.789-00",
      idade: 10,
      escolaridade: "5º Ano Fundamental",
      ultimaConsulta: "Hoje, 09:00",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
      categoria: 'meus'
    },
    {
      id: 2,
      nome: "Ana Lima",
      username: "ana_lima",
      email: "ana.lima@email.com",
      telefone: "(85) 97777-4321",
      cpf: "987.654.321-11",
      idade: 16,
      escolaridade: "2º Ano Ensino Médio",
      ultimaConsulta: "Ontem, 10:30",
      foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
      categoria: 'meus'
    },
    {
      id: 3,
      nome: "Carlos Souza",
      username: "carlos_souza",
      email: "carlos.souza@email.com",
      telefone: "(85) 96666-5678",
      cpf: "456.789.123-22",
      idade: 7,
      escolaridade: "2º Ano Fundamental",
      ultimaConsulta: "10/05/2026",
      foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
      categoria: 'meus'
    },
    {
      id: 4,
      nome: "Beatriz Costa",
      username: "beatriz_costa",
      email: "beatriz.costa@email.com",
      telefone: "(85) 95555-9988",
      cpf: "789.123.456-33",
      idade: 12,
      escolaridade: "7º Ano Fundamental",
      ultimaConsulta: "02/05/2026",
      foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
      categoria: 'clinica'
    }
  ]);

  // Estado global dos agendamentos (incluindo os iniciais)
  const [agendamentos, setAgendamentos] = useState([
    {
      id: 1,
      type: "Avaliação Psicopedagógica",
      date: "12 de junho de 2026 às 14h30",
      professional: "Dra. Maria Souza",
      dependent: "João Silva",
      status: "Confirmado"
    },
    {
      id: 2,
      type: "Sessão de Acompanhamento",
      date: "28 de maio de 2026 às 10:00",
      professional: "Dra. Maria Souza",
      dependent: "Ana Lima",
      status: "Realizado"
    }
  ]);

  // Estado global das configurações da agenda do profissional
  const [configAgenda, setConfigAgenda] = useState({
    emailAgenda: 'maria.souza@consultorio.com.br',
    tiposAtendimento: [
      { id: 1, nome: 'Intervenção Psicopedagógica', duracao: '50 min', modalidade: 'Presencial' },
      { id: 2, nome: 'Avaliação Diagnóstica', duracao: '60 min', modalidade: 'Presencial' },
      { id: 3, nome: 'Anamnese com Responsáveis', duracao: '60 min', modalidade: 'Presencial' },
      { id: 4, nome: 'Devolutiva (Pais / Escola)', duracao: '45 min', modalidade: 'Presencial' },
      { id: 5, nome: 'Reavaliação', duracao: '50 min', modalidade: 'Presencial' }
    ],
    modalidadePadrao: 'Presencial'
  });

  // Função para adicionar um novo agendamento vindo do fluxo de marcação
  const handleAdicionarAgendamento = (novoItem) => {
    setAgendamentos([novoItem, ...agendamentos]);
  };

  // Função para adicionar um novo paciente vindo de CadastrarPaciente.jsx
  const handleAdicionarPaciente = (novoPaciente) => {
    setPacientes([novoPaciente, ...pacientes]);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <Login
            onSwitchToRegister={() => setCurrentScreen('register')}
            onNavigate={setCurrentScreen}
            onLoginSuccess={() => setCurrentScreen('dashboard-profissional')}
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
      case 'dashboard-profissional':
        return (
          <DashboardProfissional
            userName={userName}
            profilePic={profilePic}
            onNavigate={setCurrentScreen}
            onLogout={() => setCurrentScreen('login')}
          />
        );

      case 'marcar-consulta-profissional':
        return (
          <MarcarConsultaProfissional
            userName={userName}
            pacientes={pacientes}
            onNavigate={setCurrentScreen}
            onAdicionarAgendamento={handleAdicionarAgendamento}
          />
        );

      // Rota de Conta do Paciente
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

      // Rota de Conta do Profissional
      case 'minha-conta-profissional':
        return (
          <MinhaContaProfissional
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

      case 'alterar-senha':
        return <AlterarSenha onNavigate={setCurrentScreen} />;

      case 'esqueci-senha':
        return <EsqueciSenha onNavigate={setCurrentScreen} />;

      // --- ROTAS DO PROFISSIONAL (PACIENTES) ---
      case 'pacientes':
        return (
          <Pacientes
            pacientes={pacientes}
            setPacientes={setPacientes}
            onNavigate={setCurrentScreen}
            onSelectPatient={(patient) => {
              setSelectedPatient(patient);
              setCurrentScreen('detalhe-paciente');
            }}
          />
        );

      case 'cadastrar-paciente':
        return (
          <CadastrarPaciente
            onNavigate={setCurrentScreen}
            onSavePatient={handleAdicionarPaciente}
          />
        );

      case 'detalhe-paciente':
        return (
          <DetalhePaciente
            patient={selectedPatient}
            onNavigate={setCurrentScreen}
            onUpdatePatient={(pacienteAtualizado) => {
              setPacientes(pacientes.map(p => p.id === pacienteAtualizado.id ? pacienteAtualizado : p));
              setSelectedPatient(pacienteAtualizado);
            }}
            onDeletePatient={(id) => {
              setPacientes(pacientes.filter(p => p.id !== id));
            }}
          />
        );

      case 'configuracoes-profissional':
        return (
          <ConfiguracoesProfissional
            userName={userName}
            agendaEmailInicial={configAgenda.emailAgenda}
            tiposAtendimentoInicial={configAgenda.tiposAtendimento}
            modalidadePadraoInicial={configAgenda.modalidadePadrao}
            onNavigate={setCurrentScreen}
            onSalvarConfiguracoes={(novasConfig) => {
              setConfigAgenda(novasConfig);
            }}
          />
        );

      default:
        return (
          <DashboardProfissional
            userName={userName}
            profilePic={profilePic}
            onNavigate={setCurrentScreen}
            onLogout={() => setCurrentScreen('login')}
          />
        );
    }
  };

  return (
    <div className="font-sans bg-[#FAF3EC] min-h-screen text-gray-800 notranslate" translate="no">
      {renderScreen()}
    </div>
  );
}