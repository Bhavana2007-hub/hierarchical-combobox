import type { Meta, StoryObj } from '@storybook/react';
import { HierarchicalCombobox } from './HierarchicalCombobox';

const meta: Meta<typeof HierarchicalCombobox> = {
  title: 'Components/HierarchicalCombobox',
  component: HierarchicalCombobox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A fully accessible hierarchical combobox with:
- Async tree loading
- Custom virtualized rendering (no libraries)
- Multi-select with indeterminate states
- Full keyboard navigation (Arrow keys, Enter, Escape)
- Screen reader support via ARIA
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HierarchicalCombobox>;

// Default story
export const Default: Story = {
  args: {
    placeholder: 'Select categories...',
  },
};

// With custom placeholder
export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Choose a product...',
  },
};

// Small dropdown height - tests virtualization
export const SmallDropdown: Story = {
  args: {
    placeholder: 'Select options...',
    maxHeight: 160,
  },
  parameters: {
    docs: {
      description: {
        story: 'Small maxHeight forces virtualization to kick in with fewer visible rows.',
      },
    },
  },
};

// With onChange handler
export const WithOnChange: Story = {
  args: {
    placeholder: 'Select and watch console...',
    onChange: (ids: string[]) => console.log('Selected IDs:', ids),
  },
  parameters: {
    docs: {
      description: {
        story: 'Open browser console to see selected IDs logged on every change.',
      },
    },
  },
};

// Keyboard only usage story
export const KeyboardNavigation: Story = {
  args: {
    placeholder: 'Use keyboard to navigate...',
  },
  parameters: {
    docs: {
      description: {
        story: `
**Keyboard contract:**
- Tab → focus the trigger button
- Enter/Space → open dropdown
- Arrow Down/Up → move focus between items
- Arrow Right → expand node
- Arrow Left → collapse node
- Enter/Space → select focused item
- Escape → close dropdown
        `,
      },
    },
  },
};

// Loading state - tests async behavior
export const AsyncLoading: Story = {
  args: {
    placeholder: 'Click Electronics to trigger async load...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Click the arrow next to Electronics to see async loading spinner (800ms delay simulated).',
      },
    },
  },
};

// No results / empty search state
export const EmptySearchState: Story = {
  args: {
    placeholder: 'Try searching for something...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Type "xyz" in the search box to see the empty state message.',
      },
    },
  },
};

// High contrast mode
export const HighContrastMode: Story = {
  args: {
    placeholder: 'High contrast mode...',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'Component shown against dark background to verify contrast ratios.',
      },
    },
  },
};