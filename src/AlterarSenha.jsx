import React, { useState } from 'react';

export default function AlterarSenha({ onNavigate }) {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  const [erroSenha, setErroSenha] = useState(false);
  const [msgErro, setMsgErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const handleSalvarSenha = (e) => {
    e.preventDefault();
    setMsgErro('');

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      setErroSenha(true);
      setMsgErro('Preencha todos os campos obrigatórios.');
      return;
    }

    if (novaSenha.length <= 6) {
      setErroSenha(true);
      setMsgErro('A nova senha deve ter mais de 6 caracteres.');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErroSenha(true);
      setMsgErro('As novas senhas não coincidem.');
      return;
    }

    setErroSenha(false);
    // Aqui no futuro faremos a chamada para o backend FastAPI
    console.log("Senha alterada com sucesso!");
    setSucesso(true);
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-center items-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        
        {sucesso ? (
          /* TELA DE SUCESSO */
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 bg-emerald-100 text-[#1b5e3a] font-bold rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-inner">
              ✓
            </div>
            <h1 className="text-xl font-bold text-gray-800 tracking-wide">Senha alterada com sucesso!</h1>
            <p className="text-xs text-gray-500">A sua palavra-passe foi atualizada com segurança.</p>

            <button 
              type="button"
              onClick={() => onNavigate('minha-conta')}
              className="w-full py-3.5 bg-[#1b5e3a] text-white font-medium rounded-xl hover:bg-[#14472c] transition duration-200 shadow-md text-sm mt-4 cursor-pointer"
            >
              Voltar para Minha Conta
            </button>
          </div>
        ) : (
          /* FORMULÁRIO DE ALTERAÇÃO DE SENHA */
          <>
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-gray-800 tracking-wide">Alterar Senha</h1>
              <p className="text-sm text-gray-500 mt-1">Insira os seus dados para atualizar a senha</p>
            </div>

            {/* Mensagem de Erro Geral */}
            {msgErro && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center font-semibold text-xs">
                {msgErro}
              </div>
            )}

            <form onSubmit={handleSalvarSenha} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Senha atual: <span className="text-red-500">*</span>
                </label>
                <input 
                  type="password" 
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  placeholder="Digite sua senha atual" 
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    erroSenha ? 'border-red-500 focus:ring-red-500 bg-red-50/20' : 'border-gray-200 focus:ring-[#1b5e3a]'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Nova senha: <span className="text-red-500">*</span>
                </label>
                <input 
                  type="password" 
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  placeholder="Crie uma nova senha" 
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    erroSenha ? 'border-red-500 focus:ring-red-500 bg-red-50/20' : 'border-gray-200 focus:ring-[#1b5e3a]'
                  }`}
                  required
                />
                <p className="text-[11px] text-gray-400 mt-1">Mais de 6 caracteres</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                  Confirmar nova senha: <span className="text-red-500">*</span>
                </label>
                <input 
                  type="password" 
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="Repita a nova senha" 
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    erroSenha ? 'border-red-500 focus:ring-red-500 bg-red-50/20' : 'border-gray-200 focus:ring-[#1b5e3a]'
                  }`}
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-[#1b5e3a] text-white font-medium rounded-xl hover:bg-[#14472c] transition duration-200 shadow-md text-sm mt-2 cursor-pointer"
              >
                Salvar nova senha
              </button>
            </form>

            {/* Voltar sem alterar */}
            <div className="text-center mt-6">
              <button 
                type="button" 
                onClick={() => onNavigate('minha-conta')} 
                className="text-xs text-gray-500 hover:text-[#1b5e3a] font-semibold cursor-pointer"
              >
                ← Voltar para Minha Conta
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}