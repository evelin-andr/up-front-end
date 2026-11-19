import React, { useState } from 'react';
import {
  Calendar,
  CalendarPlus,
  Users,
  LayoutDashboard,
  UserPlus,
  UserCheck,
  Settings,
  ExternalLink,
  ArrowLeft,
  Mail,
  Plus,
  Trash2,
  CheckCircle2,
  Video
} from 'lucide-react';
import folhaIcon from './folha.png';

export default function ConfiguracoesProfissional({
  userName = 'Dra. Maria Souza',
  agendaEmailInicial = 'maria.souza@consultorio.com.br',
  tiposAtendimentoInicial = [
    { id: 1, nome: 'Intervenção Psicopedagógica', duracao: '50 min' },
    { id: 2, nome: 'Avaliação Diagnóstica', duracao: '60 min' },
    { id: 3, nome: 'Anamnese com Responsáveis', duracao: '60 min' },
    { id: 4, nome: 'Devolutiva (Pais / Escola)', duracao: '45 min' },
    { id: 5, nome: 'Reavaliação', duracao: '50 min' }
  ],
  modalidadePadraoInicial = 'Presencial',
  linkMeetInicial = '',
  onNavigate,
  onSalvarConfiguracoes
}) {
  const [emailAgenda, setEmailAgenda] = useState(agendaEmailInicial);
  const [tiposAtendimento, setTiposAtendimento] = useState(tiposAtendimentoInicial);
  const [novoTipoNome, setNovoTipoNome] = useState('');
  const [novaDuracao, setNovaDuracao] = useState('50 min');

  const [modalidadePadrao, setModalidadePadrao] = useState(modalidadePadraoInicial);
  const [linkMeet, setLinkMeet] = useState(linkMeetInicial);
  const [salvoComSucesso, setSalvoComSucesso] = useState(false);

  const abrirGoogleAgenda = () => {
    window.open('https://calendar.google.com', '_blank', 'noopener,noreferrer');
  };

  const handleAdicionarTipo = (e) => {
    e.preventDefault();
    const nomeLimpo = novoTipoNome.trim();
    if (!nomeLimpo) return;

    setTiposAtendimento((prev) => [
      ...prev,
      {
        id: Date.now(),
        nome: nomeLimpo,
        duracao: novaDuracao
      }
    ]);

    setNovoTipoNome('');
    setNovaDuracao('50 min');
  };

  const handleRemoverTipo = (id) => {
    setTiposAtendimento((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSalvarTudo = (e) => {
    e.preventDefault();

    if (onSalvarConfiguracoes) {
      onSalvarConfiguracoes({
        emailAgenda,
        tiposAtendimento,
        modalidadePadrao,
        linkMeet
      });
    }

    setSalvoComSucesso(true);
    setTimeout(() => setSalvoComSucesso(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF3EC] text-gray-800 flex flex-col md:flex-row w-full notranslate" translate="no">

      {/* SIDEBAR DESKTOP */}
      <aside className="hidden md:flex md:w-64 bg-[#1b5e3a] text-white flex-col justify-between p-6 fixed inset-y-0 left-0 z-20 shadow-lg overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
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
              className="w-full flex items-center gap-3 px-4 py-2.5 text-emerald-100 hover:bg-white/10 hover:text-white rounded-xl text-sm font-medium transition cursor-pointer"
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
                className="w-full flex items-center gap-3 px-4 py-2.5 bg-white/15 text-white rounded-xl text-sm font-semibold transition cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                Configurações
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen pb-24 md:pb-10">

        {/* CABEÇALHO */}
        <header className="bg-white border-b border-gray-100 px-4 md:px-10 py-4 sticky top-0 z-10 shadow-sm flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('dashboard-profissional')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#1b5e3a] hover:opacity-80 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <h1 className="text-xs md:text-sm font-bold text-gray-700 uppercase tracking-widest text-center">
            Configurações
          </h1>

          <div className="w-14" />
        </header>

        {/* CONTEÚDO */}
        <main className="flex-1 px-4 md:px-10 py-6 max-w-4xl mx-auto w-full space-y-6">

          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Configurações de Atendimento</h2>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5">
              Gerencie as preferências de {userName}.
            </p>
          </div>

          {salvoComSucesso && (
            <div className="bg-emerald-50 border border-emerald-200 text-[#1b5e3a] px-4 py-3 rounded-2xl flex items-center gap-2.5 text-xs md:text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Configurações salvas com sucesso!</span>
            </div>
          )}

          <form onSubmit={handleSalvarTudo} className="space-y-6">

            {/* 1. E-MAIL DA AGENDA */}
            <section className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <Mail className="w-4 h-4 text-[#1b5e3a]" />
                <h3 className="text-xs font-bold text-[#1b5e3a] uppercase tracking-wider">
                  1. E-mail da Agenda
                </h3>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="emailAgenda" className="block text-xs font-semibold text-gray-700">
                  E-mail vinculado à agenda
                </label>
                <input
                  id="emailAgenda"
                  type="email"
                  required
                  value={emailAgenda}
                  onChange={(e) => setEmailAgenda(e.target.value)}
                  placeholder="seuemail@gmail.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b5e3a] bg-gray-50/40"
                />
              </div>
            </section>

            {/* 2. ADICIONAR TIPO DE ATENDIMENTO (UNIFICADO COM MODALIDADE E LINK DO MEET) */}
            <section className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <Video className="w-4 h-4 text-[#1b5e3a]" />
                <h3 className="text-xs font-bold text-[#1b5e3a] uppercase tracking-wider">
                  2. Adicionar Tipo de Atendimento
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                <input
                  type="text"
                  value={novoTipoNome}
                  onChange={(e) => setNovoTipoNome(e.target.value)}
                  placeholder="Ex.: Orientação Escolar"
                  className="sm:col-span-7 px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b5e3a] bg-gray-50/40"
                />
                <select
                  value={novaDuracao}
                  onChange={(e) => setNovaDuracao(e.target.value)}
                  className="sm:col-span-3 px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1b5e3a] bg-white"
                >
                  <option value="30 min">30 min</option>
                  <option value="45 min">45 min</option>
                  <option value="50 min">50 min</option>
                  <option value="60 min">60 min</option>
                  <option value="90 min">90 min</option>
                </select>
                <button
                  type="button"
                  onClick={handleAdicionarTipo}
                  className="sm:col-span-2 py-2.5 px-3 bg-emerald-50 text-[#1b5e3a] hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Modalidade padrão:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {['Presencial', 'Online (Meet)'].map((mod) => (
                      <button
                        key={mod}
                        type="button"
                        onClick={() => setModalidadePadrao(mod)}
                        className={`py-2.5 px-4 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition cursor-pointer ${
                          modalidadePadrao === mod
                            ? 'bg-[#1b5e3a] text-white border-[#1b5e3a]'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        {mod.includes('Online') && <Video className="w-3.5 h-3.5" />}
                        <span>{mod}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="linkMeet" className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Link do Google Meet:
                  </label>
                  <input
                    id="linkMeet"
                    type="url"
                    value={linkMeet}
                    onChange={(e) => setLinkMeet(e.target.value)}
                    placeholder="https://meet.google.com/xxx-xxxx-xxx"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1b5e3a] bg-gray-50/40"
                  />
                </div>
              </div>
            </section>

            {/* 3. CARD QUE LISTA OS ATENDIMENTOS CADASTRADOS */}
            <section className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-xs font-bold text-[#1b5e3a] uppercase tracking-wider">
                  3. Atendimentos Cadastrados
                </h3>
                <span className="text-[11px] font-semibold bg-emerald-50 text-[#1b5e3a] px-2.5 py-0.5 rounded-full">
                  {tiposAtendimento.length} cadastrados
                </span>
              </div>

              <div className="space-y-2">
                {tiposAtendimento.length === 0 ? (
                  <div className="p-5 rounded-xl border border-dashed border-gray-200 bg-gray-50/50 text-center">
                    <p className="text-xs md:text-sm font-semibold text-gray-500">
                      Não há atendimentos cadastrados
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Adicione um tipo de atendimento acima para exibir na lista.
                    </p>
                  </div>
                ) : (
                  tiposAtendimento.map((tipo) => (
                    <div
                      key={tipo.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50/60"
                    >
                      <div>
                        <p className="text-sm font-bold text-gray-800">{tipo.nome}</p>
                        <span className="text-[11px] text-gray-500">Duração: {tipo.duracao}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoverTipo(tipo.id)}
                        title="Remover tipo de atendimento"
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* BOTÃO SALVAR */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#1b5e3a] text-white text-xs md:text-sm font-bold rounded-xl hover:bg-[#14472c] transition shadow-sm cursor-pointer"
              >
                Salvar Configurações
              </button>
            </div>

          </form>
        </main>
      </div>

      {/* NAVEGAÇÃO INFERIOR MOBILE */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-3 py-2 flex justify-around items-center z-20 shadow-lg">
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('dashboard-profissional')}
          className="flex flex-col items-center text-gray-400 hover:text-[#1b5e3a] gap-1 cursor-pointer"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Início</span>
        </button>

        <button
          type="button"
          onClick={abrirGoogleAgenda}
          className="flex flex-col items-center text-gray-400 hover:text-[#1b5e3a] gap-1 cursor-pointer"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Agenda</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate && onNavigate('marcar-consulta-profissional')}
          className="flex flex-col items-center text-gray-400 hover:text-[#1b5e3a] gap-1 cursor-pointer"
        >
          <CalendarPlus className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Marcar</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate && onNavigate('pacientes')}
          className="flex flex-col items-center text-gray-400 hover:text-[#1b5e3a] gap-1 cursor-pointer"
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Pacientes</span>
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