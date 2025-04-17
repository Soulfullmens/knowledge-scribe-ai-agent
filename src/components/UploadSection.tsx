
import React, { useState, useCallback } from 'react';
import { Upload, Link, FileText, Video, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface UploadSectionProps {
  onContentUpload: (content: string[]) => void;
  isProcessing: boolean;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onContentUpload, isProcessing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState('');
  const [uploadType, setUploadType] = useState('file');

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);
  
  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };
  
  // Process the files
  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      const isPdf = file.type === 'application/pdf';
      const isVideo = file.type.startsWith('video/');
      return isPdf || isVideo;
    });
    
    if (validFiles.length !== newFiles.length) {
      toast.warning('Some files were skipped. Only PDFs and videos are supported.');
    }
    
    if (validFiles.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...validFiles]);
    }
  };
  
  // Remove a file from the list
  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };
  
  // Process URL input
  const handleUrlSubmit = () => {
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }
    
    try {
      new URL(url); // Validate URL format
      processContent();
    } catch (e) {
      toast.error('Invalid URL format');
    }
  };
  
  // Process the content (files or URL)
  const processContent = () => {
    if (uploadType === 'file' && files.length === 0) {
      toast.error('Please upload at least one file');
      return;
    }
    
    if (uploadType === 'url' && !url) {
      toast.error('Please enter a URL');
      return;
    }
    
    // Here we would normally process the files or URL with a real API
    // For now, we'll just pass the file names or URL to the parent component
    const content = uploadType === 'file' 
      ? files.map(file => file.name)
      : [url];
      
    onContentUpload(content);
  };

  return (
    <Card className="border-2 shadow-sm">
      <CardContent className="pt-6">
        <Tabs defaultValue="file" className="w-full" onValueChange={setUploadType}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="file" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Files
            </TabsTrigger>
            <TabsTrigger value="url" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              URL
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="file">
            <div
              className={`upload-drop-zone ${dragActive ? 'active' : ''}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="h-10 w-10 text-agent-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Drag & Drop Files</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Supports PDF documents and video files
                </p>
                <Button 
                  onClick={() => document.getElementById('file-upload')?.click()}
                  variant="outline"
                  className="relative"
                >
                  Browse Files
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </Button>
              </div>
            </div>
            
            {files.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium mb-2">Selected Files:</h4>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex items-center">
                        {file.type === 'application/pdf' ? (
                          <FileText className="h-4 w-4 mr-2 text-red-500" />
                        ) : (
                          <Video className="h-4 w-4 mr-2 text-blue-500" />
                        )}
                        <span className="truncate max-w-[280px]">{file.name}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFile(index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="url">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="url-input" className="text-sm font-medium">
                  Enter website URL
                </label>
                <Input
                  id="url-input"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <p className="text-sm text-gray-500">
                The AI will read and analyze the content from the provided URL
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 flex justify-end">
          <Button 
            onClick={processContent} 
            disabled={isProcessing || (uploadType === 'file' && files.length === 0) || (uploadType === 'url' && !url)}
            className="w-full sm:w-auto"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Process Content
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadSection;
