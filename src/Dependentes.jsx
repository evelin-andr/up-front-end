import React, { useState } from 'react';

export default function Dependentes({ onNavigate }) {
  const [dependentes, setDependentes] = useState([
    {
      id: 1,
      nome: "Lucas Souza",
      dataNascimento: "14/08/2018",
      cpf: "123.456.789-00",
      parentesco: "Filho"
    }
  ]);

  const [exibindoFormulario, setExibindoFormulario] = useState(false);
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [parentesco, setParentesco] = useState('Filho');

  // Estado para o modal de exclusão
  const [dependenteParaExcluir, setDependenteParaExcluir] = useState(null);

  // Máscaras de Entrada
  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setCpf(value);
  };

  const handleDataChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    value = value.replace(/(\d{2})(\d)/, '$1/$2');
    value = value.replace(/(\d{2})(\d)/, '$1/$2');
    setDataNascimento(value);
  };

  const handleSalvarDependente = (e) => {
    e.preventDefault();
    if (!nome || !dataNascimento || !cpf) return;

    const novo = {
      id: Date.now(),
      nome,
      dataNascimento,
      cpf,
      parentesco
    };

    setDependentes([...dependentes, novo]);
    setNome('');
    setDataNascimento('');
    setCpf('');
    setParentesco('Filho');
    setExibindoFormulario(false);
  };

  // Confirmar exclusão do dependente
  const handleConfirmarExclusao = () => {
    if (dependenteParaExcluir) {
      setDependentes(dependentes.filter(item => item.id !== dependenteParaExcluir.id));
      setDependenteParaExcluir(null);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col relative">
      
      {/* Cabeçalho */}
      <header className="bg-white border-b border-gray-100 px-4 py-3.5 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button 
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="flex items-center text-xs font-bold text-[#1b5e3a] hover:opacity-80 transition gap-1.5 focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>
          
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dependentes</span>
          
          <div className="w-10"></div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 px-4 py-8 max-w-md mx-auto w-full space-y-6">
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dependentes</h1>
            <p className="text-xs text-gray-500 mt-0.5">Gerencie o perfil das crianças ou dependentes.</p>
          </div>
          {!exibindoFormulario && (
            <button 
              onClick={() => setExibindoFormulario(true)}
              className="px-4 py-2.5 bg-[#1b5e3a] text-white text-xs font-semibold rounded-xl hover:opacity-90 transition shadow-sm flex items-center gap-1.5 whitespace-nowrap"
            >
              + Novo
            </button>
          )}
        </div>

        {/* Formulário de Adicionar Dependente */}
        {exibindoFormulario && (
          <form onSubmit={handleSalvarDependente} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4 text-xs">
            <h2 className="text-sm font-bold text-gray-800">Cadastrar Novo Dependente</h2>

            <div>
              <label className="block text-gray-600 mb-1 font-semibold">Nome Completo</label>
              <input 
                type="text" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Lucas Souza"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-600 mb-1 font-semibold">Data de Nasc.</label>
                <input 
                  type="text" 
                  inputMode="numeric"
                  value={dataNascimento}
                  onChange={handleDataChange}
                  placeholder="DD/MM/AAAA"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a]"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1 font-semibold">CPF</label>
                <input 
                  type="text" 
                  inputMode="numeric"
                  value={cpf}
                  onChange={handleCpfChange}
                  placeholder="000.000.000-00"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 mb-1 font-semibold">Parentesco</label>
              <select 
                value={parentesco}
                onChange={(e) => setParentesco(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a]"
              >
                <option value="Filho">Filho(a)</option>
                <option value="Enteado">Enteado(a)</option>
                <option value="Tutelado">Tutelado(a)</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                type="button"
                onClick={() => setExibindoFormulario(false)}
                className="w-1/2 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="w-1/2 py-2.5 bg-[#1b5e3a] text-white font-bold rounded-xl shadow-md hover:opacity-95 transition"
              >
                Salvar
              </button>
            </div>
          </form>
        )}

        {/* Lista de Dependentes */}
        <div className="space-y-4">
          {dependentes.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-400 text-xs shadow-sm border border-gray-100">
              Nenhum dependente cadastrado até ao momento.
            </div>
          ) : (
            dependentes.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-bold text-gray-800">{item.nome}</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Parentesco: <span className="font-semibold text-gray-700">{item.parentesco}</span></p>
                  </div>
                  <button 
                    onClick={() => setDependenteParaExcluir(item)}
                    className="text-xs font-bold text-red-600 hover:underline p-1"
                  >
                    Excluir
                  </button>
                </div>

                <div className="pt-2 border-t border-gray-50 text-xs text-gray-500 grid grid-cols-2 gap-2">
                  <span>🎂 Nasc: <strong className="text-gray-700">{item.dataNascimento}</strong></span>
                  <span>🪪 CPF: <strong className="text-gray-700">{item.cpf}</strong></span>
                </div>
              </div>
            ))
          )}
        </div>

      </main>

      {/* MODAL PERSONALIZADO DE EXCLUSÃO DE DEPENDENTE */}
      {dependenteParaExcluir && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-5 shadow-2xl text-center border border-gray-100">
            
            {/* Ícone de Alerta */}
            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>

            {/* Título e Descrição */}
            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900">Excluir Dependente?</h3>
              <p className="text-xs text-gray-500">
                Tem a certeza de que deseja remover o cadastro deste dependente? Esta ação não pode ser desfeita.
              </p>
            </div>

            {/* Card com Detalhes do Dependente */}
            <div className="bg-gray-50 p-3.5 rounded-2xl text-left space-y-1 text-xs border border-gray-100">
              <p className="font-bold text-gray-800">{dependenteParaExcluir.nome}</p>
              <p className="text-gray-500">CPF: {dependenteParaExcluir.cpf}</p>
              <p className="text-gray-500">Parentesco: {dependenteParaExcluir.parentesco}</p>
            </div>

            {/* Botões de Ação */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => setDependenteParaExcluir(null)}
                className="w-full py-3 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-200 transition"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={handleConfirmarExclusao}
                className="w-full py-3 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700 transition shadow-sm"
              >
                Sim, excluir
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}