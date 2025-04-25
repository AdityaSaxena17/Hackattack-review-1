import React from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';

interface CodeEditorProps {
  content: string;
  language?: string;
  fileName?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  content, 
  language = 'javascript',
  fileName = ''
}) => {
  // Determine language based on file extension if not provided
  const determineLanguage = () => {
    if (language !== 'javascript') return language;
    
    if (fileName) {
      const extension = fileName.split('.').pop()?.toLowerCase();
      switch (extension) {
        case 'js':
          return 'javascript';
        case 'jsx':
          return 'javascript';
        case 'ts':
          return 'typescript';
        case 'tsx':
          return 'typescript';
        case 'html':
          return 'html';
        case 'css':
          return 'css';
        case 'json':
          return 'json';
        case 'md':
          return 'markdown';
        default:
          return 'javascript';
      }
    }
    return language;
  };

  return (
    <div className="code-editor-container">
      {fileName && (
        <div className="code-editor-header">
          {fileName}
        </div>
      )}
      <div className="code-editor">
        <Editor
          height="100%"
          language={determineLanguage()}
          value={content}
          theme="vs-dark"
    
          options={{
            readOnly: false,
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            fontSize: 14,
            wordWrap: 'on'
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor; 