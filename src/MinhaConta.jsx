import React, { useState } from 'react';

export default function MinhaConta({ userName, setUserName, profilePic, setProfilePic, onNavigate, onLogout }) {
  // Estados para os campos editáveis e informativos
  const [nome, setNome] = useState(userName || 'Dra. Maria Souza');
  const [email, setEmail] = useState('maria@exemplo.com.br');
  const [telefone, setTelefone] = useState('(85) 99876-5432');
  const [usuario] = useState('maria.souza'); // Campo fixo (não pode ser alterado)
  const [dataCriacao] = useState('14 de março de 2026'); // Campo fixo

  const [isEditing, setIsEditing] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  // Lidar com a alteração da foto de perfil
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Salvar alterações do perfil
  const handleSave = (e) => {
    e.preventDefault();
    if (setUserName) {
      setUserName(nome);
    }
    setIsEditing(false);
    setMensagemSucesso('Dados atualizados com sucesso!');
    setTimeout(() => setMensagemSucesso(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF3EC] text-gray-800 flex flex-col w-full notranslate" translate="no">
      
      {/* Cabeçalho */}
      <header className="bg-white border-b border-gray-100 px-6 md:px-12 py-4 shadow-sm sticky top-0 z-10">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
          <button 
            type="button"
            onClick={() => onNavigate('dashboard-profissional')}
            className="flex items-center text-xs md:text-sm font-bold text-[#1b5e3a] hover:opacity-80 transition gap-1.5 focus:outline-none cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>
          
          <span className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">Minha Conta</span>
          
          <div className="w-10"></div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 px-4 md:px-12 py-8 max-w-6xl mx-auto w-full space-y-6">
        
        {/* Alerta de Sucesso */}
        {mensagemSucesso && (
          <div className="bg-emerald-50 border border-emerald-200 text-[#1b5e3a] px-4 py-3 rounded-2xl text-xs md:text-sm font-semibold text-center">
            {mensagemSucesso}
          </div>
        )}

        {/* LAYOUT EM DUAS COLUNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* COLUNA ESQUERDA (1 span): Card de Perfil + Botão de Encerrar Sessão */}
          <div className="space-y-4">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-emerald-50 border-2 border-[#1b5e3a] flex items-center justify-center text-[#1b5e3a] font-bold text-3xl shadow-sm">
                  {profilePic ? (
                    <img src={profilePic} alt="Perfil" className="w-full h-full object-cover" />
                  ) : (
                    <span>{nome.charAt(0)}</span>
                  )}
                </div>

                <label htmlFor="upload-avatar" className="absolute bottom-0 right-0 bg-[#1b5e3a] text-white p-2.5 rounded-full cursor-pointer shadow-md hover:opacity-90 transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </label>
                <input 
                  id="upload-avatar" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="hidden" 
                />
              </div>

              <div>
                <h1 className="text-base md:text-lg font-bold text-gray-800">{nome}</h1>
                <p className="text-xs text-gray-500 mt-0.5">{email}</p>
                <span className="inline-block mt-3 px-3 py-1 bg-emerald-50 text-[#1b5e3a] text-[11px] font-bold rounded-full">
                  Psicopedagoga
                </span>
              </div>
            </div>

            {/* Botão de Encerrar Sessão Posicionado na Esquerda */}
            <button 
              type="button"
              onClick={onLogout}
              className="w-full py-3.5 bg-red-50 text-red-600 rounded-2xl text-xs md:text-sm font-bold hover:bg-red-100 transition shadow-sm border border-red-100 cursor-pointer"
            >
              Encerrar Sessão
            </button>
          </div>

          {/* COLUNA DIREITA (2 spans): Bloco de Dados do Cadastro e Segurança */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <h2 className="text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider">Dados do Cadastro</h2>
                {!isEditing && (
                  <button 
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="text-xs md:text-sm font-bold text-[#1b5e3a] hover:underline cursor-pointer"
                  >
                    Editar
                  </button>
                )}
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs md:text-sm">
                <div>
                  <label className="block text-[11px] md:text-xs font-medium text-gray-400 mb-0.5">Nome completo</label>
                  <input 
                    type="text" 
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)}
                    disabled={!isEditing}
                    className={`w-full rounded-xl transition ${
                      isEditing 
                        ? 'px-3 py-2.5 bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#1b5e3a]' 
                        : 'bg-transparent border-none text-gray-800 font-bold px-0 py-0.5'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] md:text-xs font-medium text-gray-400 mb-0.5">E-mail</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    className={`w-full rounded-xl transition ${
                      isEditing 
                        ? 'px-3 py-2.5 bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#1b5e3a]' 
                        : 'bg-transparent border-none text-gray-800 font-bold px-0 py-0.5'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] md:text-xs font-medium text-gray-400 mb-0.5">Telefone de contato</label>
                  <input 
                    type="text" 
                    value={telefone} 
                    onChange={(e) => setTelefone(e.target.value)}
                    disabled={!isEditing}
                    className={`w-full rounded-xl transition ${
                      isEditing 
                        ? 'px-3 py-2.5 bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#1b5e3a]' 
                        : 'bg-transparent border-none text-gray-800 font-bold px-0 py-0.5'
                    }`}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-0.5">
                    <label className="text-[11px] md:text-xs font-medium text-gray-400">Usuário</label>
                    <span className="text-[10px] md:text-xs text-gray-400">não pode ser alterado</span>
                  </div>
                  <input 
                    type="text" 
                    value={usuario} 
                    disabled 
                    className="w-full bg-transparent border-none text-gray-800 font-bold px-0 py-0.5 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-[11px] md:text-xs font-medium text-gray-400 mb-0.5">Conta criada em</label>
                  <p className="text-gray-800 font-bold py-0.5">{dataCriacao}</p>
                </div>

                {isEditing && (
                  <div className="flex justify-end gap-3 pt-3">
                    <button 
                      type="button" 
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      className="px-5 py-2.5 bg-[#1b5e3a] text-white rounded-xl font-semibold hover:opacity-90 transition cursor-pointer shadow-sm"
                    >
                      Salvar
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Bloco: Segurança */}
            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3">
              <h2 className="text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider">Segurança</h2>
              <div 
                onClick={() => onNavigate('alterar-senha')}
                className="flex items-center justify-between p-3.5 bg-emerald-50/50 rounded-xl cursor-pointer hover:bg-emerald-50 transition border border-emerald-100/60"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-[#1b5e3a]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-bold text-gray-800">Alterar senha</h3>
                    <p className="text-[11px] md:text-xs text-gray-500">Atualize sua senha de acesso</p>
                  </div>
                </div>
                <span className="text-gray-400 font-bold text-lg">&rsaquo;</span>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}