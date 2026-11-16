import React, { useState } from 'react';
import folhaIcon from './folha.png'; 
import folhaLoginImg from './FolhaLogin.jpg'; 

export default function Login({ onSwitchToRegister, onNavigate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex justify-center items-center relative overflow-hidden notranslate px-4 py-8 bg-cover bg-center bg-no-repeat bg-fixed" 
      style={{ backgroundImage: `url(${folhaLoginImg})` }}
      translate="no"
    >
      {/* Camada de sombra/overlay escuro adaptável à tela inteira */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-0"></div>

      {/* CARD DE LOGIN CENTRALIZADO */}
      <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/20 relative z-10">
        
        {/* Cabeçalho / Logótipo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#1b5e3a] rounded-2xl flex items-center justify-center text-white mb-4 shadow-md">
            <img 
              src={folhaIcon} 
              alt="Ícone Folha" 
              className="w-7 h-7 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">UP</h1>
          <p className="text-sm text-gray-500 mt-1">Acesse sua conta para continuar</p>
        </div>
  
        {/* Formulário de Login */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">E-mail:</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu e-mail" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1b5e3a] text-sm bg-gray-50/50"
              required
            />
          </div>
  
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Senha:</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1b5e3a] text-sm bg-gray-50/50"
              required
            />
            <div className="flex justify-end mt-1.5">
              <button 
                type="button" 
                onClick={() => onNavigate && onNavigate('esqueci-senha')} 
                className="text-xs text-[#1b5e3a] hover:underline font-medium bg-transparent border-none cursor-pointer p-0"
              >
                Esqueci minha senha
              </button>
            </div>
          </div>
  
          <button 
            type="submit"
            className="w-full py-3.5 bg-[#1b5e3a] text-white font-medium rounded-xl hover:bg-[#14472c] transition duration-200 shadow-md text-sm cursor-pointer"
          >
            Entrar
          </button>
        </form>

        {/* Link para ir para o Registo */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Primeiro acesso? {' '}
            <button 
              type="button"
              onClick={() => onSwitchToRegister && onSwitchToRegister()} 
              className="text-[#1b5e3a] font-semibold hover:underline bg-transparent border-none cursor-pointer p-0"
            >
              Ativar sua conta
            </button>
          </p>
        </div>

        {/* Rodapé da Tela */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">Versão 1.0.0</p>
        </div>

      </div>
    </div>
  );
}