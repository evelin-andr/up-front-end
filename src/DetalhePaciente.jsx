import React, { useState } from 'react';
import { Users, Calendar, User, ArrowLeft, Clock, Plus, Phone, Mail, CreditCard, AtSign, BookOpen, Pencil, Trash2, X, AlertTriangle, Paperclip, FileText } from 'lucide-react';

export default function DetalhePaciente({ patient, onNavigate, onUpdatePatient, onDeletePatient }) {
  // Estado para controlar as abas internas da ficha
  const [activeTab, setActiveTab] = useState('dados');
  
  // Estado para gerir a lista de evoluções deste paciente
  const [evolucoes, setEvolucoes] = useState([
    {
      id: 1,
      date: "15/06/2026",
      time: "15:30",
      content: "Paciente demonstrou excelente evolução na fixação de conceitos fonológicos durante os jogos de leitura.",
      professional: "Dra. Maria Souza",
      anexo: null
    }
  ]);

  const [novaEvolucao, setNovaEvolucao] = useState('');
  const [anexoArquivo, setAnexoArquivo] = useState(null);
  const [showModalEvolucao, setShowModalEvolucao] = useState(false);

  // Estados para os Modais de Edição e Exclusão na Ficha
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pacienteEditando, setPacienteEditando] = useState(patient || {});

  const currentPatient = patient || pacienteEditando;

  const handleSalvarEvolucao = (e) => {
    e.preventDefault();
    if (!novaEvolucao.trim()) return;

    const nova = {
      id: Date.now(),
      date: new Date().toLocaleDateString('pt-BR'),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: novaEvolucao,
      professional: "Dra. Maria Souza",
      anexo: anexoArquivo ? anexoArquivo.name : null
    };

    setEvolucoes([nova, ...evolucoes]);
    setNovaEvolucao('');
    setAnexoArquivo(null);
    setShowModalEvolucao(false);
  };

  const handleSalvarEdicao = (e) => {
    e.preventDefault();
    if (onUpdatePatient) {
      onUpdatePatient(pacienteEditando);
    }
    setIsEditing(false);
  };

  const handleConfirmarExclusao = () => {
    if (onDeletePatient && currentPatient) {
      onDeletePatient(currentPatient.id);
    }
    onNavigate('pacientes');
  };

  return (
    <div className="min-h-screen bg-[#FAF3EC] text-gray-800 flex flex-col justify-between w-full notranslate" translate="no">
      {/* Container Principal */}
      <div className="w-full min-h-screen bg-[#FAF3EC] flex flex-col justify-between relative overflow-x-hidden pb-20 md:pb-8">
        
        {/* Header Fixo */}
        <header className="bg-white px-6 md:px-12 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => onNavigate && onNavigate('pacientes')}
              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-full transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-semibold text-gray-900 text-base md:text-lg">Ficha do Paciente</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <div 
              onClick={() => onNavigate && onNavigate('minha-conta')}
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#1b5e3a] cursor-pointer hover:opacity-90 transition"
            >
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" 
                alt="Perfil" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-12 py-6 space-y-6 overflow-y-auto">
          
          {/* Cartão de Identificação do Paciente */}
          <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src={currentPatient.foto || currentPatient.avatar} 
                alt={currentPatient.nome} 
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-[#1b5e3a]"
              />
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-900">{currentPatient.nome}</h2>
                <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                  {currentPatient.idade} anos
                </p>
              </div>
            </div>

            {/* Botões de Ação na Ficha */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                onClick={() => {
                  setPacienteEditando({ ...currentPatient });
                  setIsEditing(true);
                }}
                title="Editar Paciente"
                className="p-2.5 bg-emerald-50 text-[#1b5e3a] hover:bg-emerald-100 rounded-xl transition flex items-center gap-1.5 text-xs font-semibold"
              >
                <Pencil className="w-4 h-4" />
                <span className="hidden md:inline">Editar</span>
              </button>
              <button
                type="button"
                onClick={() => setIsDeleting(true)}
                title="Excluir Paciente"
                className="p-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition flex items-center gap-1.5 text-xs font-semibold"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden md:inline">Excluir</span>
              </button>
            </div>
          </div>

          {/* Abas Internas */}
          <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar">
            <button 
              type="button"
              onClick={() => setActiveTab('dados')}
              className={`pb-3 px-4 text-xs md:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
                activeTab === 'dados' 
                  ? 'border-[#1b5e3a] text-[#1b5e3a]' 
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Dados Pessoais
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('historico')}
              className={`pb-3 px-4 text-xs md:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
                activeTab === 'historico' 
                  ? 'border-[#1b5e3a] text-[#1b5e3a]' 
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Histórico de Consultas
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('evolucoes')}
              className={`pb-3 px-4 text-xs md:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
                activeTab === 'evolucoes' 
                  ? 'border-[#1b5e3a] text-[#1b5e3a]' 
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Evoluções ({evolucoes.length})
            </button>
          </div>

          {/* CONTEÚDO DA ABA: DADOS PESSOAIS */}
          {activeTab === 'dados' && (
            <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 text-xs md:text-sm">
              
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <span className="text-gray-400 font-medium flex items-center gap-2"><AtSign className="w-4 h-4 text-gray-400" /> Nome de Utilizador</span>
                <span className="font-bold text-gray-800">@{currentPatient.username || 'Não informado'}</span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <span className="text-gray-400 font-medium flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /> E-mail de Acesso</span>
                <span className="font-bold text-gray-800">{currentPatient.email || 'Não informado'}</span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <span className="text-gray-400 font-medium flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /> Telefone / WhatsApp</span>
                <span className="font-bold text-gray-800">{currentPatient.telefone || 'Não informado'}</span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <span className="text-gray-400 font-medium flex items-center gap-2"><CreditCard className="w-4 h-4 text-gray-400" /> CPF</span>
                <span className="font-bold text-gray-800">{currentPatient.cpf || 'Não informado'}</span>
              </div>

              <div className="flex items-center justify-between pb-1">
                <span className="text-gray-400 font-medium flex items-center gap-2"><BookOpen className="w-4 h-4 text-gray-400" /> Escolaridade</span>
                <span className="font-bold text-gray-800">{currentPatient.escolaridade || 'Não informada'}</span>
              </div>

            </div>
          )}

          {/* CONTEÚDO DA ABA: HISTÓRICO DE CONSULTAS */}
          {activeTab === 'historico' && (
            <div className="space-y-3">
              <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-gray-800">Avaliação Psicopedagógica</h4>
                  <p className="text-[11px] md:text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-600" /> 15/06/2026 às 09:00 - Presencial
                  </p>
                </div>
                <span className="text-[10px] md:text-xs px-3 py-1 rounded-full bg-emerald-50 text-[#1b5e3a] font-bold">
                  Realizado
                </span>
              </div>

              <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-gray-800">Sessão de Acompanhamento</h4>
                  <p className="text-[11px] md:text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600" /> 01/06/2026 às 10:30 - On-line
                  </p>
                </div>
                <span className="text-[10px] md:text-xs px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-bold">
                  Confirmado
                </span>
              </div>
            </div>
          )}

          {/* CONTEÚDO DA ABA: EVOLUÇÕES */}
          {activeTab === 'evolucoes' && (
            <div className="space-y-4">
              <button 
                type="button"
                onClick={() => setShowModalEvolucao(true)}
                className="w-full bg-[#1b5e3a] text-white py-3.5 rounded-2xl font-bold text-xs md:text-sm hover:bg-[#14472c] transition shadow-sm flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Adicionar Nova Evolução
              </button>

              <div className="space-y-3">
                {evolucoes.map((evo) => (
                  <div key={evo.id} className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
                    <div className="flex items-center justify-between text-xs md:text-sm text-gray-400 border-b border-gray-50 pb-2">
                      <span className="font-bold text-[#1b5e3a]">{evo.professional}</span>
                      <span>{evo.date} às {evo.time}</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                      {evo.content}
                    </p>
                    {evo.anexo && (
                      <div className="flex items-center gap-2 pt-2 mt-1 border-t border-gray-50 text-[11px] md:text-xs text-[#1b5e3a] font-medium">
                        <FileText className="w-3.5 h-3.5" />
                        <span className="truncate">Anexo: {evo.anexo}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

        {/* MODAL DE EDIÇÃO DO PACIENTE */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg p-6 md:p-8 rounded-3xl shadow-xl space-y-4 border border-gray-100 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 text-sm md:text-base">Editar Paciente</h3>
                <button type="button" onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSalvarEdicao} className="space-y-3 text-xs md:text-sm">
                <div>
                  <label className="block font-semibold text-gray-600 mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={pacienteEditando.nome || ''}
                    onChange={(e) => setPacienteEditando({ ...pacienteEditando, nome: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1b5e3a]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-600 mb-1">Nome de Utilizador</label>
                  <input
                    type="text"
                    required
                    value={pacienteEditando.username || ''}
                    onChange={(e) => setPacienteEditando({ ...pacienteEditando, username: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1b5e3a]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-600 mb-1">E-mail de Acesso</label>
                  <input
                    type="email"
                    required
                    value={pacienteEditando.email || ''}
                    onChange={(e) => setPacienteEditando({ ...pacienteEditando, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1b5e3a]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-600 mb-1">Idade</label>
                    <input
                      type="number"
                      required
                      value={pacienteEditando.idade || ''}
                      onChange={(e) => setPacienteEditando({ ...pacienteEditando, idade: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1b5e3a]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-600 mb-1">Escolaridade</label>
                    <input
                      type="text"
                      value={pacienteEditando.escolaridade || ''}
                      onChange={(e) => setPacienteEditando({ ...pacienteEditando, escolaridade: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1b5e3a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-600 mb-1">Telefone</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={pacienteEditando.telefone || ''}
                    onChange={(e) => setPacienteEditando({ ...pacienteEditando, telefone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1b5e3a]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-600 mb-1">CPF</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={pacienteEditando.cpf || ''}
                    onChange={(e) => setPacienteEditando({ ...pacienteEditando, cpf: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1b5e3a]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1b5e3a] text-white font-bold rounded-xl hover:bg-[#14472c] transition shadow-sm"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
        {isDeleting && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl text-center border border-gray-100">
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-gray-900">Excluir Paciente?</h3>
                <p className="text-xs text-gray-500">
                  Tem certeza que deseja remover <span className="font-bold text-gray-700">{currentPatient.nome}</span>? Essa ação não poderá ser desfeita.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDeleting(false)}
                  className="w-full py-3 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-200 transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmarExclusao}
                  className="w-full py-3 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700 transition shadow-sm"
                >
                  Sim, excluir
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal para Adicionar Nova Evolução com Opção de Anexo */}
        {showModalEvolucao && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md p-6 rounded-3xl shadow-xl space-y-4 border border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm md:text-base">Nova Evolução de Atendimento</h3>
              
              <div className="space-y-3">
                <textarea 
                  rows="4"
                  placeholder="Escreva aqui as observações da sessão, avanços e pontos de atenção..."
                  value={novaEvolucao}
                  onChange={(e) => setNovaEvolucao(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-gray-200 text-xs md:text-sm focus:outline-none focus:border-[#1b5e3a] transition resize-none"
                ></textarea>

                {/* Campo de Anexo */}
                <div>
                  <label className="block text-[11px] md:text-xs font-bold text-gray-700 mb-1">
                    Anexar Documento / Relatório / Imagem
                  </label>
                  <label className="w-full border-2 border-dashed border-gray-200 hover:border-[#1b5e3a] rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer bg-gray-50/50 transition group">
                    <Paperclip className="w-4 h-4 text-gray-400 group-hover:text-[#1b5e3a]" />
                    <span className="text-xs text-gray-500 group-hover:text-[#1b5e3a] font-medium truncate">
                      {anexoArquivo ? anexoArquivo.name : "Clique para selecionar um arquivo..."}
                    </span>
                    <input 
                      type="file" 
                      onChange={(e) => setAnexoArquivo(e.target.files[0])}
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => {
                    setShowModalEvolucao(false);
                    setAnexoArquivo(null);
                  }}
                  className="w-full py-3 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-200 transition"
                >
                  Cancelar
                </button>
                <button 
                  type="button"
                  onClick={handleSalvarEvolucao}
                  className="w-full py-3 bg-[#1b5e3a] text-white font-bold text-xs rounded-xl hover:bg-[#14472c] transition shadow-sm"
                >
                  Salvar Evolução
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation: Aparece apenas no celular (md:hidden) e some no desktop */}
        <nav className="bg-white border-t border-gray-100 px-6 py-3 flex items-center justify-around fixed bottom-0 left-0 right-0 z-20 shadow-lg md:hidden">
          <button 
            type="button"
            onClick={() => onNavigate && onNavigate('dashboard-profissional')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition text-[10px] font-medium"
          >
            <Users className="w-5 h-5" />
            <span>Início</span>
          </button>
          
          <button 
            type="button"
            onClick={() => window.open('https://calendar.google.com', '_blank')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition text-[10px] font-medium"
          >
            <Calendar className="w-5 h-5" />
            <span>Agenda</span>
          </button>
          
          <button 
            type="button"
            onClick={() => onNavigate && onNavigate('pacientes')}
            className="flex flex-col items-center gap-1 text-[#1b5e3a] font-bold text-[10px]"
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