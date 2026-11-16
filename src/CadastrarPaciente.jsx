import React, { useState } from 'react';
import { 
  Calendar, 
  CalendarPlus,
  Users, 
  ArrowLeft, 
  UserPlus, 
  UserCheck,
  LayoutDashboard,
  Settings,
  ExternalLink,
  Mail, 
  CreditCard, 
  Phone, 
  AtSign 
} from 'lucide-react';
import folhaIcon from './folha.png';

export default function CadastrarPaciente({ 
  onNavigate, 
  onSavePatient, 
  userName = 'Dra. Maria Souza', 
  profilePic = null 
}) {
  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [idade, setIdade] = useState('');
  const [escolaridade, setEscolaridade] = useState('');
  const [categoria, setCategoria] = useState('meus'); // 'meus' ou 'clinica'
  const [observacoes, setObservacoes] = useState('');

  // Função para formatar e limitar o CPF (máx 11 dígitos) -> 000.000.000-00
  const handleCpfChange = (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);

    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    setCpf(valor);
  };

  // Função para formatar e limitar o Telefone (máx 11 dígitos) -> (00) 00000-0000
  const handleTelefoneChange = (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length > 10) {
      valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*$/, '($1) $2-$3');
    } else if (valor.length > 6) {
      valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*$/, '($1) $2-$3');
    } else if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else if (valor.length > 0) {
      valor = valor.replace(/^(\d*)/, '($1');
    }

    setTelefone(valor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const novoPaciente = {
      id: Date.now(),
      nome,
      username,
      email,
      telefone,
      cpf,
      idade: Number(idade),
      escolaridade,
      categoria,
      foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
      observacoes
    };

    if (onSavePatient) {
      onSavePatient(novoPaciente);
    }

    onNavigate && onNavigate('pacientes');
  };

  const abrirGoogleAgenda = () => {
    window.open('https://calendar.google.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#FAF3EC] text-gray-800 flex flex-col md:flex-row w-full notranslate" translate="no">

      {/* SIDEBAR DESKTOP PADRONIZADA (Forest Green) */}
      <aside className="hidden md:flex md:w-64 bg-[#1b5e3a] text-white flex-col justify-between p-6 fixed inset-y-0 left-0 z-20 shadow-lg overflow-y-auto">
        <div className="space-y-6">
          {/* Logo */}
          <div 
            onClick={() => onNavigate && onNavigate('dashboard-profissional')}
            className="flex items-center gap-3 px-2 cursor-pointer"
          >
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
              className="w-full flex items-center gap-3 px-4 py-2.5 text-emerald-100 hover:bg-white/10 hover:text-white rounded-xl text-sm font-medium transition cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              Visão Geral
            </button>

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

            {/* Item Ativo */}
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('cadastrar-paciente')}
              className="w-full flex items-center gap-3 px-4 py-2.5 bg-white/15 text-white rounded-xl text-sm font-semibold transition cursor-pointer"
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

        <div className="pt-4 border-t border-white/15 mt-6">
          <p className="text-xs text-emerald-200/80 px-2">Versão 1.0.0</p>
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen pb-24 md:pb-10">
        
        {/* Cabeçalho Superior */}
        <header className="bg-white border-b border-gray-100 px-6 md:px-10 py-4 sticky top-0 z-10 shadow-sm">
          <div className="max-w-4xl mx-auto flex justify-between items-center gap-3">
            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={() => onNavigate && onNavigate('pacientes')}
                className="p-2 rounded-xl bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-[#1b5e3a] transition cursor-pointer"
                title="Voltar para Meus Pacientes"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-base md:text-xl font-bold text-gray-800">Cadastrar Paciente</h1>
                <p className="text-[11px] md:text-xs text-gray-500">Preencha os dados abaixo para liberar o acesso à sua agenda</p>
              </div>
            </div>

            <button 
              type="button"
              onClick={() => onNavigate && onNavigate('minha-conta')}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-emerald-50 border border-[#1b5e3a]/30 text-[#1b5e3a] font-bold text-sm flex items-center justify-center hover:bg-emerald-100 transition cursor-pointer shrink-0 overflow-hidden"
              title="Minha Conta"
            >
              {profilePic ? (
                <img src={profilePic} alt={userName} className="w-full h-full object-cover" />
              ) : (
                userName.charAt(0)
              )}
            </button>
          </div>
        </header>

        {/* Conteúdo do Formulário */}
        <main className="flex-1 w-full max-w-4xl mx-auto px-5 md:px-10 py-6 md:py-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Card de Dados do Formulário */}
            <div className="bg-white p-5 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-5">
              
              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5">
                  Nome Completo do Paciente *
                </label>
                <input 
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Lucas Gabriel Santos"
                  className="w-full bg-gray-50/50 px-3.5 py-3 rounded-xl border border-gray-200 text-xs md:text-sm focus:outline-none focus:border-[#1b5e3a] transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* CAMPO DE NOME DE UTILIZADOR */}
                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5">
                    Nome de Utilizador *
                  </label>
                  <div className="relative">
                    <AtSign className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="ex: lucas_gabriel"
                      className="w-full bg-gray-50/50 pl-10 pr-3.5 py-3 rounded-xl border border-gray-200 text-xs md:text-sm focus:outline-none focus:border-[#1b5e3a] transition"
                    />
                  </div>
                </div>

                {/* CAMPO DE E-MAIL DE ACESSO */}
                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5">
                    E-mail de Acesso ao App *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="paciente@email.com"
                      className="w-full bg-gray-50/50 pl-10 pr-3.5 py-3 rounded-xl border border-gray-200 text-xs md:text-sm focus:outline-none focus:border-[#1b5e3a] transition"
                    />
                  </div>
                </div>
              </div>

              <p className="text-[11px] md:text-xs text-[#1b5e3a] -mt-2 font-medium">
                O paciente utilizará este e-mail para entrar no aplicativo e visualizar sua agenda.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* CAMPO DE TELEFONE COM MÁSCARA AUTOMÁTICA */}
                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5">
                    Telefone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="tel"
                      inputMode="numeric"
                      required
                      value={telefone}
                      onChange={handleTelefoneChange}
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                      className="w-full bg-gray-50/50 pl-10 pr-3.5 py-3 rounded-xl border border-gray-200 text-xs md:text-sm focus:outline-none focus:border-[#1b5e3a] transition"
                    />
                  </div>
                </div>

                {/* CAMPO DE CPF COM MÁSCARA E FORMATAÇÃO AUTOMÁTICA */}
                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5">
                    CPF *
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text"
                      inputMode="numeric"
                      required
                      value={cpf}
                      onChange={handleCpfChange}
                      placeholder="000.000.000-00"
                      maxLength={14}
                      className="w-full bg-gray-50/50 pl-10 pr-3.5 py-3 rounded-xl border border-gray-200 text-xs md:text-sm focus:outline-none focus:border-[#1b5e3a] transition"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5">
                    Idade (Anos) *
                  </label>
                  <input 
                    type="number"
                    required
                    min="1"
                    max="100"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                    placeholder="Ex: 9"
                    className="w-full bg-gray-50/50 px-3.5 py-3 rounded-xl border border-gray-200 text-xs md:text-sm focus:outline-none focus:border-[#1b5e3a] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5">
                    Escolaridade
                  </label>
                  <input 
                    type="text"
                    value={escolaridade}
                    onChange={(e) => setEscolaridade(e.target.value)}
                    placeholder="Ex: 4º Ano Fundamental"
                    className="w-full bg-gray-50/50 px-3.5 py-3 rounded-xl border border-gray-200 text-xs md:text-sm focus:outline-none focus:border-[#1b5e3a] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5">
                    Vincular à Categoria
                  </label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full bg-gray-50/50 px-3.5 py-3 rounded-xl border border-gray-200 text-xs md:text-sm focus:outline-none focus:border-[#1b5e3a] transition"
                  >
                    <option value="meus">Meus Pacientes</option>
                    <option value="clinica">Todos da Clínica (Geral)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1.5">
                  Observações Iniciais / Queixa Principal
                </label>
                <textarea 
                  rows="3"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Dificuldade na leitura e escrita, desatenção..."
                  className="w-full bg-gray-50/50 px-3.5 py-3 rounded-xl border border-gray-200 text-xs md:text-sm focus:outline-none focus:border-[#1b5e3a] transition resize-none"
                />
              </div>

            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('pacientes')}
                className="px-6 py-3.5 bg-white border border-gray-200 text-gray-600 font-bold text-xs md:text-sm rounded-2xl hover:bg-gray-50 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#1b5e3a] text-white font-bold text-xs md:text-sm rounded-2xl hover:bg-[#14472c] transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                Salvar e Liberar Acesso
              </button>
            </div>

          </form>
        </main>

        {/* Navegação Inferior Mobile */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-2.5 px-4 flex justify-around items-center z-20 shadow-lg md:hidden">
          <button 
            type="button"
            onClick={() => onNavigate('dashboard-profissional')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#1b5e3a] transition text-[10px] font-medium"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Início</span>
          </button>
          
          <button 
            type="button"
            onClick={abrirGoogleAgenda}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#1b5e3a] transition text-[10px] font-medium"
          >
            <Calendar className="w-5 h-5" />
            <span>Agenda</span>
          </button>

          <button 
            type="button"
            onClick={() => onNavigate('marcar-consulta-profissional')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#1b5e3a] transition text-[10px] font-medium"
          >
            <CalendarPlus className="w-5 h-5" />
            <span>Marcar</span>
          </button>

          <button 
            type="button"
            onClick={() => onNavigate('pacientes')}
            className="flex flex-col items-center gap-1 text-[#1b5e3a] font-bold text-[10px]"
          >
            <Users className="w-5 h-5" />
            <span>Pacientes</span>
          </button>

          <button 
            type="button"
            onClick={() => onNavigate('minha-conta')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#1b5e3a] transition text-[10px] font-medium"
          >
            <UserCheck className="w-5 h-5" />
            <span>Conta</span>
          </button>
        </nav>
      </div>
    </div>
  );
}