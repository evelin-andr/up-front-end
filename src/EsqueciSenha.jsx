import React, { useState } from 'react';

export default function EsqueciSenha({ onNavigate }) {
  const [etapa, setEtapa] = useState('email'); // 'email' | 'codigo' | 'nova-senha'
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  const handleEnviarEmail = (e) => {
    e.preventDefault();
    if (!email) return;
    // Simula o envio do código para o e-mail
    setEtapa('codigo');
  };

  const handleConfirmarCodigo = (e) => {
    e.preventDefault();
    if (!codigo) return;
    // Simula a confirmação bem-sucedida do código
    setEtapa('nova-senha');
  };

  const handleSalvarNovaSenha = (e) => {
    e.preventDefault();
    if (!novaSenha || !confirmarSenha) return;

    if (novaSenha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    setMensagemSucesso('Senha redefinida com sucesso!');
    setTimeout(() => {
      onNavigate('login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-center px-4 py-8">
      <div className="max-w-md mx-auto w-full bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
        
        {/* ETAPA 1: INSERIR E-MAIL */}
        {etapa === 'email' && (
          <>
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-emerald-100 text-[#1b5e3a] font-bold rounded-2xl flex items-center justify-center mx-auto text-lg mb-2 shadow-sm">
                🔑
              </div>
              <h1 className="text-xl font-bold text-gray-900">Recuperar senha</h1>
              <p className="text-xs text-gray-500">Digite seu e-mail cadastrado para receber o código de recuperação.</p>
            </div>

            <form onSubmit={handleEnviarEmail} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">E-mail</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                  className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a]"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-[#1b5e3a] text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 transition"
              >
                Enviar código
              </button>
            </form>

            <div className="text-center text-xs pt-2">
              <button 
                type="button"
                onClick={() => onNavigate('login')}
                className="text-[#1b5e3a] font-semibold hover:underline"
              >
                Voltar para o login
              </button>
            </div>
          </>
        )}

        {/* ETAPA 2: CONFIRMAR CÓDIGO */}
        {etapa === 'codigo' && (
          <>
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-emerald-100 text-[#1b5e3a] font-bold rounded-2xl flex items-center justify-center mx-auto text-lg mb-2 shadow-sm">
                ✉️
              </div>
              <h1 className="text-xl font-bold text-gray-900">Digite o código</h1>
              <p className="text-xs text-gray-500">Enviamos um código de verificação para <strong>{email}</strong>.</p>
            </div>

            <form onSubmit={handleConfirmarCodigo} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Código de verificação</label>
                <input 
                  type="text" 
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder="Ex: 1234"
                  maxLength={6}
                  className="w-full px-3.5 py-3 text-center text-lg tracking-widest bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a]"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-[#1b5e3a] text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 transition"
              >
                Confirmar código
              </button>
            </form>

            <div className="text-center text-xs pt-2">
              <button 
                type="button"
                onClick={() => setEtapa('email')}
                className="text-gray-500 hover:underline"
              >
                Alterar e-mail ou reenviar
              </button>
            </div>
          </>
        )}

        {/* ETAPA 3: ALTERAR SENHA (COM BOTÕES SALVAR E CANCELAR) */}
        {etapa === 'nova-senha' && (
          <>
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-emerald-100 text-[#1b5e3a] font-bold rounded-2xl flex items-center justify-center mx-auto text-lg mb-2 shadow-sm">
                🔒
              </div>
              <h1 className="text-xl font-bold text-gray-900">Nova senha</h1>
              <p className="text-xs text-gray-500">Crie uma nova senha de acesso segura.</p>
            </div>

            {mensagemSucesso && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-[#1b5e3a] rounded-xl text-center font-semibold text-xs">
                {mensagemSucesso}
              </div>
            )}

            <form onSubmit={handleSalvarNovaSenha} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Nova senha</label>
                <input 
                  type="password" 
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Confirmar nova senha</label>
                <input 
                  type="password" 
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="Repita a nova senha"
                  className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="w-full py-3 bg-[#1b5e3a] text-white font-bold rounded-xl shadow-md hover:opacity-95 transition"
                >
                  Salvar
                </button>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
}