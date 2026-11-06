import React, { useState } from 'react';

export default function NovoAgendamento({ onNavigate }) {
  const [diasSemana] = useState([
    { dia: 'Ter', data: 20 },
    { dia: 'Qua', data: 21 },
    { dia: 'Qui', data: 22 },
    { dia: 'Sex', data: 23 },
    { dia: 'Sáb', data: 24 },
  ]);
  const [diaSelecionado, setDiaSelecionado] = useState(22);

  const [horariosManha] = useState([
    { hora: '08:00', disponivel: true },
    { hora: '08:40', disponivel: false },
    { hora: '09:20', disponivel: true },
    { hora: '10:00', disponivel: true },
    { hora: '10:40', disponivel: false },
    { hora: '11:20', disponivel: true },
  ]);

  const [horariosTarde] = useState([
    { hora: '14:00', disponivel: true },
    { hora: '14:40', disponivel: true },
    { hora: '15:20', disponivel: false },
    { hora: '16:00', disponivel: true },
  ]);

  const [horarioSelecionado, setHorarioSelecionado] = useState('09:20');

  const handleSelecionarHorario = (slot) => {
    if (!slot.disponivel) return;
    setHorarioSelecionado(slot.hora);
  };

  const handleConfirmarAgendamento = () => {
    alert(`Consulta agendada com sucesso para o dia ${diaSelecionado}/10/2026 às ${horarioSelecionado}!`);
    onNavigate('agendamentos');
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      
      {/* Cabeçalho */}
      <header className="bg-white border-b border-gray-100 px-4 py-3.5 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button 
            type="button"
            onClick={() => onNavigate('agendamentos')}
            className="flex items-center text-xs font-bold text-[#1b5e3a] hover:opacity-80 transition gap-1.5 focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>
          
          <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">Agendar consulta</span>
          
          <div className="w-10"></div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 px-4 py-6 max-w-md mx-auto w-full space-y-6 pb-28">
        
        {/* Cartão do Profissional */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#1b5e3a] font-bold flex items-center justify-center text-sm shadow-sm">
              PS
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">[NOME DO PROFISSIONAL]</h2>
              <p className="text-[11px] text-gray-500">[Especialidade] &bull; [CRM/Registro]</p>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-2.5 border border-gray-100">
            <svg className="w-4 h-4 text-[#1b5e3a] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[11px] text-gray-600 font-medium">Horários sincronizados com o Google Agenda</span>
          </div>
        </div>

        {/* Seleção de Mês e Dias */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-sm font-bold text-gray-800">Outubro 2026</h3>
            <div className="flex gap-2 text-gray-600">
              <button className="p-1 rounded-lg hover:bg-gray-200 transition">&lsaquo;</button>
              <button className="p-1 rounded-lg hover:bg-gray-200 transition">&rsaquo;</button>
            </div>
          </div>

          {/* Carrossel de Dias */}
          <div className="grid grid-cols-5 gap-2">
            {diasSemana.map((item) => {
              const isSelected = diaSelecionado === item.data;
              return (
                <button
                  key={item.data}
                  onClick={() => setDiaSelecionado(item.data)}
                  className={`py-3 px-1 rounded-2xl flex flex-col items-center justify-center transition border ${
                    isSelected
                      ? 'bg-[#1b5e3a] text-white border-[#1b5e3a] shadow-md'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className={`text-[10px] font-medium uppercase ${isSelected ? 'text-emerald-100' : 'text-gray-400'}`}>
                    {item.dia}
                  </span>
                  <span className="text-base font-bold mt-0.5">{item.data}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Horários - Manhã */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">Manhã</h4>
          <div className="grid grid-cols-3 gap-2.5">
            {horariosManha.map((slot) => {
              const isSelected = horarioSelecionado === slot.hora;

              if (!slot.disponivel) {
                return (
                  <div 
                    key={slot.hora}
                    className="py-3 bg-gray-100 text-gray-400 rounded-2xl text-xs font-semibold text-center border border-gray-200 line-through cursor-not-allowed select-none opacity-60"
                  >
                    {slot.hora}
                  </div>
                );
              }

              return (
                <button
                  key={slot.hora}
                  onClick={() => handleSelecionarHorario(slot)}
                  className={`py-3 rounded-2xl text-xs font-semibold transition border ${
                    isSelected
                      ? 'bg-[#1b5e3a] text-white border-[#1b5e3a] shadow-sm'
                      : 'bg-white text-gray-800 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {slot.hora}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horários - Tarde */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">Tarde</h4>
          <div className="grid grid-cols-3 gap-2.5">
            {horariosTarde.map((slot) => {
              const isSelected = horarioSelecionado === slot.hora;

              if (!slot.disponivel) {
                return (
                  <div 
                    key={slot.hora}
                    className="py-3 bg-gray-100 text-gray-400 rounded-2xl text-xs font-semibold text-center border border-gray-200 line-through cursor-not-allowed select-none opacity-60"
                  >
                    {slot.hora}
                  </div>
                );
              }

              return (
                <button
                  key={slot.hora}
                  onClick={() => handleSelecionarHorario(slot)}
                  className={`py-3 rounded-2xl text-xs font-semibold transition border ${
                    isSelected
                      ? 'bg-[#1b5e3a] text-white border-[#1b5e3a] shadow-sm'
                      : 'bg-white text-gray-800 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {slot.hora}
                </button>
              );
            })}
          </div>
        </div>

      </main>

      {/* Rodapé Fixo com Confirmação */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 p-4 shadow-lg">
        <div className="max-w-md mx-auto space-y-3">
          <div className="text-center text-xs text-gray-600">
            Quinta, {diaSelecionado}/10/2026 às <span className="font-bold text-gray-900">{horarioSelecionado}</span>
          </div>
          <button 
            onClick={handleConfirmarAgendamento}
            className="w-full py-3.5 bg-[#1b5e3a] text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 transition"
          >
            Confirmar agendamento
          </button>
        </div>
      </footer>

    </div>
  );
}