import { useEffect } from 'react';

export default function useIntersectionObserver({
  enabled = true,
  onIntersect,
  root,
  target,
}) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [enabled, onIntersect, root, target]);
}
