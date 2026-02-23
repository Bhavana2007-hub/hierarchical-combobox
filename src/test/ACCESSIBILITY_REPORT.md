# Accessibility Report
## Hierarchical Combobox Component

### Summary
This component is built with keyboard-first UX and full ARIA support for screen readers.

---

### ARIA Implementation

| Element | ARIA Role | Attributes Used |
|---------|-----------|-----------------|
| Dropdown container | `tree` | `aria-multiselectable="true"` |
| Each row | `treeitem` | `aria-selected`, `aria-expanded`, `aria-level` |
| Checkbox | `checkbox` | `aria-checked` (true/false/mixed) |
| Search input | `searchbox` | `aria-label="Search options"` |
| Trigger button | `button` | `aria-haspopup="tree"`, `aria-expanded` |
| Empty state | `status` | Announced to screen readers automatically |

---

### Keyboard Contract

| Key | Action |
|-----|--------|
| Tab | Focus trigger button |
| Enter / Space | Open dropdown / Select item |
| Arrow Down | Move focus to next item |
| Arrow Up | Move focus to previous item |
| Arrow Right | Expand node |
| Arrow Left | Collapse node |
| Escape | Close dropdown, return focus to trigger |

---

### Indeterminate State
- When some but not all children are selected, parent shows `aria-checked="mixed"`
- Visually shown as a `−` symbol in the checkbox
- Fully announced by screen readers as "mixed"

---

### Focus Management
- On open: focus moves to search input automatically
- On close: focus returns to trigger button
- During virtualization: focused item stays stable using index tracking
- Focus ring visible at all times using `ring-2 ring-indigo-400`

---

### Async Error Handling
- Loading state shown with spinner and announced via aria-busy pattern
- Error state tracked per node via `errorIds` Set
- Users are not left with silent failures

---

### Color Contrast
- Primary text `#1e293b` on white background — passes WCAG AA
- Muted text `#64748b` on white — passes WCAG AA
- Focus ring `#6366f1` clearly visible against all backgrounds
- Selected tags use `#4338ca` text on `#e0e7ff` background — passes WCAG AA

---

### Testing Tools Used
- `@storybook/addon-a11y` — axe-core checks in every story
- `@testing-library/react` — interaction and keyboard tests
- Manual testing with keyboard-only navigation

---

### Known Limitations
- Screen reader live announcements for async loading not yet implemented
- High contrast Windows mode not fully tested