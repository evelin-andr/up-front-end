import React from 'react';
import Navbar from './Navbar';

export default function Dashboard({ userName = "Maria Souza", profilePic, onNavigate, onLogout }) {
  const dependent = { name: "Lucas Souza", age: 9, grade: "4º Ano" };
  const upcomingAppointment = {
    date: "12 de Junho, 2026",
    time: "14:30",
    professional: "Dra. Ana Beatriz",
    type: "Avaliação Psicopedagógica"
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      
      {/* Componente reutilizável Navbar */}
      <Navbar userName={userName} profilePic={profilePic} onNavigate={onNavigate} onLogout={onLogout} />

      {/* Conteúdo Principal do Dashboard */}
      <main className="flex-1 p-6 md:p-10">
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
  onClick={() => onNavigate && onNavigate('novo-agendamento')}
  className="px-6 py-3 bg-white text-[#1b5e3a] font-semibold text-sm rounded-xl hover:bg-emerald-50 transition shadow-sm whitespace-nowrap"
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
                  className="text-xs text-[#1b5e3a] font-semibold hover:underline"
                >
                  Vizualizar dependentes  &rarr;
                </button>
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}