import type { TreeNode } from './types';

export const mockTreeData: TreeNode[] = [
  {
    id: '1',
    label: 'Electronics',
    parentId: null,
    isAsync: true,
    children: [
      {
        id: '1-1',
        label: 'Phones',
        parentId: '1',
        children: [
          { id: '1-1-1', label: 'iPhone', parentId: '1-1' },
          { id: '1-1-2', label: 'Samsung Galaxy', parentId: '1-1' },
          { id: '1-1-3', label: 'Google Pixel', parentId: '1-1' },
        ],
      },
      {
        id: '1-2',
        label: 'Laptops',
        parentId: '1',
        children: [
          { id: '1-2-1', label: 'MacBook Pro', parentId: '1-2' },
          { id: '1-2-2', label: 'Dell XPS', parentId: '1-2' },
          { id: '1-2-3', label: 'ThinkPad', parentId: '1-2' },
        ],
      },
    ],
  },
  {
    id: '2',
    label: 'Clothing',
    parentId: null,
    children: [
      {
        id: '2-1',
        label: 'Men',
        parentId: '2',
        children: [
          { id: '2-1-1', label: 'Shirts', parentId: '2-1' },
          { id: '2-1-2', label: 'Pants', parentId: '2-1' },
        ],
      },
      {
        id: '2-2',
        label: 'Women',
        parentId: '2',
        children: [
          { id: '2-2-1', label: 'Dresses', parentId: '2-2' },
          { id: '2-2-2', label: 'Tops', parentId: '2-2' },
        ],
      },
    ],
  },
  {
    id: '3',
    label: 'Books',
    parentId: null,
    children: [
      { id: '3-1', label: 'Fiction', parentId: '3' },
      { id: '3-2', label: 'Non-Fiction', parentId: '3' },
      { id: '3-3', label: 'Science', parentId: '3' },
    ],
  },
];

// Simulates async loading of children from a server
export async function loadChildren(nodeId: string): Promise<TreeNode[]> {
  await new Promise(resolve => setTimeout(resolve, 800));

  if (nodeId === '1') {
    return mockTreeData[0]?.children ?? [];
  }
  return [];
}