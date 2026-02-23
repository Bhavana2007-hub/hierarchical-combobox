interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function SearchInput({
  value,
  onChange,
  onKeyDown,
  inputRef,
}: SearchInputProps) {
  return (
    <div className="px-3 py-2 border-b border-slate-200">
      <input
        ref={inputRef}
        type="text"
        role="searchbox"
        aria-label="Search options"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search..."
        className="w-full text-sm px-2 py-1 rounded border border-slate-200
                   focus:outline-none focus:ring-2 focus:ring-indigo-400
                   placeholder:text-slate-400 text-slate-700"
      />
    </div>
  );
}