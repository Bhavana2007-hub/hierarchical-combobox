export interface TreeNode {
  id: string;
  label: string;
  parentId: string | null;
  children?: TreeNode[];
  isAsync?: boolean;
}

export interface FlatNode {
  id: string;
  label: string;
  parentId: string | null;
  depth: number;
  hasChildren: boolean;
  isExpanded: boolean;
  isLoading: boolean;
  isAsync: boolean;
}

export type SelectionState = 'checked' | 'unchecked' | 'indeterminate';

export interface HierarchicalComboboxProps {
  placeholder?: string;
  maxHeight?: number;
  onChange?: (selectedIds: string[]) => void;
}