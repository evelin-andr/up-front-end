import React, { useState } from 'react';

export default function Register({ onSwitchToLogin, onNavigate }) {
  // variáveis para guardar os dados do formulário de cadastro
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Estados para controlar mensagens de erro e bordas vermelhas
  const [erroSenha, setErroSenha] = useState(false);
  const [msgErroSenha, setMsgErroSenha] = useState('');
  const [erroTermos, setErroTermos] = useState(false);
  const [msgGeral, setMsgGeral] = useState('');

  // Estado para controlar se o cadastro foi concluído com sucesso
  const [sucesso, setSucesso] = useState(false);

  // Função para lidar com o redirecionamento ao login de forma segura
  const irParaLogin = () => {
    if (typeof onSwitchToLogin === 'function') {
      onSwitchToLogin();
    } else if (typeof onNavigate === 'function') {
      onNavigate('login');
    }
  };

  // Função acionada ao clicar no botão de criar conta
  const handleRegister = (e) => {
    e.preventDefault();
    
    let temErro = false;
    setMsgGeral('');
    setMsgErroSenha('');

    // Validação da caixa de termos de uso
    if (!acceptTerms) {
      setErroTermos(true);
      setMsgGeral("Deve aceitar os termos de uso para continuar.");
      temErro = true;
    } else {
      setErroTermos(false);
    }

    // Validação de tamanho mínimo da senha
    if (password.length <= 6) {
      setErroSenha(true);
      setMsgErroSenha("A senha deve ter mais de 6 caracteres.");
      temErro = true;
    } 
    // Validação se as senhas são divergentes
    else if (password !== confirmPassword) {
      setErroSenha(true);
      setMsgErroSenha("As palavras-passe não coincidem.");
      temErro = true;
    } 
    else {
      setErroSenha(false);
    }

    if (temErro) {
      return;
    }

    // Se passou em todas as validações, ativa o ecrã de sucesso
    setSucesso(true);
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-center items-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        
        {sucesso ? (
          /* MENSAGEM E TELA DE CONTA CRIADA COM SUCESSO */
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 bg-emerald-100 text-[#1b5e3a] font-bold rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-inner">
              ✓
            </div>
            <h1 className="text-xl font-bold text-gray-800 tracking-wide">Conta criada com sucesso!</h1>
            <p className="text-xs text-gray-500">O seu registo foi concluído com sucesso. Já pode aceder ao sistema.</p>

            <button 
              type="button"
              onClick={irParaLogin}
              className="w-full py-3.5 bg-[#1b5e3a] text-white font-medium rounded-xl hover:bg-[#14472c] transition duration-200 shadow-md text-sm mt-4 cursor-pointer"
            >
              Ir para o Login
            </button>
          </div>
        ) : (
          /* FORMULÁRIO DE REGISTO */
          <>
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-gray-800 tracking-wide">Criar sua conta</h1>
              <p className="text-sm text-gray-500 mt-1">Preencha os dados abaixo para se cadastrar</p>
            </div>

            {/* Mensagem de Erro Geral (ex: Termos não aceitos) */}
            {msgGeral && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center font-semibold text-xs">
                {msgGeral}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Nome completo: <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Digite o seu nome completo:" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1b5e3a] text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  E-mail: <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nome@exemplo.com" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1b5e3a] text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Usuário: <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="@maria_silva" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1b5e3a] text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Senha: <span className="text-red-500">*</span>
                </label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Crie uma senha" 
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    erroSenha ? 'border-red-500 focus:ring-red-500 bg-red-50/20' : 'border-gray-200 focus:ring-[#1b5e3a]'
                  }`}
                  required
                />
                <p className="text-[11px] text-gray-400 mt-1">Mais de 6 caracteres</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Confirmar senha: <span className="text-red-500">*</span>
                </label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmar a senha:" 
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    erroSenha ? 'border-red-500 focus:ring-red-500 bg-red-50/20' : 'border-gray-200 focus:ring-[#1b5e3a]'
                  }`}
                  required
                />
                {/* Mensagem de erro específica para senha (tamanho ou divergência) */}
                {erroSenha && msgErroSenha && (
                  <p className="text-[11px] text-red-500 mt-1 font-semibold">{msgErroSenha}</p>
                )}
              </div>

              {/* Termos de uso */}
              <div className="flex items-start space-x-2 pt-1">
                <input 
                  type="checkbox" 
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className={`mt-1 rounded cursor-pointer ${
                    erroTermos ? 'border-2 border-red-500 text-red-600' : 'border-gray-300 text-[#1b5e3a] focus:ring-[#1b5e3a]'
                  }`}
                />
                <span className="text-xs text-gray-600">
                  Li e aceito os <a href="#" className="text-[#1b5e3a] underline font-medium">Termos de uso</a> e <a href="#" className="text-[#1b5e3a] underline font-medium">Política de privacidade</a> <span className="text-red-500">*</span>
                </span>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-[#1b5e3a] text-white font-medium rounded-xl hover:bg-[#14472c] transition duration-200 shadow-md text-sm mt-2 cursor-pointer"
              >
                Criar conta
              </button>
            </form>

            {/* Link para voltar ao Login */}
            <div className="text-center mt-6">
              <p className="text-xs text-gray-500">
                Já tem cadastro?{' '}
                <button type="button" onClick={irParaLogin} className="text-[#1b5e3a] font-semibold hover:underline cursor-pointer">
                  Entrar
                </button>
              </p>
            </div>

            <div className="text-center mt-6">
              <p className="text-xs text-gray-400">Versão 1.0.0</p>
            </div>
          </>
        )}

      </div>
    </div>
  );
}