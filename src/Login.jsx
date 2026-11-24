import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import folhaIcon from './folha.png'; 
import folhaLoginImg from './FolhaLogin.jpg'; 

export default function Login({ onSwitchToRegister, onNavigate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState('paciente'); // 'paciente' ou 'profissional'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col justify-end lg:justify-center items-center relative overflow-hidden notranslate bg-cover bg-center bg-no-repeat bg-fixed p-0 lg:px-4 lg:py-8" 
      style={{ backgroundImage: `url(${folhaLoginImg})` }}
      translate="no"
    >
      {/* Camada de sombra/overlay escuro adaptável à tela inteira */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-0"></div>

      {/* 1. LOGOTIPO APENAS NO MOBILE (Posicionado no topo sobre a imagem) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-center z-10 px-4 text-white lg:hidden">
        <div className="w-14 h-14 bg-[#1b5e3a] rounded-2xl flex items-center justify-center text-white mb-2 shadow-md border border-white/20">
          <img 
            src={folhaIcon} 
            alt="Ícone Folha" 
            className="w-6 h-6 object-contain"
          />
        </div>
        <h1 className="text-xl font-bold tracking-wide">UP</h1>
      </div>

      {/* CONTAINER DO CARD (Largura total no mobile, limitado no desktop) */}
      <div className="relative z-10 flex flex-col items-center w-full lg:max-w-md">
        
        {/* 2. LOGOTIPO APENAS NO DESKTOP (Acima do card) */}
        <div className="hidden lg:flex flex-col items-center text-center mb-5 text-white">
          <div className="w-14 h-14 bg-[#1b5e3a] rounded-2xl flex items-center justify-center text-white mb-2 shadow-md border border-white/20">
            <img 
              src={folhaIcon} 
              alt="Ícone Folha" 
              className="w-6 h-6 object-contain"
            />
          </div>
          <h1 className="text-xl font-bold tracking-wide">UP</h1>
        </div>

        {/* CARD DE LOGIN (Preenche as bordas laterais e inferior no mobile; card flutuante no desktop) */}
        <div className="w-full bg-white rounded-t-[35px] lg:rounded-3xl shadow-2xl p-6 pb-8 lg:p-8 border-t lg:border border-white/20">
          
          {/* TEXTO "ACESSE SUA CONTA PARA CONTINUAR" CENTRALIZADO */}
          <div className="mb-5 text-center">
            <p className="text-xs md:text-sm font-semibold text-gray-500">
              Acesse sua conta para continuar
            </p>
          </div>

          {/* ABAS: Paciente / Cliente (Esquerda) e Profissional (Direita) */}
          <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center mb-6">
            <button
              type="button"
              onClick={() => setTipoUsuario('paciente')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                tipoUsuario === 'paciente'
                  ? 'bg-[#1b5e3a] text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Paciente / Cliente
            </button>
            <button
              type="button"
              onClick={() => setTipoUsuario('profissional')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                tipoUsuario === 'profissional'
                  ? 'bg-[#1b5e3a] text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Profissional
            </button>
          </div>
   
          {/* Formulário de Login */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha" 
                  className="w-full pl-4 pr-11 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1b5e3a] text-sm bg-gray-50/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1b5e3a] transition cursor-pointer p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
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
              className="w-full py-3.5 bg-[#1b5e3a] text-white font-medium rounded-xl hover:bg-[#14472c] transition duration-200 shadow-md text-sm cursor-pointer mt-2"
            >
              Entrar
            </button>
          </form>

          {/* Link para ir para o Registo */}
          <div className="text-center mt-5">
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
          <div className="text-center mt-5">
            <p className="text-xs text-gray-400">Versão 1.0.0</p>
          </div>

        </div>
      </div>
    </div>
  );
}