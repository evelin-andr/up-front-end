import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import logoImg from './folha.png';
import folhaLoginImg from './FolhaLogin.jpg'; 

export default function Register({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const handleAtivarAcesso = (e) => {
    e.preventDefault();
    setErro('');

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem. Por favor, verifique.');
      return;
    }

    if (email === 'naocadastrado@email.com') {
      setErro('E-mail não encontrado. Por favor, contacte o seu profissional/clínica para solicitar o cadastro inicial.');
      return;
    }

    setSucesso(true);
  };

  return (
    <div 
      className="min-h-screen w-full flex justify-center items-center relative overflow-hidden notranslate px-4 py-8 bg-cover bg-center bg-no-repeat bg-fixed" 
      style={{ backgroundImage: `url(${folhaLoginImg})` }}
      translate="no"
    >
      {/* Camada de sombra/overlay escuro adaptável à tela inteira */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-0"></div>

      {/* CARD DE PRIMEIRO ACESSO CENTRALIZADO */}
      <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/20 relative z-10 space-y-6">
        
        {/* Topo / Logo */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1b5e3a] flex items-center justify-center border border-emerald-100 shadow-sm">
            <img src={logoImg} alt="Logo UP" className="w-7 h-7 object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Primeiro Acesso</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Ative sua conta informando o e-mail cadastrado pelo seu psicólogo.
            </p>
          </div>
        </div>

        {/* Mensagem de Sucesso na Ativação */}
        {sucesso ? (
          <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl text-center space-y-3">
            <div className="w-10 h-10 bg-[#1b5e3a] text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#1b5e3a]">Conta Ativada com Sucesso!</h3>
              <p className="text-xs text-gray-600">
                Seu acesso à agenda foi liberado. Agora você já pode entrar no aplicativo com suas credenciais.
              </p>
            </div>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="w-full py-3 bg-[#1b5e3a] text-white font-bold text-xs rounded-xl hover:bg-[#14472c] transition shadow-sm mt-2 cursor-pointer"
            >
              Ir para a Tela de Login
            </button>
          </div>
        ) : (
          /* Formulário de Ativação */
          <form onSubmit={handleAtivarAcesso} className="space-y-4">

            {erro && (
              <div className="bg-red-50 border border-red-100 p-3.5 rounded-xl flex items-start gap-2.5 text-red-700 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{erro}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                E-mail Cadastrado pelo Profissional *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                  className="w-full bg-gray-50/50 pl-10 pr-3.5 py-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#1b5e3a] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Definir Palavra-passe (Senha) *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Mínimo de 6 caracteres"
                  className="w-full bg-gray-50/50 pl-10 pr-3.5 py-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#1b5e3a] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Confirmar Palavra-passe *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="Repita a senha escolhida"
                  className="w-full bg-gray-50/50 pl-10 pr-3.5 py-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#1b5e3a] transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#1b5e3a] text-white font-bold text-xs rounded-2xl hover:bg-[#14472c] transition shadow-sm mt-2 cursor-pointer"
            >
              Ativar Meu Acesso
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-xs font-semibold text-gray-500 hover:text-[#1b5e3a] transition flex items-center justify-center gap-1.5 mx-auto bg-transparent border-none cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Já tem uma conta ativa? Faça login
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}