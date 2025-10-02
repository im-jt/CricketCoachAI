
import React from 'react';
import { CricketIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center gap-4">
        <CricketIcon className="h-8 w-8 text-[#2094e8]" />
        <h1 className="text-2xl font-bold text-[#0f172a]">
          AI Cricket Coach
        </h1>
      </div>
    </header>
  );
};

export default Header;
