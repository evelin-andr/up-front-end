import React, { useState } from 'react';
import { 
  Calendar, 
  CalendarPlus,
  Users, 
  Video, 
  MapPin,
  Search,
  CheckCircle2,
  ArrowLeft,
  LayoutDashboard,
  UserPlus,
  UserCheck,
  Settings,
  ExternalLink,
  Repeat,
  FileText
} from 'lucide-react';
import folhaIcon from './folha.png';

export default function MarcarConsultaProfissional({ 
  userName = 'Dra. Maria Souza', 
  pacientes = [],
  onNavigate, 
  onAdicionarAgendamento 
}) {
  // Estados do formulário
  const [buscaPaciente, setBuscaPaciente] = useState('');
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  const [tipoSessao, setTipoSessao] = useState('Intervenção Psicopedagógica');
  const [modalidade, setModalidade] = useState('Presencial');
  const [dataConsulta, setDataConsulta] = useState('');
  const [horarioSelecionado, setHorarioSelecionado] = useState('');
  const [duracao, setDuracao] = useState('50 min');
  const [recorrencia, setRecorrencia] = useState('unica'); // 'unica' ou 'semanal'
  const [observacoes, setObservacoes] = useState('');
  const [agendamentoConcluido, setAgendamentoConcluido] = useState(false);

  const horariosDisponiveis = [
    '08:00', '09:00', '10:00', '11:00',
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const tiposDeSessao = [
    'Intervenção Psicopedagógica',
    'Avaliação Diagnóstica',
    'Anamnese com Responsáveis',
    'Devolutiva (Pais / Escola)',
    'Reavaliação'
  ];

  // Filtra a lista global de pacientes vinda do App.jsx
  const pacientesFiltrados = pacientes.filter(p =>
    p.nome.toLowerCase().includes(buscaPaciente.toLowerCase()) ||
    (p.escolaridade && p.escolaridade.toLowerCase().includes(buscaPaciente.toLowerCase())) ||
    (p.telefone && p.telefone.includes(buscaPaciente))
  );

  const abrirGoogleAgenda = () => {
    window.open('https://calendar.google.com', '_blank', 'noopener,noreferrer');
  };

  const handleConfirmarAgendamento = (e) => {
    e.preventDefault();
    if (!pacienteSelecionado || !dataConsulta || !horarioSelecionado) return;

    // Salva o novo agendamento no estado global do App.jsx
    if (onAdicionarAgendamento) {
      const dataFormatada = dataConsulta.split('-').reverse().join('/');
      onAdicionarAgendamento({
        id: Date.now(),
        type: tipoSessao,
        date: `${dataFormatada} às ${horarioSelecionado}`,
        professional: userName,
        dependent: pacienteSelecionado.nome,
        modality: modalidade,
        duration: duracao,
        recurrence: recorrencia,
        notes: observacoes,
        status: 'Confirmado'
      });
    }

    setAgendamentoConcluido(true);
  };

  const handleNovoAgendamento = () => {
    setPacienteSelecionado(null);
    setBuscaPaciente('');
    setDataConsulta('');
    setHorarioSelecionado('');
    setObservacoes('');
    setAgendamentoConcluido(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF3EC] text-gray-800 flex flex-col md:flex-row w-full notranslate" translate="no">
      
      {/* SIDEBAR DESKTOP (Mantendo o menu completo) */}
      <aside className="hidden md:flex md:w-64 bg-[#1b5e3a] text-white flex-col justify-between p-6 fixed inset-y-0 left-0 z-20 shadow-lg overflow-y-auto">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
              <img src={folhaIcon} alt="UP" className="w-5 h-5 object-contain" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-wide block leading-none">UP</span>
              <span className="text-[11px] text-emerald-200">Psicopedagogia</span>
            </div>
          </div>

          {/* Menu Principal */}
          <nav className="space-y-1">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('dashboard-profissional')}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-emerald-100 hover:bg-white/10 hover:text-white rounded-xl text-sm font-medium transition cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              Visão Geral
            </button>

            <button
              type="button"
              onClick={abrirGoogleAgenda}
              className="w-full flex items-center justify-between px-4 py-2.5 text-emerald-100 hover:bg-white/10 hover:text-white rounded-xl text-sm font-medium transition cursor-pointer"
              title="Abrir Google Agenda em nova aba"
            >
              <span className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                Agenda
              </span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </button>

            {/* Item Ativo */}
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('marcar-consulta-profissional')}
              className="w-full flex items-center gap-3 px-4 py-2.5 bg-white/15 text-white rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4" />
              Marcar Consulta
            </button>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('pacientes')}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-emerald-100 hover:bg-white/10 hover:text-white rounded-xl text-sm font-medium transition cursor-pointer"
            >
              <Users className="w-4 h-4" />
              Meus Pacientes
            </button>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('cadastrar-paciente')}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-emerald-100 hover:bg-white/10 hover:text-white rounded-xl text-sm font-medium transition cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              Novo Paciente
            </button>

            <div className="pt-3 mt-3 border-t border-white/10 space-y-1">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('minha-conta')}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-emerald-100 hover:bg-white/10 hover:text-white rounded-xl text-sm font-medium transition cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                Minha Conta
              </button>

              <button
                type="button"
                onClick={() => onNavigate && onNavigate('configuracoes')}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-emerald-100 hover:bg-white/10 hover:text-white rounded-xl text-sm font-medium transition cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                Configurações
              </button>
            </div>
          </nav>
        </div>

        <div className="pt-4 border-t border-white/15 mt-6">
          <p className="text-xs text-emerald-200/80 px-2">Versão 1.0.0</p>
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen pb-24 md:pb-10">
        
        {/* Cabeçalho Superior */}
        <header className="bg-white border-b border-gray-100 px-5 md:px-10 py-4 sticky top-0 z-10 shadow-sm">
          <div className="max-w-5xl mx-auto flex justify-between items-center gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('dashboard-profissional')}
                className="p-2 rounded-xl bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-[#1b5e3a] transition cursor-pointer"
                title="Voltar ao Início"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-base md:text-xl font-bold text-gray-800">Marcar Consulta</h1>
                <p className="text-[11px] md:text-xs text-gray-500">Agende sessões para seus pacientes e sincronize com o Google Agenda</p>
              </div>
            </div>

            <button 
              type="button"
              onClick={() => onNavigate && onNavigate('cadastrar-paciente')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 text-[#1b5e3a] border border-emerald-200 text-xs font-bold rounded-xl hover:bg-emerald-100 transition cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              Novo Paciente
            </button>
          </div>
        </header>

        {/* Conteúdo */}
        <main className="flex-1 px-4 md:px-10 py-6 max-w-5xl mx-auto w-full">
          
          {agendamentoConcluido ? (
            /* TELA DE CONFIRMAÇÃO DO AGENDAMENTO */
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-lg mx-auto text-center space-y-5 mt-4">
              <div className="w-16 h-16 bg-emerald-50 text-[#1b5e3a] rounded-2xl flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Consulta Agendada!</h2>
                <p className="text-xs text-gray-500 mt-1">
                  O horário foi reservado e sincronizado com a sua agenda.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Paciente:</span>
                  <span className="font-bold text-gray-800">{pacienteSelecionado?.nome}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tipo de Sessão:</span>
                  <span className="font-semibold text-gray-800">{tipoSessao}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Data e Horário:</span>
                  <span className="font-bold text-[#1b5e3a]">
                    {dataConsulta.split('-').reverse().join('/')} às {horarioSelecionado}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Modalidade:</span>
                  <span className="font-semibold text-gray-800">{modalidade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Frequência:</span>
                  <span className="font-semibold text-gray-800">
                    {recorrencia === 'semanal' ? 'Semanal (recorrente)' : 'Sessão única'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleNovoAgendamento}
                  className="flex-1 py-3 bg-emerald-50 text-[#1b5e3a] font-bold rounded-xl text-xs hover:bg-emerald-100 transition cursor-pointer"
                >
                  Agendar Outra Consulta
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('dashboard-profissional')}
                  className="flex-1 py-3 bg-[#1b5e3a] text-white font-bold rounded-xl text-xs hover:bg-[#14472c] transition shadow-sm cursor-pointer"
                >
                  Voltar ao Dashboard
                </button>
              </div>
            </div>
          ) : (
            /* FORMULÁRIO DE AGENDAMENTO DO PROFISSIONAL */
            <form onSubmit={handleConfirmarAgendamento} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Coluna Esquerda (2 spans): Seleção de Paciente, Detalhes e Horário */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* ETAPA 1: Selecionar Paciente */}
                <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1b5e3a] uppercase tracking-wider">
                      1. Selecione o Paciente
                    </span>
                    {pacienteSelecionado && (
                      <button
                        type="button"
                        onClick={() => setPacienteSelecionado(null)}
                        className="text-xs text-gray-400 hover:text-red-500 font-medium cursor-pointer"
                      >
                        Trocar paciente
                      </button>
                    )}
                  </div>

                  {!pacienteSelecionado ? (
                    <div className="space-y-3">
                      <div className="relative">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={buscaPaciente}
                          onChange={(e) => setBuscaPaciente(e.target.value)}
                          placeholder="Buscar por nome, escolaridade ou telefone..."
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b5e3a] bg-gray-50/50"
                        />
                      </div>

                      <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
                        {pacientesFiltrados.map((paciente) => (
                          <div
                            key={paciente.id}
                            onClick={() => setPacienteSelecionado(paciente)}
                            className="p-3 rounded-xl border border-gray-100 hover:border-[#1b5e3a] hover:bg-emerald-50/40 transition flex items-center justify-between cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              {paciente.foto ? (
                                <img 
                                  src={paciente.foto} 
                                  alt={paciente.nome} 
                                  className="w-9 h-9 rounded-full object-cover border border-gray-200"
                                />
                              ) : (
                                <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#1b5e3a] font-bold text-xs flex items-center justify-center">
                                  {paciente.nome.charAt(0)}
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-bold text-gray-800">
                                  {paciente.nome}{' '}
                                  <span className="text-xs font-normal text-gray-500">
                                    ({paciente.idade} anos)
                                  </span>
                                </p>
                                <p className="text-xs text-gray-500">
                                  {paciente.escolaridade} • {paciente.telefone}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-[#1b5e3a]">Selecionar</span>
                          </div>
                        ))}
                        {pacientesFiltrados.length === 0 && (
                          <p className="text-xs text-gray-500 text-center py-4">
                            Nenhum paciente encontrado.{' '}
                            <button
                              type="button"
                              onClick={() => onNavigate && onNavigate('cadastrar-paciente')}
                              className="text-[#1b5e3a] font-bold hover:underline cursor-pointer"
                            >
                              Cadastrar novo
                            </button>
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {pacienteSelecionado.foto && (
                          <img 
                            src={pacienteSelecionado.foto} 
                            alt={pacienteSelecionado.nome} 
                            className="w-10 h-10 rounded-full object-cover border border-emerald-300"
                          />
                        )}
                        <div>
                          <p className="text-sm font-bold text-[#1b5e3a]">{pacienteSelecionado.nome}</p>
                          <p className="text-xs text-gray-600">
                            {pacienteSelecionado.idade} anos • {pacienteSelecionado.escolaridade}
                          </p>
                        </div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-[#1b5e3a]" />
                    </div>
                  )}
                </div>

                {/* ETAPA 2: Tipo de Sessão e Modalidade */}
                <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
                  <span className="text-xs font-bold text-[#1b5e3a] uppercase tracking-wider block">
                    2. Detalhes da Sessão
                  </span>

                  {/* Tipo de Atendimento */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Tipo de Atendimento:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {tiposDeSessao.map((tipo) => (
                        <button
                          key={tipo}
                          type="button"
                          onClick={() => setTipoSessao(tipo)}
                          className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left border transition cursor-pointer ${
                            tipoSessao === tipo
                              ? 'bg-[#1b5e3a] text-white border-[#1b5e3a] shadow-xs'
                              : 'bg-gray-50/60 text-gray-700 border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          {tipo}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Modalidade e Duração */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2">Modalidade:</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setModalidade('Presencial')}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition cursor-pointer ${
                            modalidade === 'Presencial'
                              ? 'bg-emerald-50 text-[#1b5e3a] border-[#1b5e3a]'
                              : 'bg-white text-gray-600 border-gray-200'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          Presencial
                        </button>
                        <button
                          type="button"
                          onClick={() => setModalidade('Online (Google Meet)')}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition cursor-pointer ${
                            modalidade === 'Online (Google Meet)'
                              ? 'bg-emerald-50 text-[#1b5e3a] border-[#1b5e3a]'
                              : 'bg-white text-gray-600 border-gray-200'
                          }`}
                        >
                          <Video className="w-3.5 h-3.5" />
                          Online
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2">Duração da Sessão:</label>
                      <select
                        value={duracao}
                        onChange={(e) => setDuracao(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#1b5e3a]"
                      >
                        <option value="40 min">40 minutos</option>
                        <option value="50 min">50 minutos (Padrão)</option>
                        <option value="60 min">1 hora (Avaliação / Devolutiva)</option>
                        <option value="90 min">1h 30min</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* ETAPA 3: Data, Horário e Recorrência */}
                <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
                  <span className="text-xs font-bold text-[#1b5e3a] uppercase tracking-wider block">
                    3. Data e Horário
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Data:</label>
                      <input
                        type="date"
                        value={dataConsulta}
                        onChange={(e) => setDataConsulta(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1b5e3a]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Frequência:</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setRecorrencia('unica')}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                            recorrencia === 'unica'
                              ? 'bg-emerald-50 text-[#1b5e3a] border-[#1b5e3a]'
                              : 'bg-white text-gray-600 border-gray-200'
                          }`}
                        >
                          Sessão Única
                        </button>
                        <button
                          type="button"
                          onClick={() => setRecorrencia('semanal')}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 border transition cursor-pointer ${
                            recorrencia === 'semanal'
                              ? 'bg-emerald-50 text-[#1b5e3a] border-[#1b5e3a]'
                              : 'bg-white text-gray-600 border-gray-200'
                          }`}
                        >
                          <Repeat className="w-3.5 h-3.5" />
                          Semanal
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Grade de Horários */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Horários Disponíveis:</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {horariosDisponiveis.map((hora) => (
                        <button
                          key={hora}
                          type="button"
                          onClick={() => setHorarioSelecionado(hora)}
                          className={`py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                            horarioSelecionado === hora
                              ? 'bg-[#1b5e3a] text-white border-[#1b5e3a] shadow-xs'
                              : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          {hora}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Observações */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Observações internas (opcional):
                    </label>
                    <textarea
                      rows="2"
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                      placeholder="Ex: Aplicar teste WISC-IV, solicitar caderno escolar..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1b5e3a]"
                    />
                  </div>
                </div>

              </div>

              {/* Coluna Direita (1 span): Resumo e Confirmação */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5 lg:sticky lg:top-24">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <FileText className="w-4 h-4 text-[#1b5e3a]" />
                  <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Resumo do Agendamento
                  </h2>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-gray-400 block">Paciente</span>
                    <span className="font-bold text-gray-800 text-sm">
                      {pacienteSelecionado ? pacienteSelecionado.nome : 'Nenhum selecionado'}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-400 block">Atendimento</span>
                    <span className="font-semibold text-gray-700">{tipoSessao}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="text-gray-400 block">Modalidade</span>
                      <span className="font-semibold text-gray-700">{modalidade}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Duração</span>
                      <span className="font-semibold text-gray-700">{duracao}</span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <span className="text-gray-400 block">Data e Hora</span>
                    <span className="font-bold text-[#1b5e3a] text-sm">
                      {dataConsulta && horarioSelecionado
                        ? `${dataConsulta.split('-').reverse().join('/')} às ${horarioSelecionado}`
                        : 'Selecione data e horário'}
                    </span>
                  </div>

                  {recorrencia === 'semanal' && (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-[11px] text-amber-800 font-medium">
                      Este horário será reservado semanalmente no Google Agenda.
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!pacienteSelecionado || !dataConsulta || !horarioSelecionado}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs transition shadow-sm cursor-pointer ${
                    pacienteSelecionado && dataConsulta && horarioSelecionado
                      ? 'bg-[#1b5e3a] text-white hover:bg-[#14472c]'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Confirmar Agendamento
                </button>
              </div>

            </form>
          )}

        </main>
      </div>

      {/* NAVEGAÇÃO INFERIOR MOBILE */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-3 py-2 flex justify-around items-center z-20 shadow-lg">
        <button 
          type="button"
          onClick={() => onNavigate && onNavigate('dashboard-profissional')}
          className="flex flex-col items-center text-gray-400 hover:text-[#1b5e3a] gap-1 cursor-pointer"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Início</span>
        </button>
        <button 
          type="button"
          onClick={abrirGoogleAgenda}
          className="flex flex-col items-center text-gray-400 hover:text-[#1b5e3a] gap-1 cursor-pointer"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Agenda</span>
        </button>
        <button 
          type="button"
          onClick={() => onNavigate && onNavigate('marcar-consulta-profissional')}
          className="flex flex-col items-center text-[#1b5e3a] gap-1 cursor-pointer"
        >
          <CalendarPlus className="w-5 h-5" />
          <span className="text-[10px] font-bold">Marcar</span>
        </button>
        <button 
          type="button"
          onClick={() => onNavigate && onNavigate('pacientes')}
          className="flex flex-col items-center text-gray-400 hover:text-[#1b5e3a] gap-1 cursor-pointer"
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Pacientes</span>
        </button>
        <button 
          type="button"
          onClick={() => onNavigate && onNavigate('minha-conta')}
          className="flex flex-col items-center text-gray-400 hover:text-[#1b5e3a] gap-1 cursor-pointer"
        >
          <UserCheck className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Conta</span>
        </button>
      </nav>

    </div>
  );
}