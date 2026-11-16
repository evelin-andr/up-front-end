import React from 'react';
import logoImg from './folha.png';
import { Users, Calendar, Home, User, Clock, LogOut } from 'lucide-react';

export default function DashboardProfissional({ userName = "Dra. Maria Souza", profilePic, onNavigate, onLogout }) {

  // Função para abrir o Google Calendar diretamente na Agenda
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
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/15 text-white font-semibold text-sm transition shadow-sm"
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
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-100 hover:bg-white/10 hover:text-white font-medium text-sm transition"
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

        {/* Cabeçalho Superior (Mobile completo / Desktop simplificado) */}
        <header className="bg-white px-6 md:px-10 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          
          {/* Logo visível apenas no mobile (já está na sidebar no desktop) */}
          <div 
            onClick={() => onNavigate && onNavigate('dashboard-profissional')}
            className="w-8 h-8 flex items-center justify-center cursor-pointer md:hidden"
          >
            <img
              src={logoImg}
              alt="Logo UP"
              className="w-7 h-7 object-contain"
            />
          </div>

          {/* Saudação Dinâmica */}
          <div className="text-center md:text-left px-2 truncate">
            <span className="font-bold text-[#1b5e3a] text-base md:text-lg tracking-tight">
              Olá, {userName}
            </span>
          </div>

          {/* Ícone/Foto de Perfil à direita */}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('minha-conta')}
            title="Minha Conta"
            className="w-9 h-9 rounded-full overflow-hidden border border-[#1b5e3a] bg-emerald-50 text-[#1b5e3a] flex items-center justify-center cursor-pointer hover:bg-emerald-100 transition shrink-0"
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt="Perfil do Profissional"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 stroke-[1.8]" />
            )}
          </button>
        </header>

        {/* Conteúdo da Página */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-5 md:px-10 py-6 md:py-8 space-y-6">

          {/* Subtítulo da Visão Geral */}
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
              Painel do Profissional
            </h1>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5">
              Aqui está o resumo minimalista do teu dia.
            </p>
          </div>

          {/* Cards de Acesso Rápido */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {/* Card Pacientes */}
            <div
              onClick={() => onNavigate && onNavigate('pacientes')}
              className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-[#1b5e3a]/40 transition cursor-pointer flex flex-col justify-between"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#1b5e3a] flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm md:text-base">Meus Pacientes</h3>
                <p className="text-xs md:text-sm text-gray-400 mt-0.5">24 ativos</p>
              </div>
            </div>

            {/* Card Próximas Consultas / Google Agenda */}
            <div
              onClick={handleOpenGoogleCalendar}
              className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-[#1b5e3a]/40 transition cursor-pointer flex flex-col justify-between group"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#1b5e3a] flex items-center justify-center mb-4 group-hover:bg-[#1b5e3a] group-hover:text-white transition">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm md:text-base">Próximas Consultas</h3>
                <p className="text-xs md:text-sm text-[#1b5e3a] font-semibold mt-0.5 flex items-center gap-1">
                  Abrir Google Calendar ↗
                </p>
              </div>
            </div>
          </div>

          {/* Seção: Resumo do Dia • Hoje */}
          <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">
                Resumo do dia &bull; Hoje
              </span>
              <span className="text-xs bg-emerald-50 text-[#1b5e3a] font-bold px-3 py-1 rounded-full">
                3 consultas
              </span>
            </div>

            {/* Lista de Consultas de Hoje */}
            <div className="space-y-3">
              {/* Consulta 1 */}
              <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#1b5e3a] font-bold text-xs flex items-center justify-center shadow-inner">
                    09
                  </div>
                  <div>
                    <h4 className="text-xs md:text-sm font-bold text-gray-800">João Silva</h4>
                    <p className="text-[11px] md:text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-700" /> 09:00 - Presencial
                    </p>
                  </div>
                </div>
                <span className="text-[10px] md:text-xs bg-emerald-50 text-[#1b5e3a] font-bold px-3 py-1 rounded-full">
                  Confirmado
                </span>
              </div>

              {/* Consulta 2 */}
              <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center shadow-inner">
                    10
                  </div>
                  <div>
                    <h4 className="text-xs md:text-sm font-bold text-gray-800">Ana Lima</h4>
                    <p className="text-[11px] md:text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> 10:30 - On-line
                    </p>
                  </div>
                </div>
                <span className="text-[10px] md:text-xs bg-amber-50 text-amber-700 font-bold px-3 py-1 rounded-full">
                  Aguardando
                </span>
              </div>
            </div>
          </div>

        </main>

        {/* Menu de Navegação Inferior: Visível APENAS no celular (md:hidden) */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3 px-6 flex justify-around items-center z-20 shadow-lg md:hidden">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('dashboard-profissional')}
            className="flex flex-col items-center gap-1 text-[#1b5e3a] font-bold text-[10px]"
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
            onClick={() => onNavigate && onNavigate('pacientes')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition text-[10px] font-medium"
          >
            <Users className="w-5 h-5" />
            <span>Pacientes</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate('minha-conta')}
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