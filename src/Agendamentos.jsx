import React, { useState } from 'react';

export default function Agendamentos({ agendamentos, setAgendamentos, onNavigate }) {
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroProfissional, setFiltroProfissional] = useState('');
  const [filtroDependente, setFiltroDependente] = useState('');

  // Estado para controlar o modal de confirmação de cancelamento
  const [agendamentoParaCancelar, setAgendamentoParaCancelar] = useState(null);

  // Abrir o modal de confirmação
  const handleAbrirModalCancelar = (item) => {
    setAgendamentoParaCancelar(item);
  };

  // Confirmar a remoção do agendamento
  const handleConfirmarCancelamento = () => {
    if (agendamentoParaCancelar) {
      setAgendamentos(agendamentos.filter(item => item.id !== agendamentoParaCancelar.id));
      setAgendamentoParaCancelar(null);
    }
  };

  const agendamentosFiltrados = agendamentos.filter(item => {
    const matchStatus = filtroStatus ? item.status === filtroStatus : true;
    const matchProfissional = filtroProfissional ? item.professional === filtroProfissional : true;
    const matchDependente = filtroDependente ? item.dependent === filtroDependente : true;
    return matchStatus && matchProfissional && matchDependente;
  });

  return (
    <div className="min-h-screen bg-ivory flex flex-col relative">
      
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
            onClick={() => onNavigate('selecionar-consulta')}
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
                    <p className="text-xs text-gray-600 mt-1">👩‍⚕️ {item.professional} &bull; 👤 {item.dependent}</p>
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
                      onClick={() => handleAbrirModalCancelar(item)}
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

      {/* MODAL PERSONALIZADO DE CANCELAMENTO */}
      {agendamentoParaCancelar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-5 shadow-2xl text-center border border-gray-100">
            
            {/* Ícone de Alerta */}
            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            {/* Título e Texto */}
            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900">Cancelar Agendamento?</h3>
              <p className="text-xs text-gray-500">
                Tens a certeza de que desejas cancelar esta consulta? Esta ação libertará o horário na agenda.
              </p>
            </div>

            {/* Detalhes da Consulta a Cancelar */}
            <div className="bg-gray-50 p-3 rounded-2xl text-left space-y-1 text-xs border border-gray-100">
              <p className="font-bold text-gray-800">{agendamentoParaCancelar.type}</p>
              <p className="text-gray-500">📅 {agendamentoParaCancelar.date}</p>
            </div>

            {/* Botões de Ação */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => setAgendamentoParaCancelar(null)}
                className="w-full py-3 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-200 transition"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={handleConfirmarCancelamento}
                className="w-full py-3 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700 transition shadow-sm"
              >
                Sim, cancelar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}