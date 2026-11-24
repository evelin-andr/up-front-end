import React, { useState } from 'react';
import {  
  Search, 
  ChevronRight, 
  Calendar, 
  CalendarPlus,
  Users, 
  UserPlus, 
  UserCheck,
  LayoutDashboard,
  Settings,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import folhaIcon from './folha.png';

export default function Pacientes({ 
  pacientes = [], 
  setPacientes, 
  onNavigate, 
  onSelectPatient, 
  userName = 'Dra. Maria Souza', 
  profilePic = null 
}) {
  const [abaAtiva, setAbaAtiva] = useState('ativos');
  const [busca, setBusca] = useState('');

  const abrirGoogleAgenda = () => {
    window.open('https://calendar.google.com', '_blank', 'noopener,noreferrer');
  };

  const pacientesAtivos = pacientes.filter((p) => (p.status || 'ativo') === 'ativo');
  const pacientesInativos = pacientes.filter((p) => (p.status || 'ativo') === 'inativo');

  const baseLista = abaAtiva === 'ativos' ? pacientesAtivos : pacientesInativos;

  const pacientesFiltrados = baseLista.filter((p) => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return true;
    return (
      (p.nome && p.nome.toLowerCase().includes(termo)) ||
      (p.escolaridade && p.escolaridade.toLowerCase().includes(termo))
    );
  });

  return (
    <div className="min-h-screen bg-[#FAF3EC] text-gray-800 flex flex-col md:flex-row w-full notranslate" translate="no">

      {/* SIDEBAR DESKTOP */}
      <aside className="hidden md:flex md:w-64 bg-[#1b5e3a] text-white flex-col justify-between p-6 fixed inset-y-0 left-0 z-20 shadow-lg overflow-y-auto">
        <div className="space-y-6">
          <div 
            onClick={() => onNavigate && onNavigate('dashboard-profissional')}
            className="flex items-center gap-3 px-2 cursor-pointer"
          >
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
              <img src={folhaIcon} alt="UP" className="w-5 h-5 object-contain" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-wide block leading-none">UP</span>
              <span className="text-[11px] text-emerald-200">Psicopedagogia</span>
            </div>
          </div>

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
            >
              <span className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                Agenda
              </span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('marcar-consulta-profissional')}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-emerald-100 hover:bg-white/10 hover:text-white rounded-xl text-sm font-medium transition cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4" />
              Marcar Consulta
            </button>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('pacientes')}
              className="w-full flex items-center gap-3 px-4 py-2.5 bg-white/15 text-white rounded-xl text-sm font-semibold transition cursor-pointer"
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
                onClick={() => onNavigate && onNavigate('configuracoes-profissional')}
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
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen pb-12">
        
        {/* CABEÇALHO PADRÃO (Com Voltar e Título Centralizado) */}
        <header className="bg-white border-b border-gray-100 px-4 py-3.5 sticky top-0 z-10 shadow-sm flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('dashboard-profissional')}
            className="flex items-center gap-1 text-xs font-bold text-[#1b5e3a] hover:opacity-80 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <h1 className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center">
            Meus Pacientes
          </h1>

          <div className="w-12"></div>
        </header>

        {/* Conteúdo Centralizado */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-5 md:px-10 py-6 md:py-8 space-y-4">
          
          {/* Abas de Filtro: Ativos e Inativos */}
          <div className="bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setAbaAtiva('ativos')}
              className={`py-2.5 text-xs md:text-sm font-bold rounded-xl transition cursor-pointer ${
                abaAtiva === 'ativos' 
                  ? 'bg-[#1b5e3a] text-white shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              Ativos ({pacientesAtivos.length})
            </button>
            <button
              type="button"
              onClick={() => setAbaAtiva('inativos')}
              className={`py-2.5 text-xs md:text-sm font-bold rounded-xl transition cursor-pointer ${
                abaAtiva === 'inativos' 
                  ? 'bg-[#1b5e3a] text-white shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              Inativos ({pacientesInativos.length})
            </button>
          </div>

          {/* BOTÃO CADASTRAR PACIENTE */}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('cadastrar-paciente')}
            className="w-full py-3 bg-emerald-50 text-[#1b5e3a] border border-emerald-200 text-xs md:text-sm font-bold rounded-2xl hover:bg-emerald-100 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <UserPlus className="w-4 h-4" />
            <span>Cadastrar Novo Paciente</span>
          </button>

          {/* Barra de Pesquisa */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Pesquisar paciente pelo nome ou escolaridade..."
              className="w-full bg-white pl-11 pr-4 py-3 rounded-2xl border border-gray-100 shadow-sm text-xs md:text-sm focus:outline-none focus:border-[#1b5e3a] transition"
            />
          </div>

          {/* Lista de Cartões de Pacientes */}
          <div className="space-y-3">
            {pacientesFiltrados.length === 0 ? (
              <div className="bg-white p-10 rounded-2xl border border-gray-100 text-center space-y-1 shadow-sm">
                <p className="text-sm font-semibold text-gray-600">
                  {abaAtiva === 'ativos'
                    ? 'Nenhum paciente ativo encontrado'
                    : 'Nenhum paciente inativo encontrado'}
                </p>
                <p className="text-xs text-gray-400">
                  Tente buscar por outro nome ou escolaridade.
                </p>
              </div>
            ) : (
              pacientesFiltrados.map((paciente) => (
                <div 
                  key={paciente.id}
                  onClick={() => onSelectPatient && onSelectPatient(paciente)}
                  className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#1b5e3a]/40 transition group cursor-pointer"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {paciente.foto || paciente.avatar ? (
                      <img 
                        src={paciente.foto || paciente.avatar} 
                        alt={paciente.nome} 
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border border-gray-100 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-emerald-50 text-[#1b5e3a] font-bold text-base flex items-center justify-center shrink-0">
                        {paciente.nome.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h2 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-[#1b5e3a] transition">
                        {paciente.nome}
                      </h2>
                      <p className="text-[11px] md:text-xs text-gray-500 mt-0.5">
                        {paciente.idade} anos {paciente.escolaridade ? `• ${paciente.escolaridade}` : ''}
                      </p>
                      {paciente.ultimaConsulta && (
                        <span className="inline-block mt-1.5 text-[10px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                          Última sessão: {paciente.ultimaConsulta}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-gray-400 group-hover:text-[#1b5e3a] transition">
                    <span className="hidden sm:inline">Prontuário</span>
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}