import { useState, useCallback, useRef } from 'react';

interface VirtualizerOptions {
  itemCount: number;
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

interface VirtualizerResult {
  visibleStartIndex: number;
  visibleEndIndex: number;
  totalHeight: number;
  offsetY: number;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  scrollToIndex: (index: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function useVirtualizer({
  itemCount,
  itemHeight,
  containerHeight,
  overscan = 3,
}: VirtualizerOptions): VirtualizerResult {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Total height of all items combined
  const totalHeight = itemCount * itemHeight;

  // Which item index is at the top of the visible area
  const rawStart = Math.floor(scrollTop / itemHeight);

  // Add overscan so items render slightly before they're visible
  const visibleStartIndex = Math.max(0, rawStart - overscan);

  // How many items fit in the container
  const visibleCount = Math.ceil(containerHeight / itemHeight);

  // Last visible item index, capped at total items
  const visibleEndIndex = Math.min(
    itemCount - 1,
    rawStart + visibleCount + overscan
  );

  // Top offset so rendered items appear at the right scroll position
  const offsetY = visibleStartIndex * itemHeight;

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Programmatically scroll to a specific item
  const scrollToIndex = useCallback((index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTop = index * itemHeight;
    }
  }, [itemHeight]);

  return {
    visibleStartIndex,
    visibleEndIndex,
    totalHeight,
    offsetY,
    onScroll,
    scrollToIndex,
    containerRef,
  };
}