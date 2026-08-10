"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";

interface InViewMountProps {
  children: ReactNode;
  /**
   * Placeholder height — reserves layout space so nothing shifts when the
   * real child mounts. Accepts any CSS length. Required.
   */
  minHeight: string;
  /**
   * How far ahead (as a viewport-relative margin) to start mounting.
   * Default: one full viewport below the fold.
   */
  rootMargin?: string;
  className?: string;
}

/**
 * Reserve layout height and mount `children` when the wrapper approaches
 * the viewport. Avoids CLS from below-the-fold client islands while still
 * deferring their JS + render cost until they matter.
 *
 * Pair with `next/dynamic` inside `children` if you also want the module
 * itself to be code-split.
 */
export function InViewMount({
  children,
  minHeight,
  rootMargin = "100% 0px",
  className,
}: InViewMountProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setMounted(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin, threshold: 0 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [mounted, rootMargin]);

  const style: CSSProperties = mounted ? {} : { minHeight };

  return (
    <div ref={ref} style={style} className={className}>
      {mounted ? children : null}
    </div>
  );
}
