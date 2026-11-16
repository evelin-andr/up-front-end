import React from 'react';
import {
  Calendar,
  CalendarPlus,
  Users,
  XCircle,
  FileText,
  Clock,
  Video,
  ChevronRight,
  Bell,
  LayoutDashboard,
  UserPlus,
  UserCheck,
  Settings,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import folhaIcon from './folha.png';

export default function DashboardProfissional({ userName = 'Dra. Maria Souza',profilePic = null, onNavigate }) {
  // Função para abrir o Google Agenda em uma nova aba
  const abrirGoogleAgenda = () => {
    window.open('https://calendar.google.com', '_blank', 'noopener,noreferrer');
  };

  // Os 4 KPIs completos para o Desktop (com flag mobileVisivel para filtrar os 2 pequenos no celular)
  const kpis = [
    {
      id: 1,
      titulo: 'Atendimentos no Mês',
      tituloMobile: 'No Mês',
      valor: '48',
      subtexto: '+12% vs. mês passado',
      destaquePositivo: true,
      icone: Calendar,
      corIcone: 'bg-emerald-50 text-[#1b5e3a]',
      mobileVisivel: false
    },
    {
      id: 2,
      titulo: 'Pacientes Ativos',
      tituloMobile: 'Meus Pacientes',
      valor: '19',
      subtexto: 'Em acompanhamento contínuo',
      destaquePositivo: true,
      icone: Users,
      corIcone: 'bg-emerald-50 text-[#1b5e3a]',
      mobileVisivel: true,
      rota: 'pacientes'
    },
    {
      id: 3,
      titulo: 'Cancelamentos',
      tituloMobile: 'Cancelados',
      valor: '2',
      subtexto: 'Taxa de 4,1% no mês',
      destaquePositivo: false,
      icone: XCircle,
      corIcone: 'bg-red-50 text-red-600',
      mobileVisivel: false
    },
    {
      id: 4,
      titulo: 'Relatórios Pendentes',
      tituloMobile: 'Relatórios Pendentes',
      valor: '3',
      subtexto: 'Evoluções aguardando registro',
      destaquePositivo: false,
      icone: FileText,
      corIcone: 'bg-amber-50 text-amber-600',
      mobileVisivel: true,
      rota: 'pacientes'
    }
  ];

  const atendimentosHoje = [
    {
      id: 101,
      horario: '14:00',
      paciente: 'Lucas Mendes (9 anos)',
      tipo: 'Intervenção Psicopedagógica',
      modalidade: 'Presencial',
      status: 'Confirmado'
    },
    {
      id: 102,
      horario: '15:30',
      paciente: 'Sofia Almeida (7 anos)',
      tipo: 'Avaliação Diagnóstica - Sessão 2',
      modalidade: 'Online (Meet)',
      status: 'Confirmado'
    },
    {
      id: 103,
      horario: '17:00',
      paciente: 'Gabriel Costa (11 anos)',
      tipo: 'Devolutiva com Responsáveis',
      modalidade: 'Presencial',
      status: 'Aguardando'
    }
  ];

  const lembretesDevolutiva = [
    {
      id: 201,
      paciente: 'Mariana Oliveira',
      motivo: 'Completou 10 sessões de intervenção',
      acao: 'Agendar reunião com os pais'
    },
    {
      id: 202,
      paciente: 'Pedro Henrique',
      motivo: 'Relatório escolar solicitado pela coordenação',
      acao: 'Finalizar documento'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF3EC] text-gray-800 flex flex-col md:flex-row w-full notranslate" translate="no">

      {/* SIDEBAR DESKTOP (Forest Green) */}
      <aside className="hidden md:flex md:w-64 bg-[#1b5e3a] text-white flex-col justify-between p-6 fixed inset-y-0 left-0 z-20 shadow-lg overflow-y-auto">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
              <img src={folhaIcon} alt="UP" className="w-5 h-5 object-contain" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-wide block leading-none">UP</span>
              <span className="text-[11px] text-emerald-200">Psicopedagogia</span>
            </div>
          </div>

          {/* Menu Principal */}
          <nav className="space-y-1">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('dashboard-profissional')}
              className="w-full flex items-center gap-3 px-4 py-2.5 bg-white/15 text-white rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              Visão Geral
            </button>

            {/* Botão Agenda -> Abre o Google Agenda */}
            <button
              type="button"
              onClick={abrirGoogleAgenda}
              className="w-full flex items-center justify-between px-4 py-2.5 text-emerald-100 hover:bg-white/10 hover:text-white rounded-xl text-sm font-medium transition cursor-pointer"
              title="Abrir Google Agenda em nova aba"
            >
              <span className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                Agenda
              </span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </button>

            {/* Botão Marcar Consulta -> Tela específica do profissional */}
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
                onClick={() => onNavigate && onNavigate('configuracoes')}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-emerald-100 hover:bg-white/10 hover:text-white rounded-xl text-sm font-medium transition cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                Configurações
              </button>
            </div>
          </nav>
        </div>

        {/* Rodapé da Sidebar */}
        <div className="pt-4 border-t border-white/15 mt-6">
          <p className="text-xs text-emerald-200/80 px-2">Versão 1.0.0</p>
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen pb-24 md:pb-8">

        {/* Cabeçalho Superior */}
        <header className="bg-white border-b border-gray-100 px-5 md:px-10 py-4 sticky top-0 z-10 shadow-sm">
          <div className="max-w-6xl mx-auto flex justify-between items-center gap-3">
            <div>
              <h1 className="text-base md:text-xl font-bold text-gray-800">Olá, {userName}</h1>
              <p className="text-[11px] md:text-xs text-gray-500">Resumo da sua clínica e atendimentos de hoje</p>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Botão Marcar Consulta no Cabeçalho */}
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('marcar-consulta-profissional')}
                className="flex items-center gap-1.5 px-3.5 py-2 md:px-4 md:py-2.5 bg-emerald-50 text-[#1b5e3a] border border-emerald-200 text-xs font-bold rounded-xl hover:bg-emerald-100 transition cursor-pointer"
              >
                <CalendarPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Marcar Consulta</span>
                <span className="sm:hidden">Agendar</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate && onNavigate('cadastrar-paciente')}
                className="hidden lg:flex items-center gap-2 px-4 py-2.5 bg-[#1b5e3a] text-white text-xs font-bold rounded-xl hover:bg-[#14472c] transition shadow-sm cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                Cadastrar Paciente
              </button>

              <button
                type="button"
                onClick={() => onNavigate && onNavigate('minha-conta')}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-emerald-50 border border-[#1b5e3a]/30 text-[#1b5e3a] font-bold text-sm flex items-center justify-center hover:bg-emerald-100 transition cursor-pointer shrink-0 overflow-hidden"
                title="Minha Conta"
              >
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt={userName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  userName.charAt(0)
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="flex-1 px-4 md:px-10 py-6 max-w-6xl mx-auto w-full flex flex-col gap-6">

          {/* SEÇÃO DE KPIs */}
          <section className="order-2 md:order-1">

            {/* Grid Desktop (4 Cards Completos) */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((item) => {
                const IconComponent = item.icone;
                return (
                  <div
                    key={item.id}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:border-emerald-200 transition"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {item.titulo}
                      </span>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.corIcone}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl md:text-3xl font-extrabold text-gray-800">{item.valor}</p>
                      <p className={`text-[11px] font-medium mt-1 ${item.destaquePositivo ? 'text-[#1b5e3a]' : 'text-gray-500'
                        }`}>
                        {item.subtexto}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Grid Mobile (Apenas 2 Cards Pequenos: Meus Pacientes e Relatórios Pendentes) */}
            <div className="grid grid-cols-2 gap-3 md:hidden">
              {kpis
                .filter((item) => item.mobileVisivel)
                .map((item) => {
                  const IconComponent = item.icone;
                  return (
                    <div
                      key={item.id}
                      onClick={() => item.rota && onNavigate && onNavigate(item.rota)}
                      className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between active:scale-[0.98] transition cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${item.corIcone}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="text-xl font-extrabold text-gray-800">{item.valor}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-700 leading-tight">
                        {item.tituloMobile}
                      </span>
                    </div>
                  );
                })}
            </div>

          </section>

          {/* SEÇÃO DE ATENDIMENTOS DE HOJE & LEMBRETES */}
          <section className="order-1 md:order-2 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

            {/* Coluna Maior (2 spans): Próximos Atendimentos do Dia */}
            <div className="lg:col-span-2 bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#1b5e3a]" />
                  <h2 className="text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Atendimentos de Hoje
                  </h2>
                </div>
                <span className="text-xs font-semibold text-[#1b5e3a] bg-emerald-50 px-3 py-1 rounded-full">
                  {atendimentosHoje.length} sessões
                </span>
              </div>

              <div className="space-y-3">
                {atendimentosHoje.map((sessao) => (
                  <div
                    key={sessao.id}
                    onClick={() => onNavigate && onNavigate('detalhe-paciente')}
                    className="p-3.5 md:p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-emerald-50/40 hover:border-emerald-200 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="px-2.5 py-2 bg-white border border-gray-200 rounded-xl text-center min-w-[62px] shadow-xs">
                        <span className="text-xs font-extrabold text-[#1b5e3a] block">{sessao.horario}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-800">{sessao.paciente}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{sessao.tipo}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-600 bg-white px-2 py-0.5 rounded-md border border-gray-200">
                            {sessao.modalidade.includes('Online') && <Video className="w-3 h-3 text-[#1b5e3a]" />}
                            {sessao.modalidade}
                          </span>
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${sessao.status === 'Confirmado'
                              ? 'bg-emerald-50 text-[#1b5e3a]'
                              : 'bg-amber-50 text-amber-700'
                            }`}>
                            {sessao.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end text-xs font-bold text-[#1b5e3a] gap-1">
                      <span>Abrir prontuário</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna Menor (1 span): Lembretes de Devolutiva */}
            <div className="hidden md:block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <Bell className="w-4 h-4 text-amber-600" />
                <h2 className="text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Lembretes & Devolutivas
                </h2>
              </div>

              <div className="space-y-3">
                {lembretesDevolutiva.map((lembrete) => (
                  <div
                    key={lembrete.id}
                    className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800">{lembrete.paciente}</span>
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {lembrete.motivo}
                    </p>
                    <button
                      type="button"
                      onClick={() => onNavigate && onNavigate('detalhe-paciente')}
                      className="text-[11px] font-bold text-[#1b5e3a] hover:underline pt-1 inline-block cursor-pointer"
                    >
                      {lembrete.acao} &rarr;
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </section>

        </main>
      </div>

      {/* NAVEGAÇÃO INFERIOR MOBILE */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-3 py-2 flex justify-around items-center z-20 shadow-lg">
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('dashboard-profissional')}
          className="flex flex-col items-center text-[#1b5e3a] gap-1 cursor-pointer"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-bold">Início</span>
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