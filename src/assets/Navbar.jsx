import React from 'react';

export default function Navbar({ userName, onNavigate, onLogout }) {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 shadow-sm">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        
        {/* Logótipo / Título do Sistema */}
        <div className="w-full md:w-auto flex justify-center md:justify-start items-center space-x-2">
          <span className="text-xl font-bold text-[#1b5e3a]">UP</span>
         
        </div>

        {/* Menu de Navegação Rápido */}
        <nav className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
          <button onClick={() => onNavigate('dashboard')} className="hover:text-[#1b5e3a] font-medium transition">
           Home
          </button>
          <button onClick={() => alert('Funcionalidade de agendamentos em breve!')} className="hover:text-[#1b5e3a] font-medium transition">
            Agendamentos
          </button>
          <button onClick={() => alert('Funcionalidade de dependentes em breve!')} className="hover:text-[#1b5e3a] font-medium transition">
            Dependentes
          </button>
        </nav>

        {/* Perfil e Sair */}
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-gray-800">{userName || "Maria Souza"}</p>
            <p className="text-[10px] text-gray-400">Cliente / Pais</p>
          </div>
          <button 
            onClick={onLogout}
            className="px-3 py-1.5 border border-gray-200 text-xs font-semibold text-gray-600 rounded-xl hover:bg-gray-50 transition"
          >
            Sair
          </button>
        </div>

      </div>
    </header>
  );
}