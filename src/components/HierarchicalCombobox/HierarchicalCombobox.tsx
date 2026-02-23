import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import type { HierarchicalComboboxProps } from './types';
import { mockTreeData } from './mockData';
import { useTreeState } from './useTreeState';
import { useVirtualizer } from './useVirtualizer';
import { useKeyboard } from './useKeyboard';
import { TreeNode } from './TreeNode';
import { SearchInput } from './SearchInput';
import { SelectedTags } from './SelectedTags';
import { ComboboxTrigger } from './ComboboxTrigger';

const ITEM_HEIGHT = 40;
const DROPDOWN_HEIGHT = 320;

export function HierarchicalCombobox({
  placeholder = 'Select options...',
  maxHeight = DROPDOWN_HEIGHT,
  onChange,
}: HierarchicalComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    flatNodes,
    toggleExpand,
    toggleSelect,
    getSelectionState,
    selectedIds,
    selectedLabels,
    clearSelection,
  } = useTreeState(mockTreeData);

  // Filter nodes by search query
  const visibleNodes = useMemo(() => {
    if (!search.trim()) return flatNodes;
    const lower = search.toLowerCase();
    return flatNodes.filter(n => n.label.toLowerCase().includes(lower));
  }, [flatNodes, search]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setSearch('');
    setFocusedIndex(0);
    triggerRef.current?.focus();
  }, []);

  const {
    visibleStartIndex,
    visibleEndIndex,
    totalHeight,
    offsetY,
    onScroll,
    scrollToIndex,
    containerRef: virtualizerRef,
  } = useVirtualizer({
    itemCount: visibleNodes.length,
    itemHeight: ITEM_HEIGHT,
    containerHeight: maxHeight,
  });

  const { handleKeyDown } = useKeyboard({
    flatNodes: visibleNodes,
    focusedIndex,
    setFocusedIndex,
    toggleExpand,
    toggleSelect,
    scrollToIndex,
    closeDropdown,
  });

  // Notify parent when selection changes
  useEffect(() => {
    onChange?.(Array.from(selectedIds));
  }, [selectedIds, onChange]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeDropdown]);

  const handleRemoveTag = useCallback((id: string) => {
    toggleSelect(id);
  }, [toggleSelect]);

  // Slice only the visible nodes for rendering
  const itemsToRender = visibleNodes.slice(visibleStartIndex, visibleEndIndex + 1);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-md"
    >
      {/* Trigger button */}
      <ComboboxTrigger
        isOpen={isOpen}
        selectedCount={selectedIds.size}
        placeholder={placeholder}
        onClick={() => setIsOpen(prev => !prev)}
        triggerRef={triggerRef}
      />

      {/* Dropdown */}
      {isOpen && (
        <div
          role="tree"
          aria-label="Hierarchical options"
          aria-multiselectable="true"
          className="absolute z-50 w-full mt-1 bg-white rounded-lg border
                     border-slate-200 shadow-lg overflow-hidden"
          style={{ boxShadow: 'var(--shadow-dropdown)' }}
        >
          {/* Selected tags */}
          <SelectedTags
            tags={selectedLabels}
            onRemove={handleRemoveTag}
            onClearAll={clearSelection}
          />

          {/* Search input */}
          <SearchInput
            value={search}
            onChange={setSearch}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
          />

          {/* Empty state */}
          {visibleNodes.length === 0 && (
            <div
              role="status"
              className="py-8 text-center text-sm text-slate-400"
            >
              No results found
            </div>
          )}

          {/* Virtualized tree list */}
          {visibleNodes.length > 0 && (
            <div
              ref={virtualizerRef}
              onScroll={onScroll}
              style={{ height: maxHeight, overflowY: 'auto' }}
              aria-label="Options list"
            >
              {/* Full height container for scroll */}
              <div style={{ height: totalHeight, position: 'relative' }}>
                {/* Only visible items rendered */}
                <div style={{ transform: `translateY(${offsetY}px)` }}>
                  {itemsToRender.map((node, i) => (
                    <TreeNode
                      key={node.id}
                      node={node}
                      isFocused={visibleStartIndex + i === focusedIndex}
                      selectionState={getSelectionState(node.id)}
                      onToggleExpand={toggleExpand}
                      onToggleSelect={toggleSelect}
                      style={{ height: ITEM_HEIGHT }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}