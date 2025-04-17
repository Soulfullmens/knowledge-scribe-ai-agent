
import React from 'react';
import Header from '@/components/Header';
import TabNavigation from '@/components/TabNavigation';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col p-4">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-start py-4">
        <div className="w-full max-w-4xl mx-auto pb-10">
          <h2 className="text-3xl font-bold text-center mb-2">Knowledge Scribe AI</h2>
          <p className="text-center text-gray-600 mb-8">
            Upload content from PDFs, videos, or websites, and ask questions to get intelligent answers.
          </p>
          
          <TabNavigation />
        </div>
      </main>
      
      <footer className="mt-auto py-4 text-center text-gray-500 text-sm">
        <p>© 2025 Knowledge Scribe AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
