import type { FlatNode, SelectionState } from './types';

interface TreeNodeProps {
  node: FlatNode;
  isFocused: boolean;
  selectionState: SelectionState;
  onToggleExpand: (id: string) => void;
  onToggleSelect: (id: string) => void;
  style: React.CSSProperties;
}

export function TreeNode({
  node,
  isFocused,
  selectionState,
  onToggleExpand,
  onToggleSelect,
  style,
}: TreeNodeProps) {
  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleExpand(node.id);
  };

  return (
    <div
      role="treeitem"
      aria-selected={selectionState === 'checked'}
      aria-expanded={node.hasChildren ? node.isExpanded : undefined}
      aria-level={node.depth + 1}
      style={style}
      onClick={() => onToggleSelect(node.id)}
      className={[
        'flex items-center gap-2 px-3 cursor-pointer select-none',
        'border-b border-slate-100',
        isFocused
          ? 'bg-indigo-50 outline-none ring-2 ring-inset ring-indigo-400'
          : 'hover:bg-slate-50',
      ].join(' ')}
    >
      {/* Indentation based on depth */}
      <span style={{ width: node.depth * 20 }} />

      {/* Expand/collapse arrow */}
      {node.hasChildren ? (
        <button
          onClick={handleExpandClick}
          aria-label={node.isExpanded ? 'Collapse' : 'Expand'}
          className="w-5 h-5 flex items-center justify-center text-slate-400
                     hover:text-indigo-600 rounded transition-colors shrink-0"
        >
          {node.isLoading ? (
            <span className="w-3 h-3 border-2 border-indigo-400 border-t-transparent
                             rounded-full animate-spin" />
          ) : (
            <span
              className="transition-transform duration-150"
              style={{ transform: node.isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
            >
              ▶
            </span>
          )}
        </button>
      ) : (
        <span className="w-5 shrink-0" />
      )}

      {/* Checkbox */}
      <span
        role="checkbox"
        aria-checked={
          selectionState === 'indeterminate' ? 'mixed' : selectionState === 'checked'
        }
        className={[
          'w-4 h-4 rounded border-2 flex items-center justify-center shrink-0',
          'transition-colors duration-150',
          selectionState === 'checked'
            ? 'bg-indigo-600 border-indigo-600'
            : selectionState === 'indeterminate'
            ? 'bg-indigo-200 border-indigo-400'
            : 'border-slate-300 bg-white',
        ].join(' ')}
      >
        {selectionState === 'checked' && (
          <span className="text-white text-xs font-bold">✓</span>
        )}
        {selectionState === 'indeterminate' && (
          <span className="text-indigo-600 text-xs font-bold">−</span>
        )}
      </span>

      {/* Label */}
      <span className="text-sm text-slate-700 truncate">{node.label}</span>
    </div>
  );
}