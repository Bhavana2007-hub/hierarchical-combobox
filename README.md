# Hierarchical Combobox

A scalable hierarchical selection component built from scratch with React 18, TypeScript, and Tailwind CSS.

## Live Storybook
https://699c50c4e3408acd4576e830-eqadybhwbg.chromatic.com/

## Features
- Async tree loading with loading spinner
- Custom virtualized rendering (no libraries)
- Multi-select with indeterminate checkbox states
- Full keyboard navigation (Arrow keys, Enter, Space, Escape)
- Screen reader support via ARIA roles
- Search with real-time filtering

## Tech Stack
- React 18
- TypeScript (strict mode)
- Vite
- Tailwind CSS
- Storybook
- Chromatic

## Getting Started

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

### Run Storybook
```bash
npm run storybook
```

### Deploy to Chromatic
```bash
npm run chromatic
```

## Keyboard Navigation
| Key | Action |
|-----|--------|
| Arrow Down | Move focus down |
| Arrow Up | Move focus up |
| Arrow Right | Expand node |
| Arrow Left | Collapse node |
| Enter / Space | Select item |
| Escape | Close dropdown |

## Component API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| placeholder | string | 'Select options...' | Trigger button text |
| maxHeight | number | 320 | Dropdown height in px |
| onChange | (ids: string[]) => void | - | Called when selection changes |

## Project Structure
```
src/
├── components/
│   └── HierarchicalCombobox/
│       ├── types.ts                        # TypeScript interfaces
│       ├── mockData.ts                     # Mock tree data + async loader
│       ├── useTreeState.ts                 # Tree expand/select logic
│       ├── useVirtualizer.ts               # Custom virtualization
│       ├── useKeyboard.ts                  # Keyboard navigation
│       ├── TreeNode.tsx                    # Single tree row
│       ├── SearchInput.tsx                 # Search box
│       ├── SelectedTags.tsx                # Selected item tags
│       ├── ComboboxTrigger.tsx             # Trigger button
│       ├── HierarchicalCombobox.tsx        # Main component
│       └── HierarchicalCombobox.stories.tsx
├── styles/
│   └── tokens.css                          # CSS design tokens
```

## Accessibility
- ARIA tree/treeitem roles
- aria-selected, aria-expanded, aria-level
- aria-checked with mixed state for indeterminate
- Focus management on open/close
- Screen reader announcements via role="status"