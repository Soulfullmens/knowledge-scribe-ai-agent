
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import UploadSection from './UploadSection';
import ChatSection from './ChatSection';
import { useCredits } from '@/hooks/useCredits';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const TabNavigation = () => {
  const [activeContent, setActiveContent] = React.useState<string[] | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const { credits, useCredit } = useCredits();
  const navigate = useNavigate();

  const handleContentUpload = async (content: string[]) => {
    // Check if user has enough credits
    if (credits <= 0) {
      toast.error("You don't have enough credits. Please purchase more to continue.");
      navigate('/pricing');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(async () => {
      // Deduct 1 credit for processing
      const success = await useCredit();
      
      if (success) {
        setActiveContent(content);
        toast.success("Content processed successfully! 1 credit used.");
      } else {
        toast.error("Failed to process content. Please try again.");
      }
      
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
