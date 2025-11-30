import React, { useState } from "react";
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = "",
  onChange,
  placeholder = "Start typing...",
  className
}) => {
  const [content, setContent] = useState(value);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (contentRef.current) {
      const newContent = contentRef.current.innerHTML;
      setContent(newContent);
      onChange?.(newContent);
    }
  };

  const handleContentChange = () => {
    if (contentRef.current) {
      const newContent = contentRef.current.innerHTML;
      setContent(newContent);
      onChange?.(newContent);
    }
  };

  const ToolButton: React.FC<{
    icon: React.ReactNode;
    command: string;
    value?: string;
    title: string;
  }> = ({ icon, command, value, title }) => (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        handleFormat(command, value);
      }}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
      title={title}
    >
      {icon}
    </button>
  );

  return (
    <div className={cn("border-2 border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden", className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <ToolButton
          icon={<Bold className="w-4 h-4" />}
          command="bold"
          title="Bold"
        />
        <ToolButton
          icon={<Italic className="w-4 h-4" />}
          command="italic"
          title="Italic"
        />
        <ToolButton
          icon={<Underline className="w-4 h-4" />}
          command="underline"
          title="Underline"
        />
        
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />
        
        <ToolButton
          icon={<List className="w-4 h-4" />}
          command="insertUnorderedList"
          title="Bullet List"
        />
        <ToolButton
          icon={<ListOrdered className="w-4 h-4" />}
          command="insertOrderedList"
          title="Numbered List"
        />
        
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />
        
        <ToolButton
          icon={<AlignLeft className="w-4 h-4" />}
          command="justifyLeft"
          title="Align Left"
        />
        <ToolButton
          icon={<AlignCenter className="w-4 h-4" />}
          command="justifyCenter"
          title="Align Center"
        />
        <ToolButton
          icon={<AlignRight className="w-4 h-4" />}
          command="justifyRight"
          title="Align Right"
        />
      </div>

      {/* Editor */}
      <div
        ref={contentRef}
        contentEditable
        onInput={handleContentChange}
        className="min-h-[200px] p-4 focus:outline-none bg-white dark:bg-gray-900/50"
        dangerouslySetInnerHTML={{ __html: content }}
        suppressContentEditableWarning
        data-placeholder={placeholder}
        style={{
          minHeight: "200px"
        }}
      />
    </div>
  );
};