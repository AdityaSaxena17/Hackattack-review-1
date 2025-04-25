import React, { useState } from 'react';
import FileTree from './FileTree';
import CodeEditor from './CodeEditor';

interface FileContent {
  contents: string;
}

interface FileNode {
  file?: FileContent;
  directory?: Record<string, FileNode>;
}

interface FileExplorerProps {
  structure: Record<string, FileNode>;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ structure }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');

  const handleFileSelect = (fileName: string, content: string) => {
    setSelectedFile(fileName);
    setFileContent(content);
  };

  return (
    <div className="file-explorer" style={{ display: 'flex', height: '100%', minHeight: '500px' }}>
      <div style={{ width: '250px', borderRight: '1px solid #444', overflow: 'auto' }}>
        <div style={{ padding: '8px 12px', borderBottom: '1px solid #444', fontWeight: 'bold' }}>
          Files
        </div>
        <FileTree 
          structure={structure} 
          onFileSelect={handleFileSelect}
        />
      </div>
      <div style={{ flex: 1 }}>
        {selectedFile ? (
          <CodeEditor 
            content={fileContent} 
            fileName={selectedFile}
          />
        ) : (
          <div className="no-file-selected">
            Select a file from the tree to view its contents
          </div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer; 