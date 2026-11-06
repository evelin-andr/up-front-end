import React, { useState } from 'react';
import folhaIcon from './folha.png'; 

export default function Navbar({ userName = "Maria Souza", profilePic, onNavigate, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleOptionClick = (screen) => {
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate(screen);
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 px-4 py-3 shadow-sm relative">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        
        {/* Esquerda: Ícone da Folhinha */}
        <div className="flex items-center">
          <img 
            src={folhaIcon} 
            alt="Ícone Folha" 
            className="w-7 h-7 object-contain"
          />
        </div>

        {/* Centro: Saudação */}
        <div className="text-center font-bold text-[#1b5e3a] text-base md:text-lg">
          Olá, {userName}
        </div>

        {/* Direita: Foto de Perfil ou Ícone com Menu Dropdown */}
        <div className="relative">
          <button 
            onClick={toggleMenu}
            className="w-8 h-8 rounded-full overflow-hidden border border-[#1b5e3a] flex items-center justify-center bg-emerald-50 hover:opacity-90 transition focus:outline-none"
            aria-label="Menu do Perfil"
          >
            {profilePic ? (
              <img src={profilePic} alt="Perfil" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-5 h-5 text-[#1b5e3a]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>

          {/* Menu Suspenso */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50">
              <button 
                onClick={() => handleOptionClick('minha-conta')}
                className="w-full text-left px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#1b5e3a] transition"
              >
                👤 Minha Conta
              </button>
              <button 
                onClick={() => handleOptionClick('dependentes')}
                className="w-full text-left px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#1b5e3a] transition"
              >
                👶 Meus Dependentes
              </button>
              <button 
                onClick={() => handleOptionClick('agendamentos')}
                className="w-full text-left px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-emerald-50 hover:text-[#1b5e3a] transition"
              >
                📅 Meus Agendamentos
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button 
                onClick={onLogout}
                className="w-full text-left px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition"
              >
                 Sair
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}