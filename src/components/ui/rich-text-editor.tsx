import React, { useState } from 'react';
import { Bold, Italic, Underline, Link, Image, List, ListOrdered } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, className }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleBold = () => {
    onChange(`${value} **bold text**`);
  };
  
  const handleItalic = () => {
    onChange(`${value} *italic text*`);
  };
  
  const handleUnderline = () => {
    onChange(`${value} <u>underlined text</u>`);
  };
  
  const handleLink = () => {
    onChange(`${value} [link text](url)`);
  };
  
  const handleImage = () => {
    onChange(`${value} ![alt text](image-url)`);
  };
  
  const handleList = () => {
    onChange(`${value}\n- List item 1\n- List item 2\n- List item 3`);
  };
  
  const handleOrderedList = () => {
    onChange(`${value}\n1. List item 1\n2. List item 2\n3. List item 3`);
  };
  
  return (
    <div className={`border border-gray-300 rounded-md overflow-hidden ${className}`}>
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-2">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={handleBold}
          className="p-1 h-8 w-8"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={handleItalic}
          className="p-1 h-8 w-8"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={handleUnderline}
          className="p-1 h-8 w-8"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={handleLink}
          className="p-1 h-8 w-8"
        >
          <Link className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={handleImage}
          className="p-1 h-8 w-8"
        >
          <Image className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={handleList}
          className="p-1 h-8 w-8"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={handleOrderedList}
          className="p-1 h-8 w-8"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full p-3 min-h-[200px] focus:outline-none ${isFocused ? 'ring-2 ring-primary' : ''}`}
        placeholder="Enter content here..."
      />
    </div>
  );
};

export default RichTextEditor;
