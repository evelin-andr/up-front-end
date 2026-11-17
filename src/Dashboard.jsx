import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  UserCheck,
  Leaf,
  User
} from 'lucide-react';

export default function Dashboard({ userName = "Maria Souza", profilePic, onNavigate, onLogout }) {
  const dependent = { name: "Lucas Souza", age: 9, grade: "4º Ano" };
  const upcomingAppointment = {
    date: "12 de Junho, 2026",
    time: "14:30",
    professional: "Dra. Ana Beatriz",
    type: "Avaliação Psicopedagógica"
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-between w-full notranslate" translate="no">
      
      {/* CABEÇALHO DO PROFISSIONAL (Sem menus flutuantes) */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 text-[#1b5e3a]">
          <Leaf className="w-6 h-6" />
        </div>

        <h1 className="text-base md:text-lg font-bold text-[#1b5e3a]">
          Olá, Dra. {userName}
        </h1>

        <button 
          onClick={() => onNavigate && onNavigate('minha-conta')}
          className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#1b5e3a] hover:bg-emerald-100 transition cursor-pointer"
        >
          <User className="w-5 h-5" />
        </button>
      </header>

      {/* Conteúdo Principal do Dashboard */}
      <main className="flex-1 p-6 md:p-10 pb-24 md:pb-10">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Boas-vindas */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-[#305030]">É bom te ver de novo!, {userName} 👋</h1>
            <p className="text-sm text-gray-500 mt-1">Bem-vindo(a) ao seu painel de acompanhamento psicopedagógico.</p>
          </div>

         {/* Ação Rápida / Botão de Agendamento */}
        <div className="bg-[#1b5e3a] text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold">Precisa de marcar uma nova consulta?</h2>
            <p className="text-xs text-emerald-100 mt-1">Escolha os melhores horários disponíveis na nossa agenda.</p>
          </div>
          <button 
            onClick={() => onNavigate && onNavigate('selecionar-consulta')}
            className="px-6 py-3 bg-white text-[#1b5e3a] font-semibold text-sm rounded-xl hover:bg-emerald-50 transition shadow-sm whitespace-nowrap cursor-pointer"
          >
            + Agendar Consulta
          </button>
        </div> 

          {/* Grelha de Informações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Próxima Consulta */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Próxima Consulta</h3>
                <div className="space-y-2">
                  <p className="text-base font-bold text-gray-800">{upcomingAppointment.type}</p>
                  <p className="text-sm text-gray-600">📅 {upcomingAppointment.date} às {upcomingAppointment.time}</p>
                  <p className="text-sm text-gray-600">👩‍⚕️ {upcomingAppointment.professional}</p>
                  <p className="text-sm text-gray-600">👤 {dependent.name}</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-50 flex justify-end">
                <span className="text-xs bg-emerald-50 text-[#1b5e3a] px-3 py-1 rounded-full font-medium">Confirmado</span>
              </div>
            </div>

            {/* Dependente */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Dependente Vinculado</h3>
                <div className="space-y-2">
                  <p className="text-base font-bold text-gray-800">{dependent.name}</p>
                  <p className="text-sm text-gray-600">🎂 Idade: {dependent.age} anos</p>
                  <p className="text-sm text-gray-600">📚 Escolaridade: {dependent.grade}</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-50 flex justify-end">
                <button 
                  onClick={() => onNavigate && onNavigate('dependentes')}
                  className="text-xs text-[#1b5e3a] font-semibold hover:underline cursor-pointer"
                >
                  Vizualizar dependentes &rarr;
                </button>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* NAVEGAÇÃO INFERIOR MOBILE */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-3 py-2 flex justify-around items-center z-20 shadow-lg">
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('dashboard')}
          className="flex flex-col items-center text-[#1b5e3a] gap-1 cursor-pointer"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-bold">Início</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate && onNavigate('agendamentos')}
          className="flex flex-col items-center text-gray-400 hover:text-[#1b5e3a] gap-1 cursor-pointer"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Agendamentos</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate && onNavigate('dependentes')}
          className="flex flex-col items-center text-gray-400 hover:text-[#1b5e3a] gap-1 cursor-pointer"
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Dependentes</span>
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