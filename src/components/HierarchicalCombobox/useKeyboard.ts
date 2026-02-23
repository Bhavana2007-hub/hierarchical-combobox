import { useCallback } from 'react';
import type { FlatNode } from './types';

interface KeyboardOptions {
  flatNodes: FlatNode[];
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  toggleExpand: (id: string) => void;
  toggleSelect: (id: string) => void;
  scrollToIndex: (index: number) => void;
  closeDropdown: () => void;
}

export function useKeyboard({
  flatNodes,
  focusedIndex,
  setFocusedIndex,
  toggleExpand,
  toggleSelect,
  scrollToIndex,
  closeDropdown,
}: KeyboardOptions) {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const next = Math.min(focusedIndex + 1, flatNodes.length - 1);
        setFocusedIndex(next);
        scrollToIndex(next);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prev = Math.max(focusedIndex - 1, 0);
        setFocusedIndex(prev);
        scrollToIndex(prev);
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        const node = flatNodes[focusedIndex];
        if (node?.hasChildren && !node.isExpanded) {
          toggleExpand(node.id);
        }
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        const node = flatNodes[focusedIndex];
        if (node?.isExpanded) {
          toggleExpand(node.id);
        }
        break;
      }
      case ' ':
      case 'Enter': {
        e.preventDefault();
        const node = flatNodes[focusedIndex];
        if (node) toggleSelect(node.id);
        break;
      }
      case 'Escape': {
        e.preventDefault();
        closeDropdown();
        break;
      }
    }
  }, [flatNodes, focusedIndex, setFocusedIndex, toggleExpand, toggleSelect, scrollToIndex, closeDropdown]);

  return { handleKeyDown };
}