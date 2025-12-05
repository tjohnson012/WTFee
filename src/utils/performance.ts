/**
 * Performance Utilities
 * Optimizations for smooth animations and efficient rendering
 */

/**
 * Debounce function to limit rapid calls
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle function to limit call frequency
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Request animation frame wrapper for smooth animations
 */
export function rafScheduler<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  
  return (...args: Parameters<T>) => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(() => {
      fn(...args);
      rafId = null;
    });
  };
}

/**
 * Lazy load images with intersection observer
 */
export function createLazyImageObserver(
  onIntersect: (entry: IntersectionObserverEntry) => void
): IntersectionObserver {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect(entry);
        }
      });
    },
    {
      rootMargin: '50px',
      threshold: 0.1
    }
  );
}

/**
 * Memoization helper for expensive computations
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get optimized animation duration based on user preferences
 */
export function getAnimationDuration(baseDuration: number): number {
  return prefersReducedMotion() ? 0 : baseDuration;
}

export default {
  debounce,
  throttle,
  rafScheduler,
  createLazyImageObserver,
  memoize,
  prefersReducedMotion,
  getAnimationDuration
};
