import { useState, useEffect, useRef } from "react";

/**
 * Hook that tracks whether an element is visible in the viewport.
 * Once visible, stays true to avoid unmounting/remounting heavy components.
 */
const useInView = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px", ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [inView, options]);

  return { ref, inView };
};

export default useInView;
