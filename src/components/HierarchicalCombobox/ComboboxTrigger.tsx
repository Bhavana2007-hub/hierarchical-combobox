interface ComboboxTriggerProps {
  isOpen: boolean;
  selectedCount: number;
  placeholder: string;
  onClick: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function ComboboxTrigger({
  isOpen,
  selectedCount,
  placeholder,
  onClick,
  triggerRef,
}: ComboboxTriggerProps) {
  return (
    <button
      ref={triggerRef}
      type="button"
      aria-haspopup="tree"
      aria-expanded={isOpen}
      onClick={onClick}
      className={[
        'w-full flex items-center justify-between px-4 py-2.5 rounded-lg',
        'border-2 bg-white text-left transition-colors duration-150',
        'focus:outline-none focus:ring-2 focus:ring-indigo-400',
        isOpen
          ? 'border-indigo-500'
          : 'border-slate-200 hover:border-indigo-300',
      ].join(' ')}
    >
      <span className={selectedCount > 0 ? 'text-slate-700 text-sm' : 'text-slate-400 text-sm'}>
        {selectedCount > 0 ? `${selectedCount} selected` : placeholder}
      </span>
      <span
        className="text-slate-400 transition-transform duration-200 text-xs"
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
      >
        ▼
      </span>
    </button>
  );
}