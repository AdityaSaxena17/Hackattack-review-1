import React, { useState } from 'react';
import { FolderOpen, Folder, FileText } from 'lucide-react';

const FileTree = ({ structure, name = '', level = 0 }) => {
  const [open, setOpen] = useState(level === 0);

  const isDirectory = structure?.directory !== undefined;
  const isFile = structure?.file !== undefined;
    console.log(structure,name,level)
  const toggleOpen = () => {
    if (isDirectory) setOpen(!open);
  };

  return (
    <div className={`ml-${level * 4}`}>
      <div
        onClick={toggleOpen}
        className={`flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 cursor-pointer transition ${
          isDirectory ? 'font-semibold' : 'text-gray-700'
        }`}
      >
        {isDirectory ? (
          open ? <FolderOpen size={16} /> : <Folder size={16} />
        ) : (
          <FileText size={16} />
        )}
        <span>{name}</span>
      </div>
      {open && isDirectory && (
        <div className="ml-4">
          {Object.entries(structure.directory).map(([childName, child]) => (
            <FileTree
              key={childName}
              name={childName}
              structure={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileTree;
