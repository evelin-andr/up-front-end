import React, { useState, useEffect } from 'react';

export default function NovoAgendamento({ onNavigate, dadosAgendamento, onAdicionarAgendamento }) {
  const profissionalNome = dadosAgendamento?.profissional || "Dra. Ana Beatriz";
  const especialidadeNome = dadosAgendamento?.especialidade || "Psicopedagogia Clínica";
  const crmRegistro = dadosAgendamento?.crm || "CRM/CRQ 1234";
  const pacienteNome = dadosAgendamento?.paciente || "Lucas Souza (Filho)";
  const tipoAtendimento = dadosAgendamento?.tipoAtendimento || "Avaliação Psicopedagógica";

  const iniciais = profissionalNome
    .replace(/^(Dra\.|Dr\.)\s*/i, '')
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const [diasSemana] = useState([
    { dia: 'SEG', numero: 20, nomeDiaCompleto: 'Segunda-feira' },
    { dia: 'TER', numero: 21, nomeDiaCompleto: 'Terça-feira' },
    { dia: 'QUA', numero: 22, nomeDiaCompleto: 'Quarta-feira' },
    { dia: 'QUI', numero: 23, nomeDiaCompleto: 'Quinta-feira' },
    { dia: 'SEXT', numero: 24, nomeDiaCompleto: 'Sexta-feira' },
  ]);
  
  const [diaSelecionado, setDiaSelecionado] = useState(diasSemana[0]);
  const [horariosManha, setHorariosManha] = useState([]);
  const [horariosTarde, setHorariosTarde] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState('');
  const [carregandoAgenda, setCarregandoAgenda] = useState(false);
  const [showSucessoModal, setShowSucessoModal] = useState(false);

  useEffect(() => {
    setCarregandoAgenda(true);
    setTimeout(() => {
      if (diaSelecionado.numero === 23) {
        setHorariosManha([
          { hora: '08:00', disponivel: true },
          { hora: '08:40', disponivel: false },
          { hora: '09:20', disponivel: true },
          { hora: '10:00', disponivel: true },
          { hora: '10:40', disponivel: false },
          { hora: '11:20', disponivel: true },
        ]);
        setHorariosTarde([
          { hora: '14:00', disponivel: true },
          { hora: '14:40', disponivel: true },
          { hora: '15:20', disponivel: false },
          { hora: '16:00', disponivel: true },
        ]);
      } else {
        setHorariosManha([
          { hora: '08:00', disponivel: true },
          { hora: '08:40', disponivel: true },
          { hora: '09:20', disponivel: true },
          { hora: '10:00', disponivel: true },
          { hora: '10:40', disponivel: true },
          { hora: '11:20', disponivel: true },
        ]);
        setHorariosTarde([
          { hora: '14:00', disponivel: true },
          { hora: '14:40', disponivel: true },
          { hora: '15:20', disponivel: true },
          { hora: '16:00', disponivel: true },
        ]);
      }
      setHorarioSelecionado(''); 
      setCarregandoAgenda(false);
    }, 150);
  }, [diaSelecionado]);

  const handleSelecionarHorario = (slot) => {
    if (!slot.disponivel) return; 
    setHorarioSelecionado(slot.hora);
  };

  const handleConfirmarAgendamento = () => {
    if (!horarioSelecionado) return;

    // Cria o novo objeto de agendamento formatado para a lista
    const novoCard = {
      id: Date.now(),
      type: tipoAtendimento,
      date: `${diaSelecionado.numero} de outubro de 2026 às ${horarioSelecionado}`,
      professional: profissionalNome,
      dependent: pacienteNome.replace(/\s*\(.*?\)/g, ''), // Limpa o parêntese ex: "(Filho)" se necessário
      status: "Confirmado"
    };

    if (onAdicionarAgendamento) {
      onAdicionarAgendamento(novoCard);
    }

    // Abre o modal de sucesso
    setShowSucessoModal(true);
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col relative">
      
      {/* Cabeçalho */}
      <header className="bg-white border-b border-gray-100 px-4 py-3.5 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button 
            type="button"
            onClick={() => onNavigate('selecionar-consulta')}
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
      <main className="flex-1 px-4 py-6 max-w-md mx-auto w-full space-y-6 pb-32">
        
        {/* Cartão do Profissional */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#1b5e3a] font-bold flex items-center justify-center text-sm shadow-sm">
              {iniciais}
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">{profissionalNome}</h2>
              <p className="text-[11px] text-gray-500">{especialidadeNome} &bull; {crmRegistro}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-2.5 border border-gray-100">
            <svg className="w-4 h-4 text-[#1b5e3a] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[11px] text-gray-600 font-medium">Horários sincronizados com o Google Agenda</span>
          </div>
        </div>

        {/* Seleção de Dias */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-sm font-bold text-gray-800">Outubro de 2026</h3>
            <div className="flex gap-2 text-gray-600">
              <button className="p-1 rounded-lg hover:bg-gray-200 transition">&lsaquo;</button>
              <button className="p-1 rounded-lg hover:bg-gray-200 transition">&rsaquo;</button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {diasSemana.map((item) => {
              const isSelected = diaSelecionado.numero === item.numero;
              return (
                <button
                  key={item.numero}
                  onClick={() => setDiaSelecionado(item)}
                  className={`py-3 px-1 rounded-2xl flex flex-col items-center justify-center transition border ${
                    isSelected
                      ? 'bg-[#1b5e3a] text-white border-[#1b5e3a] shadow-md'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className={`text-[10px] font-medium uppercase ${isSelected ? 'text-emerald-100' : 'text-gray-400'}`}>
                    {item.dia}
                  </span>
                  <span className="text-base font-bold mt-0.5">{item.numero}</span>
                </button>
              );
            })}
          </div>
        </div>

        {carregandoAgenda ? (
          <div className="py-12 text-center text-xs text-gray-400">
            A sincronizar com a agenda do profissional...
          </div>
        ) : (
          <>
            {/* Manhã */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">Manhã</h4>
              <div className="grid grid-cols-3 gap-2.5">
                {horariosManha.map((slot) => {
                  const isSelected = horarioSelecionado === slot.hora;
                  if (!slot.disponivel) {
                    return (
                      <div key={slot.hora} className="py-3 bg-gray-100 text-gray-400 rounded-2xl text-xs font-semibold text-center border border-gray-200 line-through cursor-not-allowed select-none opacity-60">
                        {slot.hora}
                      </div>
                    );
                  }
                  return (
                    <button
                      key={slot.hora}
                      onClick={() => handleSelecionarHorario(slot)}
                      className={`py-3 rounded-2xl text-xs font-semibold transition border ${
                        isSelected ? 'bg-[#1b5e3a] text-white border-[#1b5e3a] shadow-sm' : 'bg-white text-gray-800 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {slot.hora}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tarde */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">Tarde</h4>
              <div className="grid grid-cols-3 gap-2.5">
                {horariosTarde.map((slot) => {
                  const isSelected = horarioSelecionado === slot.hora;
                  if (!slot.disponivel) {
                    return (
                      <div key={slot.hora} className="py-3 bg-gray-100 text-gray-400 rounded-2xl text-xs font-semibold text-center border border-gray-200 line-through cursor-not-allowed select-none opacity-60">
                        {slot.hora}
                      </div>
                    );
                  }
                  return (
                    <button
                      key={slot.hora}
                      onClick={() => handleSelecionarHorario(slot)}
                      className={`py-3 rounded-2xl text-xs font-semibold transition border ${
                        isSelected ? 'bg-[#1b5e3a] text-white border-[#1b5e3a] shadow-sm' : 'bg-white text-gray-800 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {slot.hora}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

      </main>

      {/* Rodapé Fixo */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 p-4 shadow-lg z-20">
        <div className="max-w-md mx-auto space-y-3">
          <div className="text-center text-xs text-gray-600">
            {diaSelecionado.nomeDiaCompleto}, {diaSelecionado.numero}/10/2026 às <span className="font-bold text-gray-900">{horarioSelecionado || 'Selecione um horário'}</span>
          </div>
          <button 
            onClick={handleConfirmarAgendamento}
            disabled={!horarioSelecionado}
            className={`w-full py-3.5 font-bold text-xs rounded-xl shadow-md transition ${
              horarioSelecionado ? 'bg-[#1b5e3a] text-white hover:opacity-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Confirmar agendamento
          </button>
        </div>
      </footer>

      {/* MODAL DE SUCESSO */}
      {showSucessoModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-5 shadow-2xl text-center border border-emerald-100">
            <div className="w-16 h-16 bg-emerald-100 text-[#1b5e3a] rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner">
              ✓
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-gray-900">Consulta Agendada!</h3>
              <p className="text-xs text-gray-500">
              </p>
            </div>

            <div className="bg-emerald-50/60 p-3.5 rounded-2xl text-left space-y-1.5 border border-emerald-100 text-xs">
              <p className="font-bold text-[#1b5e3a]">{tipoAtendimento}</p>
              <p className="text-gray-600">👩‍⚕️ {profissionalNome}</p>
              <p className="text-gray-600">👤 {pacienteNome}</p>
              <p className="text-gray-600">📅 {diaSelecionado.numero} de outubro de 2026 às {horarioSelecionado}</p>
            </div>

            <button 
              onClick={() => onNavigate('agendamentos')}
              className="w-full py-3 bg-[#1b5e3a] text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 transition"
            >
              Ver meus agendamentos
            </button>
          </div>
        </div>
      )}

    </div>
  );
}