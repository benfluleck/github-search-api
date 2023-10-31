import { RefObject, useEffect, useState } from 'react';

export default function useIntersectionObserver(
  elementRef: RefObject<Element>
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>();

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current; // DOM Ref

    const observer = new IntersectionObserver(updateEntry, { threshold: 1 });

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef?.current]);

  return entry;
}
