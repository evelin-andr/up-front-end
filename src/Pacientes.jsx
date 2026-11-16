import React, { useState } from 'react';
import logoImg from './folha.png';
import { Search, ChevronRight, Home, Calendar, Users, User, UserPlus, LogOut } from 'lucide-react';

export default function Pacientes({ pacientes = [], setPacientes, onNavigate, onSelectPatient, userName = "Dra. Maria Souza", profilePic, onLogout }) {
  const [abaAtiva, setAbaAtiva] = useState('meus');
  const [busca, setBusca] = useState('');

  // Filtragem por aba e busca por nome
  const pacientesFiltrados = pacientes.filter(p => {
    const matchAba = abaAtiva === 'meus' ? p.categoria === 'meus' : true;
    const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
    return matchAba && matchBusca;
  });

  const handleOpenGoogleCalendar = () => {
    window.open('https://calendar.google.com', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF3EC] text-gray-800 flex w-full notranslate" translate="no">

      {/* MENU LATERAL ESQUERDO (DESKTOP - md:flex) */}
      <aside className="hidden md:flex md:w-64 lg:w-72 bg-[#1b5e3a] text-white flex-col justify-between sticky top-0 h-screen shrink-0 shadow-xl z-20">
        
        {/* Topo do Menu: Logo e Nome */}
        <div className="p-6 space-y-8">
          <div 
            onClick={() => onNavigate && onNavigate('dashboard-profissional')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-sm">
              <img
                src={logoImg}
                alt="Logo UP"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block leading-none">Espaço UP</span>
              <span className="text-[11px] text-emerald-200 font-medium">Área Profissional</span>
            </div>
          </div>

          {/* Links de Navegação */}
          <nav className="space-y-1.5">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('dashboard-profissional')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-100 hover:bg-white/10 hover:text-white font-medium text-sm transition"
            >
              <Home className="w-5 h-5" />
              <span>Início</span>
            </button>

            <button
              type="button"
              onClick={handleOpenGoogleCalendar}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-100 hover:bg-white/10 hover:text-white font-medium text-sm transition"
            >
              <Calendar className="w-5 h-5" />
              <span>Agenda</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('pacientes')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/15 text-white font-semibold text-sm transition shadow-sm"
            >
              <Users className="w-5 h-5" />
              <span>Pacientes</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('minha-conta')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-100 hover:bg-white/10 hover:text-white font-medium text-sm transition"
            >
              <User className="w-5 h-5" />
              <span>Minha Conta</span>
            </button>
          </nav>
        </div>

        {/* Rodapé do Menu Lateral: Perfil Resumido e Sair */}
        <div className="p-4 m-4 bg-[#14472c] rounded-2xl border border-white/10 space-y-3">
          <div 
            onClick={() => onNavigate && onNavigate('minha-conta')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-300 bg-emerald-800 flex items-center justify-center shrink-0">
              {profilePic ? (
                <img src={profilePic} alt="Perfil" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-emerald-200" />
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{userName}</p>
              <p className="text-[11px] text-emerald-200 truncate">Psicopedagoga</p>
            </div>
          </div>

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/10 hover:bg-red-500/80 text-white text-xs font-semibold transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair da Conta</span>
            </button>
          )}
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO PRINCIPAL (OCUPA O RESTANTE DA TELA) */}
      <div className="flex-1 flex flex-col justify-between min-h-screen bg-[#FAF3EC] relative overflow-x-hidden pb-24 md:pb-8">
        
        {/* Cabeçalho */}
        <header className="bg-white px-6 md:px-10 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <button 
            type="button"
            onClick={() => onNavigate('dashboard-profissional')}
            className="flex items-center text-xs font-bold text-[#1b5e3a] hover:opacity-80 transition gap-1.5 focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Voltar</span>
          </button>
          
          <span className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">
            Pacientes
          </span>
          
          {/* Foto de perfil visível no mobile */}
          <div 
            onClick={() => onNavigate && onNavigate('minha-conta')}
            className="w-9 h-9 rounded-full overflow-hidden border border-[#1b5e3a] bg-emerald-50 text-[#1b5e3a] flex items-center justify-center cursor-pointer hover:bg-emerald-100 transition shrink-0 md:hidden"
          >
            {profilePic ? (
              <img src={profilePic} alt="Perfil" className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5 stroke-[1.8]" />
            )}
          </div>
          <div className="hidden md:block w-10"></div>
        </header>

        {/* Conteúdo */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-5 md:px-10 py-6 md:py-8 space-y-5">
          
          {/* Abas de Filtro e Botão de Novo Paciente */}
          <div className="space-y-3">
            <div className="bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => setAbaAtiva('meus')}
                className={`py-2.5 text-xs md:text-sm font-bold rounded-xl transition ${
                  abaAtiva === 'meus' 
                    ? 'bg-[#1b5e3a] text-white shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                Meus ({pacientes.filter(p => p.categoria === 'meus').length})
              </button>
              <button
                type="button"
                onClick={() => setAbaAtiva('clinica')}
                className={`py-2.5 text-xs md:text-sm font-bold rounded-xl transition ${
                  abaAtiva === 'clinica' 
                    ? 'bg-[#1b5e3a] text-white shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                Todos da Clínica
              </button>
            </div>

            {/* BOTÃO CADASTRAR NOVO PACIENTE */}
            <button
              type="button"
              onClick={() => onNavigate('cadastrar-paciente')}
              className="w-full py-3.5 bg-white border border-[#1b5e3a]/30 text-[#1b5e3a] hover:bg-emerald-50/50 font-bold text-xs md:text-sm rounded-2xl transition shadow-sm flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              + Cadastrar Novo Paciente
            </button>
          </div>

          {/* Barra de Pesquisa */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Pesquisar paciente pelo nome..."
              className="w-full bg-white pl-11 pr-4 py-3 rounded-2xl border border-gray-100 shadow-sm text-xs md:text-sm focus:outline-none focus:border-[#1b5e3a] transition"
            />
          </div>

          {/* Lista de Cartões de Pacientes */}
          <div className="space-y-3">
            {pacientesFiltrados.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-xs text-gray-400 shadow-sm">
                Nenhum paciente encontrado.
              </div>
            ) : (
              pacientesFiltrados.map((paciente) => (
                <div 
                  key={paciente.id}
                  onClick={() => onSelectPatient && onSelectPatient(paciente)}
                  className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#1b5e3a]/30 transition group cursor-pointer"
                >
                  {/* Informações do Paciente */}
                  <div className="flex items-center gap-4 flex-1">
                    <img 
                      src={paciente.foto || paciente.avatar} 
                      alt={paciente.nome} 
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border border-gray-100"
                    />
                    <div>
                      <h2 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-[#1b5e3a] transition">
                        {paciente.nome}
                      </h2>
                      <p className="text-[11px] md:text-xs text-gray-500 mt-0.5">
                        {paciente.idade} anos 
                      </p>
                    </div>
                  </div>

                  {/* Seta indicando navegação para os detalhes */}
                  <div className="p-1.5 text-gray-300 group-hover:text-[#1b5e3a] transition">
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

        {/* Menu de Navegação Inferior: Visível APENAS no celular (md:hidden) */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3 px-6 flex justify-around items-center z-20 shadow-lg md:hidden">
          <button 
            type="button"
            onClick={() => onNavigate('dashboard-profissional')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition text-[10px] font-medium"
          >
            <Home className="w-5 h-5" />
            <span>Início</span>
          </button>
          
          <button 
            type="button"
            onClick={handleOpenGoogleCalendar}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition text-[10px] font-medium"
          >
            <Calendar className="w-5 h-5" />
            <span>Agenda</span>
          </button>

          <button 
            type="button"
            onClick={() => onNavigate('pacientes')}
            className="flex flex-col items-center gap-1 text-[#1b5e3a] font-bold text-[10px]"
          >
            <Users className="w-5 h-5" />
            <span>Pacientes</span>
          </button>

          <button 
            type="button"
            onClick={() => onNavigate('minha-conta')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition text-[10px] font-medium"
          >
            <User className="w-5 h-5" />
            <span>Minha Conta</span>
          </button>
        </nav>
      </div>
    </div>
  );
}