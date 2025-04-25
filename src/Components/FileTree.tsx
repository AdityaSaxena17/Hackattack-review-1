import React from 'react';
import './FileTree.css';

// Define interfaces for file structure
interface FileContent {
  contents: string;
}

interface FileNode {
  file?: FileContent;
  directory?: Record<string, FileNode>;
}

interface FileTreeProps {
  structure: Record<string, FileNode>;
  onFileSelect?: (fileName: string, content: string) => void;
}

// Helper component for rendering a single file/directory entry
const FileTreeNode: React.FC<{
  name: string;
  node: FileNode;
  depth: number;
  path: string;
  onFileSelect?: (fileName: string, content: string) => void;
}> = ({ name, node, depth, path, onFileSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isDirectory = !!node.directory;
  const fullPath = path ? `${path}/${name}` : name;
  
  const handleClick = () => {
    if (isDirectory) {
      setIsOpen(!isOpen);
    } else if (node.file && onFileSelect) {
      onFileSelect(fullPath, node.file.contents);
    }
  };

  return (
    <div className="file-node bg-gray-900" style={{ marginLeft: `${depth * 16}px` }}>
      <div 
        className={`file-node-name ${isDirectory ? 'directory' : 'file'}`}
        onClick={handleClick}
      >
        {isDirectory ? (
          <span className="directory-icon">{isOpen ? '📂' : '📁'}</span>
        ) : (
          <span className="file-icon">📄</span>
        )}
        <span className="node-label">{name}</span>
      </div>

      {isDirectory && isOpen && (
        <div className="directory-contents">
          {Object.entries(node.directory!).map(([childName, childNode]) => (
            <FileTreeNode
              key={childName}
              name={childName}
              node={childNode}
              depth={depth + 1}
              path={fullPath}
              onFileSelect={onFileSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main FileTree component
const FileTree: React.FC<FileTreeProps> = ({ structure, onFileSelect }) => {
  return (
    <div className="file-tree">
      {Object.entries(structure).map(([name, node]) => (
        <FileTreeNode 
          key={name} 
          name={name} 
          node={node} 
          depth={0}
          path=""
          onFileSelect={onFileSelect}
        />
      ))}
    </div>
  );
};

export default FileTree; 