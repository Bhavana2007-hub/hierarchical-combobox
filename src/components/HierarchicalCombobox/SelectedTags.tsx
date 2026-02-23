interface SelectedTagsProps {
  tags: { id: string; label: string }[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export function SelectedTags({ tags, onRemove, onClearAll }: SelectedTagsProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 px-3 py-2 border-b border-slate-200">
      {tags.slice(0, 5).map(tag => (
        <span
          key={tag.id}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                     bg-indigo-100 text-indigo-700 text-xs font-medium"
        >
          {tag.label}
          <button
            onClick={() => onRemove(tag.id)}
            aria-label={`Remove ${tag.label}`}
            className="hover:text-indigo-900 font-bold leading-none"
          >
            ×
          </button>
        </span>
      ))}

      {/* Show count if more than 5 selected */}
      {tags.length > 5 && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full
                         bg-slate-100 text-slate-600 text-xs">
          +{tags.length - 5} more
        </span>
      )}

      {/* Clear all button */}
      <button
        onClick={onClearAll}
        aria-label="Clear all selections"
        className="text-xs text-slate-400 hover:text-red-500 ml-1 transition-colors"
      >
        Clear all
      </button>
    </div>
  );
}