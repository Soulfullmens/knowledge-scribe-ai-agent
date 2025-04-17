
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import UploadSection from './UploadSection';
import ChatSection from './ChatSection';

const TabNavigation = () => {
  const [activeContent, setActiveContent] = React.useState<string[] | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleContentUpload = (content: string[]) => {
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setActiveContent(content);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <Tabs defaultValue="upload" className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="upload" className="text-base py-3">Upload Content</TabsTrigger>
        <TabsTrigger 
          value="chat" 
          className="text-base py-3"
          disabled={!activeContent && !isProcessing}
        >
          Ask Questions
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="upload" className="mt-0">
        <UploadSection 
          onContentUpload={handleContentUpload} 
          isProcessing={isProcessing}
        />
      </TabsContent>
      
      <TabsContent value="chat" className="mt-0">
        <ChatSection activeContent={activeContent} />
      </TabsContent>
    </Tabs>
  );
};

export default TabNavigation;
