import { type RefObject, useEffect, useRef, useState } from "react";

type UseInViewResult<T extends Element> = {
  ref: RefObject<T | null>;
  inView: boolean;
};

const DEFAULT_ROOT_MARGIN = "200px";

export const useInView = <T extends Element>(
  rootMargin: string = DEFAULT_ROOT_MARGIN
): UseInViewResult<T> => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return { ref, inView };
};
