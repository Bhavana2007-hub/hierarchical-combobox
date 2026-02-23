import { useState, useCallback, useMemo } from 'react';
import type { TreeNode, FlatNode, SelectionState } from './types';
import { loadChildren } from './mockData';

// Recursively flatten the tree into a flat array for virtualization
function flattenTree(
  nodes: TreeNode[],
  expandedIds: Set<string>,
  loadingIds: Set<string>,
  depth = 0
): FlatNode[] {
  const result: FlatNode[] = [];

  for (const node of nodes) {
    const hasChildren = (node.children?.length ?? 0) > 0 || node.isAsync === true;
    const isExpanded = expandedIds.has(node.id);

    result.push({
      id: node.id,
      label: node.label,
      parentId: node.parentId,
      depth,
      hasChildren,
      isExpanded,
      isLoading: loadingIds.has(node.id),
      isAsync: node.isAsync ?? false,
    });

    // Only render children if this node is expanded
    if (isExpanded && node.children) {
      result.push(...flattenTree(node.children, expandedIds, loadingIds, depth + 1));
    }
  }

  return result;
}

// Get all descendant IDs of a node
function getDescendantIds(node: TreeNode): string[] {
  const ids: string[] = [];
  for (const child of node.children ?? []) {
    ids.push(child.id);
    ids.push(...getDescendantIds(child));
  }
  return ids;
}

// Find a node by ID anywhere in the tree
function findNode(nodes: TreeNode[], id: string): TreeNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    const found = findNode(node.children ?? [], id);
    if (found) return found;
  }
  return null;
}

export function useTreeState(initialData: TreeNode[]) {
  const [treeData, setTreeData] = useState<TreeNode[]>(initialData);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const [errorIds, setErrorIds] = useState<Set<string>>(new Set());

  // Flatten tree every time expanded nodes change
  const flatNodes = useMemo(
    () => flattenTree(treeData, expandedIds, loadingIds),
    [treeData, expandedIds, loadingIds]
  );

  // Toggle expand/collapse a node
  const toggleExpand = useCallback(async (nodeId: string) => {
    if (expandedIds.has(nodeId)) {
      setExpandedIds(prev => {
        const next = new Set(prev);
        next.delete(nodeId);
        return next;
      });
      return;
    }

    const node = findNode(treeData, nodeId);
    if (!node) return;

    // If node loads async and has no children yet, fetch them
    if (node.isAsync && (node.children?.length ?? 0) === 0) {
      setLoadingIds(prev => new Set(prev).add(nodeId));
      setErrorIds(prev => {
        const next = new Set(prev);
        next.delete(nodeId);
        return next;
      });

      try {
        const children = await loadChildren(nodeId);

        // Insert children into tree
        setTreeData(prev => {
          const updateNode = (nodes: TreeNode[]): TreeNode[] =>
            nodes.map(n =>
              n.id === nodeId
                ? { ...n, children }
                : { ...n, children: updateNode(n.children ?? []) }
            );
          return updateNode(prev);
        });
      } catch {
        setErrorIds(prev => new Set(prev).add(nodeId));
      } finally {
        setLoadingIds(prev => {
          const next = new Set(prev);
          next.delete(nodeId);
          return next;
        });
      }
    }

    setExpandedIds(prev => new Set(prev).add(nodeId));
  }, [expandedIds, treeData]);

  // Toggle selection — also selects/deselects all children
  const toggleSelect = useCallback((nodeId: string) => {
    const node = findNode(treeData, nodeId);
    if (!node) return;

    const descendants = getDescendantIds(node);
    const allIds = [nodeId, ...descendants];

    setSelectedIds(prev => {
      const next = new Set(prev);
      const isSelected = prev.has(nodeId);

      if (isSelected) {
        allIds.forEach(id => next.delete(id));
      } else {
        allIds.forEach(id => next.add(id));
      }
      return next;
    });
  }, [treeData]);

  // Calculate if a node is checked, unchecked, or indeterminate
  const getSelectionState = useCallback((nodeId: string): SelectionState => {
    const node = findNode(treeData, nodeId);
    if (!node) return 'unchecked';

    const descendants = getDescendantIds(node);

    if (descendants.length === 0) {
      return selectedIds.has(nodeId) ? 'checked' : 'unchecked';
    }

    const selectedDescendants = descendants.filter(id => selectedIds.has(id));

    if (selectedDescendants.length === 0 && !selectedIds.has(nodeId)) {
      return 'unchecked';
    }
    if (selectedDescendants.length === descendants.length && selectedIds.has(nodeId)) {
      return 'checked';
    }
    return 'indeterminate';
  }, [treeData, selectedIds]);

  // Get labels for selected leaf nodes (for tag display)
  const selectedLabels = useMemo(() => {
    return Array.from(selectedIds).map(id => {
      const node = findNode(treeData, id);
      return node ? { id, label: node.label } : null;
    }).filter((n): n is { id: string; label: string } => n !== null);
  }, [selectedIds, treeData]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  return {
    flatNodes,
    expandedIds,
    selectedIds,
    loadingIds,
    errorIds,
    toggleExpand,
    toggleSelect,
    getSelectionState,
    selectedLabels,
    clearSelection,
  };
}