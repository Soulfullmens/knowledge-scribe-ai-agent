
import React from 'react';
import { Brain } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-center py-4 mb-4 border-b">
      <div className="flex items-center space-x-2">
        <Brain className="h-6 w-6 text-agent-primary" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-agent-primary to-agent-secondary bg-clip-text text-transparent">
          Knowledge Scribe
        </h1>
      </div>
    </header>
  );
};

export default Header;
