import React, { useState } from 'react';
import folhaIcon from './folha.png'; 

export default function Login({ onSwitchToRegister, onNavigate }){
    //onde vai ser guardado o email e senha nos inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //função acionada ao clicar no botão de entrar
    const handleSubmit = (e) => {
       e.preventDefault();
       console.log("Email:", username, "Senha:", password);
       // Redireciona para o dashboard ao fazer login com sucesso
       if (onNavigate) {
         onNavigate('dashboard');
       }
    };

    return (
        <div className="min-h-screen bg-ivory flex flex-col justify-center items-center px-4 py-8">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            
            {/* Cabeçalho / Logótipo do PDF */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-[#1b5e3a] rounded-2xl flex items-center justify-center text-white mb-4 shadow-md">
                {/* Ícone de folha/planta simulado */}
                <img 
                   src={folhaIcon} 
                   alt="Ícone Folha" 
                   className="w-7 h-7 object-contain"
                />
              </div>
              <h1 className="text-xl font-bold text-gray-800 tracking-wide">UP</h1>
              <p className="text-sm text-gray-500 mt-1">Acesse sua conta para continuar</p>
            </div>
    
            {/* Formulário de Login */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Usuário:</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Digite seu usuário" 
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
                  placeholder="Digite sua senha" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1b5e3a] text-sm"
                  required
                />
                <div className="flex justify-end mt-1">
                  <button 
                    type="button" 
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate('esqueci-senha');
                      }
                    }} 
                    className="text-xs text-[#1b5e3a] hover:underline font-medium bg-transparent border-none cursor-pointer p-0"
                  >
                    Esqueci minha senha
                  </button>
                </div>
              </div>
    
              <button 
                type="submit"
                className="w-full py-3.5 bg-[#1b5e3a] text-white font-medium rounded-xl hover:bg-[#14472c] transition duration-200 shadow-md text-sm"
              >
                Entrar
              </button>
            </form>

      {/* Link para ir para o Registo */}
      <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Ainda não tem conta?{' '}
            <button 
              type="button"
              onClick={() => {
                if (onSwitchToRegister) {
                  onSwitchToRegister();
                }
              }} 
              className="text-[#1b5e3a] font-semibold hover:underline bg-transparent border-none cursor-pointer p-0"
            >
              Criar sua conta
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