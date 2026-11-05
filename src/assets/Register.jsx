import React, { useState } from 'react';

export default function Register({ onSwitchToLogin }) {
  // variaveis para guardar os dados do formulário de cadastro
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  //função acionada ao clicar no botão de criar conta
  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As palavras-passe não coincidem!");
      return;
    }
    console.log("A registar utilizador:", { fullName, email, username, password });
    // Aqui no futuro faremos o envio para o backend FastAPI
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-center items-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        
        {/* Cabeçalho do Registo */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-800 tracking-wide">Criar sua conta</h1>
          <p className="text-sm text-gray-500 mt-1">Preencha os dados abaixo para se cadastrar</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Nome completo:</label>
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
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">E-mail:</label>
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
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Usuário:</label>
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
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Senha:</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Crie uma senha" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1b5e3a] text-sm"
              required
            />
            <p className="text-[11px] text-gray-400 mt-1">Mínimo de 6 caracteres</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Confirmar senha:</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar a senha:" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1b5e3a] text-sm"
              required
            />
          </div>

          {/* Termos de uso */}
          <div className="flex items-start space-x-2 pt-1">
            <input 
              type="checkbox" 
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1 rounded border-gray-300 text-[#1b5e3a] focus:ring-[#1b5e3a]"
              required
            />
            <span className="text-xs text-gray-600">
              Li e aceito os <a href="#" className="text-[#1b5e3a] underline font-medium">Termos de uso</a> e <a href="#" className="text-[#1b5e3a] underline font-medium">Política de privacidade</a>
            </span>
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 bg-[#1b5e3a] text-white font-medium rounded-xl hover:bg-[#14472c] transition duration-200 shadow-md text-sm mt-2"
          >
            Criar conta
          </button>
        </form>

        {/* Link para voltar ao Login */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Já tem cadastro?{' '}
            <button onClick={onSwitchToLogin} className="text-[#1b5e3a] font-semibold hover:underline">
              Entrar
            </button>
          </p>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">Versão 1.0.0</p>
        </div>

      </div>
    </div>
  );
}