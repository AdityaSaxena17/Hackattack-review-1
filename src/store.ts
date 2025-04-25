import { atom } from 'jotai';
import { WebContainer } from '@webcontainer/api';

// Define the FileNode interface for the file structure
export interface FileContent {
  contents: string;
}

export interface FileNode {
  file?: FileContent;
  directory?: Record<string, FileNode>;
}

// Atoms for our application state
export const webContainerAtom = atom<WebContainer | null>(null);
export const urlAtom = atom<string>('');
export const stepsAtom = atom<string[]>([]);
export const fileTreeAtom = atom<any[]>([]);
export const activeTabAtom = atom<'explorer' | 'preview'>('explorer'); 