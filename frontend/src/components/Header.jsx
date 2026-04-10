import React from 'react';
import { FaBalanceScaleRight } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="border-b border-ethicLight/20 bg-ethicDark py-6 shadow-md">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center sm:flex-row sm:text-left sm:justify-between">
        <div className="flex items-center gap-3">
          <FaBalanceScaleRight className="text-4xl text-ethicLight" />
          <div>
            <h1 className="text-3xl font-serif font-bold text-ethicLight uppercase tracking-wider">AI Ethics Checker</h1>
            <p className="text-slate-400 italic font-serif text-sm mt-1">"Your friendly (but judgy) AI ethics analyzer"</p>
          </div>
        </div>
      </div>
    </header>
  );
}
