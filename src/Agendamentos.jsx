import React, { useState } from 'react';

export default function Agendamentos({ onNavigate }) {
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

  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroProfissional, setFiltroProfissional] = useState('');
  const [filtroDependente, setFiltroDependente] = useState('');

  const handleCancelar = (id) => {
    if (window.confirm("Tens a certeza de que desejas cancelar este agendamento?")) {
      setAgendamentos(agendamentos.filter(item => item.id !== id));
    }
  };

  const agendamentosFiltrados = agendamentos.filter(item => {
    const matchStatus = filtroStatus ? item.status === filtroStatus : true;
    const matchProfissional = filtroProfissional ? item.professional === filtroProfissional : true;
    const matchDependente = filtroDependente ? item.dependent === filtroDependente : true;
    return matchStatus && matchProfissional && matchDependente;
  });

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      
      {/* Cabeçalho */}
      <header className="bg-white border-b border-gray-100 px-4 py-3.5 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button 
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="flex items-center text-xs font-bold text-[#1b5e3a] hover:opacity-80 transition gap-1.5 focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>
          
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Agendamentos</span>
          
          <div className="w-10"></div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 px-4 py-8 max-w-md mx-auto w-full space-y-6">
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Meus Agendamentos</h1>
            <p className="text-xs text-gray-500 mt-0.5">Consulte ou marque novas consultas.</p>
          </div>
          <button 
            onClick={() => onNavigate('elecionar-consulta')}
            className="px-4 py-2.5 bg-[#1b5e3a] text-white text-xs font-semibold rounded-xl hover:opacity-90 transition shadow-sm whitespace-nowrap flex items-center gap-1.5"
          >
            + Nova Consulta
          </button>
        </div>

        {/* Secção de Filtros */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-3 text-xs">
          <span className="font-bold text-gray-700 block">Filtrar Consultas</span>
          
          <div className="grid grid-cols-1 gap-2.5">
            <div>
              <label className="block text-gray-500 mb-1">Status</label>
              <select 
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a]"
              >
                <option value="">Todos os status</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Realizado">Realizado</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-gray-500 mb-1">Profissional</label>
                <select 
                  value={filtroProfissional}
                  onChange={(e) => setFiltroProfissional(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a]"
                >
                  <option value="">Todos</option>
                  <option value="Dra. Ana Beatriz">Dra. Ana Beatriz</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-500 mb-1">Dependente</label>
                <select 
                  value={filtroDependente}
                  onChange={(e) => setFiltroDependente(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a]"
                >
                  <option value="">Todos</option>
                  <option value="Lucas Souza">Lucas Souza</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Agendamentos */}
        <div className="space-y-4">
          {agendamentosFiltrados.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-400 text-xs shadow-sm border border-gray-100">
              Nenhum agendamento encontrado com os filtros selecionados.
            </div>
          ) : (
            agendamentosFiltrados.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-bold text-gray-800">{item.type}</h2>
                    <p className="text-xs text-gray-600 mt-1">👩‍⚕️ {item.professional} &bull; 👶 {item.dependent}</p>
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                    item.status === 'Confirmado' 
                      ? 'bg-emerald-50 text-[#1b5e3a]' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-50 text-xs text-gray-600 flex items-center justify-between">
                  <span>📅 {item.date}</span>
                  {item.status === 'Confirmado' && (
                    <button 
                      onClick={() => handleCancelar(item.id)}
                      className="font-bold text-red-600 hover:underline"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </main>
    </div>
  );
}