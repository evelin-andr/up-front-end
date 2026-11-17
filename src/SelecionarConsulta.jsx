import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  UserCheck 
} from 'lucide-react';

export default function SelecionarConsulta({ onNavigate, setDadosAgendamento }) {
  const [especialidade, setEspecialidade] = useState('Psicopedagogia Clínica');
  const [profissional, setProfissional] = useState('Dra. Ana Beatriz');
  const [crm, setCrm] = useState('CRM/CRQ 1234');
  const [paciente, setPaciente] = useState('Lucas Souza (Filho)');
  const [tipoAtendimento, setTipoAtendimento] = useState('Avaliação Psicopedagógica');

  // Atualiza o CRM automaticamente com base no profissional escolhido
  const handleProfissionalChange = (e) => {
    const nome = e.target.value;
    setProfissional(nome);
    if (nome.includes('Ana Beatriz')) {
      setCrm('CRM/CRQ 1234');
    } else {
      setCrm('CRQ 5678');
    }
  };

  const handleAvancar = (e) => {
    e.preventDefault();

    if (setDadosAgendamento) {
      setDadosAgendamento({
        especialidade,
        profissional,
        crm,
        paciente,
        tipoAtendimento
      });
    }

    onNavigate('novo-agendamento');
  };

  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-between relative">
      <div>
        {/* Cabeçalho */}
        <header className="bg-white border-b border-gray-100 px-4 py-3.5 shadow-sm">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <button 
              type="button"
              onClick={() => onNavigate('agendamentos')}
              className="flex items-center text-xs font-bold text-[#1b5e3a] hover:opacity-80 transition gap-1.5 focus:outline-none cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Voltar
            </button>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nova Consulta</span>
            <div className="w-10"></div>
          </div>
        </header>

        {/* Conteúdo Principal (com espaçamento inferior para o menu mobile) */}
        <main className="px-4 py-8 max-w-md mx-auto w-full space-y-6 pb-24">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agendar Consulta</h1>
            <p className="text-xs text-gray-500 mt-0.5">Selecione os detalhes do atendimento.</p>
          </div>

          <form onSubmit={handleAvancar} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Especialidade <span className="text-red-500">*</span>
              </label>
              <select 
                value={especialidade}
                onChange={(e) => setEspecialidade(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a] font-medium text-gray-800"
              >
                <option value="Psicopedagogia Clínica">Psicopedagogia Clínica</option>
                <option value="Psicomotricidade">Psicomotricidade</option>
                <option value="Apoio Escolar Especializado">Apoio Escolar Especializado</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Profissional <span className="text-red-500">*</span>
              </label>
              <select 
                value={profissional}
                onChange={handleProfissionalChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a] font-medium text-gray-800"
              >
                <option value="Dra. Ana Beatriz">Dra. Ana Beatriz (CRM/CRQ 1234)</option>
                <option value="Dr. Carlos Eduardo">Dr. Carlos Eduardo (CRQ 5678)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Para quem é a consulta? <span className="text-red-500">*</span>
              </label>
              <select 
                value={paciente}
                onChange={(e) => setPaciente(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a] font-medium text-gray-800"
              >
                <option value="Lucas Souza (Filho)">Lucas Souza (Filho)</option>
                <option value="Mim mesmo(a)">Mim mesmo(a) / Responsável</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Tipo de Atendimento <span className="text-red-500">*</span>
              </label>
              <select 
                value={tipoAtendimento}
                onChange={(e) => setTipoAtendimento(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1b5e3a] font-medium text-gray-800"
              >
                <option value="Avaliação Psicopedagógica">Avaliação Psicopedagógica</option>
                <option value="Sessão de Acompanhamento">Sessão de Acompanhamento</option>
                <option value="Devolutiva com Pais">Devolutiva com Pais</option>
              </select>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full py-3.5 bg-[#1b5e3a] text-white font-bold rounded-xl shadow-md hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                Avançar para horários &rsaquo;
              </button>
            </div>
          </form>
        </main>
      </div>

      {/* NAVEGAÇÃO INFERIOR MOBILE */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-3 py-2 flex justify-around items-center z-20 shadow-lg">
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('dashboard')}
          className="flex flex-col items-center text-gray-400 hover:text-[#1b5e3a] gap-1 cursor-pointer"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Início</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate && onNavigate('agendamentos')}
          className="flex flex-col items-center text-[#1b5e3a] gap-1 cursor-pointer"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-bold">Agendamentos</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate && onNavigate('dependentes')}
          className="flex flex-col items-center text-gray-400 hover:text-[#1b5e3a] gap-1 cursor-pointer"
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Dependentes</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate && onNavigate('minha-conta')}
          className="flex flex-col items-center text-gray-400 hover:text-[#1b5e3a] gap-1 cursor-pointer"
        >
          <UserCheck className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Conta</span>
        </button>
      </nav>
    </div>
  );
}