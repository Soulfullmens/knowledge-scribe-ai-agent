
import React, { useState, useRef, useEffect } from 'react';
import { Send, FileUp, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

interface ChatSectionProps {
  activeContent: string[] | null;
}

const ChatSection: React.FC<ChatSectionProps> = ({ activeContent }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Initial welcome message
    if (activeContent && messages.length === 0) {
      const initialMessage = {
        id: 'initial',
        type: 'agent' as const,
        content: `I've processed the following content:\n${activeContent.join('\n')}\n\nWhat would you like to know about this content?`,
        timestamp: new Date(),
      };
      
      setMessages([initialMessage]);
    }
  }, [activeContent, messages.length]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = () => {
    if (!inputValue.trim() && attachments.length === 0) {
      toast.error('Please enter a question or attach a file');
      return;
    }
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue + (attachments.length > 0 
        ? `\n\n[Attached: ${attachments.map(file => file.name).join(', ')}]` 
        : ''),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setAttachments([]);
    setIsLoading(true);
    
    // Simulate AI response (would be an actual API call in a real application)
    setTimeout(() => {
      // AI response
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: generateResponse(inputValue),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, responseMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  const generateResponse = (question: string): string => {
    // This is a mock response generator
    // In a real app, this would call an AI API with the content and question
    
    const responses = [
      "Based on the content you've provided, I can see that the main points are...",
      "After analyzing the document, I found that...",
      "The content discusses several key aspects related to your question...",
      "According to the material you uploaded, the answer is...",
      "I've searched through the content and found relevant information about your query...",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + 
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget justo vel odio efficitur rhoncus. Suspendisse potenti. Sed vel lectus at metus efficitur laoreet. Cras convallis dui at enim volutpat, vel tempor nunc ultricies.";
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
      
      // Reset the input value to allow the same file to be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <Card className="border-2 shadow-sm h-[600px] flex flex-col">
      <CardContent className="p-4 flex flex-col h-full">
        {activeContent ? (
          <>
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4 mb-4">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`message-bubble ${message.type === 'user' ? 'user-message' : 'agent-message'}`}>
                      <div className="whitespace-pre-line">{message.content}</div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="message-bubble agent-message">
                      <div className="flex space-x-2 items-center">
                        <div className="w-2 h-2 bg-agent-primary rounded-full animate-pulse-slow"></div>
                        <div className="w-2 h-2 bg-agent-primary rounded-full animate-pulse-slow delay-150"></div>
                        <div className="w-2 h-2 bg-agent-primary rounded-full animate-pulse-slow delay-300"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            {attachments.length > 0 && (
              <div className="mb-3 bg-gray-50 p-2 rounded-md">
                <div className="text-sm font-medium mb-1">Attachments:</div>
                <div className="flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center bg-white px-2 py-1 rounded border text-sm">
                      <span className="truncate max-w-[120px]">{file.name}</span>
                      <button 
                        onClick={() => removeAttachment(index)}
                        className="ml-1 text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex space-x-2">
              <div className="flex-grow relative">
                <Textarea
                  placeholder="Ask a question about the content..."
                  className="resize-none pr-14"
                  rows={2}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />
                <div className="absolute right-2 top-2 flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Attach file"
                    disabled={isLoading}
                  >
                    <FileUp className="h-4 w-4" />
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.png,.jpg,.jpeg,.gif"
                    />
                  </Button>
                </div>
              </div>
              
              <Button
                type="button"
                size="icon"
                onClick={handleSendMessage}
                disabled={isLoading || (!inputValue.trim() && attachments.length === 0)}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col">
            <FileUp className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-400">
              Upload content to start chatting
            </h3>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatSection;
