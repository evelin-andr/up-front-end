import React, { useState } from 'react';

export default function Dependentes({ onNavigate }) {
  const [dependentes, setDependentes] = useState([
    { 
      id: 1, 
      name: "Lucas Souza", 
      birthDate: "15/05/2017", 
      kinship: "Filho(a)", 
      cpf: "123.456.789-00", 
      observation: "Acompanhamento psicopedagógico focado em leitura e escrita." 
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newName, setNewName] = useState('');
  const [newBirthDate, setNewBirthDate] = useState('');
  const [newKinship, setNewKinship] = useState('');
  const [newCpf, setNewCpf] = useState('');
  const [newObs, setNewObs] = useState('');

  // Função para formatar a data de nascimento (apenas números, máx 8 dígitos)
  const handleBirthDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 8) value = value.slice(0, 8); 

    if (value.length > 4) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    } else if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    setNewBirthDate(value);
  };

  // Função para formatar o CPF (apenas números, máx 11 dígitos, formato 000.000.000-00)
  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

    // Aplica a formatação de CPF progressivamente
    if (value.length > 9) {
      value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
    } else if (value.length > 6) {
      value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
    } else if (value.length > 3) {
      value = `${value.slice(0, 3)}.${value.slice(3)}`;
    }

    setNewCpf(value);
  };

  const handleOpenCreateModal = () => {
    setEditingId(null);
    setNewName('');
    setNewBirthDate('');
    setNewKinship('');
    setNewCpf('');
    setNewObs('');
    setShowModal(true);
  };

  const handleOpenEditModal = (dep) => {
    setEditingId(dep.id);
    setNewName(dep.name);
    setNewBirthDate(dep.birthDate || '');
    setNewKinship(dep.kinship || '');
    setNewCpf(dep.cpf || '');
    setNewObs(dep.observation || '');
    setShowModal(true);
  };

  const handleSaveDependente = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    if (editingId) {
      setDependentes(dependentes.map(dep => 
        dep.id === editingId 
          ? {
              ...dep,
              name: newName,
              birthDate: newBirthDate,
              kinship: newKinship || "Não informado",
              cpf: newCpf,
              observation: newObs
            }
          : dep
      ));
    } else {
      const novo = {
        id: Date.now(),
        name: newName,
        birthDate: newBirthDate,
        kinship: newKinship || "Não informado",
        cpf: newCpf,
        observation: newObs
      };
      setDependentes([...dependentes, novo]);
    }

    setShowModal(false);
  };

  const handleDeleteDependente = (id, name) => {
    if (window.confirm(`Tens a certeza de que desejas remover o dependente ${name}?`)) {
      setDependentes(dependentes.filter(dep => dep.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      
      {/* Cabeçalho */}
      <header className="bg-white border-b border-gray-100 px-4 py-3.5 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button 
            type="button"
            onClick={() => {
              if (onNavigate) {
                onNavigate('dashboard');
              }
            }}
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
            <h1 className="text-2xl font-bold text-gray-900">Meus Dependentes</h1>
            <p className="text-xs text-gray-500 mt-0.5">Gerencie os perfis vinculados à sua conta.</p>
          </div>
          <button 
            onClick={handleOpenCreateModal}
            className="px-4 py-2 bg-[#1b5e3a] text-white text-xs font-semibold rounded-xl hover:opacity-90 transition shadow-sm whitespace-nowrap"
          >
            + Adicionar
          </button>
        </div>

        {/* Lista de Dependentes */}
        <div className="space-y-4">
          {dependentes.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-400 text-xs shadow-sm border border-gray-100">
              Nenhum dependente cadastrado no momento.
            </div>
          ) : (
            dependentes.map((dep) => (
              <div key={dep.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-bold text-gray-800">{dep.name}</h2>
                    <p className="text-xs text-gray-500 mt-0.5">🎂 Nasc: {dep.birthDate || "Não informada"} &bull; 🔗 {dep.kinship}</p>
                    {dep.cpf && <p className="text-[11px] text-gray-400 mt-0.5">CPF: {dep.cpf}</p>}
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-[#1b5e3a] px-2.5 py-1 rounded-full font-semibold">
                    Ativo
                  </span>
                </div>

                {dep.observation && (
                  <div className="pt-2 border-t border-gray-50">
                    <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl">
                      {dep.observation}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center pt-1 text-xs">
                  <button 
                    onClick={() => handleDeleteDependente(dep.id, dep.name)}
                    className="font-bold text-red-600 hover:underline"
                  >
                    Excluir
                  </button>

                  <button 
                    onClick={() => handleOpenEditModal(dep)}
                    className="font-bold text-[#1b5e3a] hover:underline"
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal de Cadastro/Edição */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <div>
                  <h3 className="text-sm font-bold text-gray-800">
                    {editingId ? "Editar Dependente" : "Novo dependente"}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">Informe os dados e o grau de parentesco.</p>
                </div>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-sm font-bold">✕</button>
              </div>

              <form onSubmit={handleSaveDependente} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-gray-600 mb-1">
                    Nome completo <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Digite o nome"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-600 mb-1">
                    Data de nascimento <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel"
                    inputMode="numeric"
                    value={newBirthDate} 
                    onChange={handleBirthDateChange}
                    placeholder="dd/mm/aaaa"
                    maxLength={10}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-600 mb-1">
                    Grau de parentesco <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={newKinship}
                    onChange={(e) => setNewKinship(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a]"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Filho(a)">Filho(a)</option>
                    <option value="Enteado(a)">Enteado(a)</option>
                    <option value="Sobrinho(a)">Sobrinho(a)</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-600 mb-1">
                    CPF <span className="text-gray-400 font-normal">(opcional)</span>
                  </label>
                  <input 
                    type="tel"
                    inputMode="numeric"
                    value={newCpf} 
                    onChange={handleCpfChange}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-600 mb-1">Observações / Notas</label>
                  <textarea 
                    value={newObs} 
                    onChange={(e) => setNewObs(e.target.value)}
                    placeholder="Detalhes sobre o acompanhamento..."
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a] resize-none h-16"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-[#1b5e3a] text-white rounded-xl font-semibold hover:opacity-90 transition"
                  >
                    {editingId ? "Atualizar" : "Guardar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}