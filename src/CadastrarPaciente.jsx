import React, { useState } from 'react';
import logoImg from './folha.png';
import { Home, Calendar, Users, User, ArrowLeft, UserPlus, Mail, CreditCard, Phone, AtSign, LogOut } from 'lucide-react';

export default function CadastrarPaciente({ onNavigate, onSavePatient, userName = "Dra. Maria Souza", profilePic, onLogout }) {
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
    let valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos

    // Aplica a máscara
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    setCpf(valor);
  };

  // Função para formatar e limitar o Telefone (máx 11 dígitos) -> (00) 00000-0000
  const handleTelefoneChange = (e) => {
    let valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos

    // Aplica a máscara dinamicamente
    if (valor.length > 10) {
      // Celular com 9 dígitos: (00) 00000-0000
      valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*$/, '($1) $2-$3');
    } else if (valor.length > 6) {
      // Fixo ou em digitação: (00) 0000-0000
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

    onNavigate('pacientes');
  };

  const handleOpenGoogleCalendar = () => {
    window.open('https://calendar.google.com', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF3EC] text-gray-800 flex w-full notranslate" translate="no">

      {/* MENU LATERAL ESQUERDO (DESKTOP - md:flex) */}
      <aside className="hidden md:flex md:w-64 lg:w-72 bg-[#1b5e3a] text-white flex-col justify-between sticky top-0 h-screen shrink-0 shadow-xl z-20">
        
        {/* Topo do Menu: Logo e Nome */}
        <div className="p-6 space-y-8">
          <div 
            onClick={() => onNavigate && onNavigate('dashboard-profissional')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-sm">
              <img
                src={logoImg}
                alt="Logo UP"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block leading-none">Espaço UP</span>
              <span className="text-[11px] text-emerald-200 font-medium">Área Profissional</span>
            </div>
          </div>

          {/* Links de Navegação */}
          <nav className="space-y-1.5">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('dashboard-profissional')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-100 hover:bg-white/10 hover:text-white font-medium text-sm transition"
            >
              <Home className="w-5 h-5" />
              <span>Início</span>
            </button>

            <button
              type="button"
              onClick={handleOpenGoogleCalendar}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-100 hover:bg-white/10 hover:text-white font-medium text-sm transition"
            >
              <Calendar className="w-5 h-5" />
              <span>Agenda</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('pacientes')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/15 text-white font-semibold text-sm transition shadow-sm"
            >
              <Users className="w-5 h-5" />
              <span>Pacientes</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('minha-conta')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-emerald-100 hover:bg-white/10 hover:text-white font-medium text-sm transition"
            >
              <User className="w-5 h-5" />
              <span>Minha Conta</span>
            </button>
          </nav>
        </div>

        {/* Rodapé do Menu Lateral: Perfil Resumido e Sair */}
        <div className="p-4 m-4 bg-[#14472c] rounded-2xl border border-white/10 space-y-3">
          <div 
            onClick={() => onNavigate && onNavigate('minha-conta')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-300 bg-emerald-800 flex items-center justify-center shrink-0">
              {profilePic ? (
                <img src={profilePic} alt="Perfil" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-emerald-200" />
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{userName}</p>
              <p className="text-[11px] text-emerald-200 truncate">Psicopedagoga</p>
            </div>
          </div>

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/10 hover:bg-red-500/80 text-white text-xs font-semibold transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair da Conta</span>
            </button>
          )}
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO PRINCIPAL (OCUPA O RESTANTE DA TELA) */}
      <div className="flex-1 flex flex-col justify-between min-h-screen bg-[#FAF3EC] relative overflow-x-hidden pb-24 md:pb-8">
        
        {/* Cabeçalho */}
        <header className="bg-white px-6 md:px-10 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <button 
            type="button"
            onClick={() => onNavigate('pacientes')}
            className="flex items-center text-xs md:text-sm font-bold text-[#1b5e3a] hover:opacity-80 transition gap-1.5 focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
          
          <span className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">
            Novo Paciente
          </span>
          
          {/* Foto de perfil visível no mobile */}
          <div 
            onClick={() => onNavigate && onNavigate('minha-conta')}
            className="w-9 h-9 rounded-full overflow-hidden border border-[#1b5e3a] bg-emerald-50 text-[#1b5e3a] flex items-center justify-center cursor-pointer hover:bg-emerald-100 transition shrink-0 md:hidden"
          >
            {profilePic ? (
              <img src={profilePic} alt="Perfil" className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5 stroke-[1.8]" />
            )}
          </div>
          <div className="hidden md:block w-10"></div>
        </header>

        {/* Conteúdo do Formulário */}
        <main className="flex-1 w-full max-w-3xl mx-auto px-5 md:px-10 py-6 md:py-8 space-y-6">
          
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
              Cadastrar Paciente
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              Preencha os dados abaixo para liberar o acesso à sua agenda.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Card de Dados do Formulário */}
            <div className="bg-white p-5 md:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              
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
                <p className="text-[11px] md:text-xs text-[#1b5e3a] mt-1.5 font-medium">
                  O paciente utilizará este e-mail para entrar no aplicativo e visualizar sua agenda.
                </p>
              </div>

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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <option value="meus">Meus Pacientes </option>
                  <option value="clinica">Todos da Clínica (Geral)</option>
                </select>
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

            {/* Botão Salvar */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#1b5e3a] text-white font-bold text-xs md:text-sm rounded-2xl hover:bg-[#14472c] transition shadow-sm flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Salvar e Liberar Acesso
            </button>

          </form>

        </main>

        {/* Menu de Navegação Inferior: Visível APENAS no celular (md:hidden) */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3 px-6 flex justify-around items-center z-20 shadow-lg md:hidden">
          <button 
            type="button"
            onClick={() => onNavigate('dashboard-profissional')}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition text-[10px] font-medium"
          >
            <Home className="w-5 h-5" />
            <span>Início</span>
          </button>
          
          <button 
            type="button"
            onClick={handleOpenGoogleCalendar}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition text-[10px] font-medium"
          >
            <Calendar className="w-5 h-5" />
            <span>Agenda</span>
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