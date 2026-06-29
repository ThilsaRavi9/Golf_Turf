import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for dark mode toggle.
 * Persists preference in localStorage.
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('golf-dark-mode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Toggle .dark on <html> so Tailwind v4's @custom-variant dark selector works
    document.documentElement.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem('golf-dark-mode', isDark);
  }, [isDark]);

  const toggle = useCallback(() => setIsDark(prev => !prev), []);

  return { isDark, toggle };
}

/**
 * Custom hook for scroll position tracking.
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (y / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY, scrollProgress };
}

/**
 * Custom hook for intersection observer (animate on scroll).
 */
export function useInView(options = {}) {
  const [ref, setRef] = useState(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (!options.repeat) observer.unobserve(ref);
        } else if (options.repeat) {
          setIsInView(false);
        }
      },
      { threshold: options.threshold || 0.1, rootMargin: options.rootMargin || '0px' }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options.threshold, options.rootMargin, options.repeat]);

  return [setRef, isInView];
}

/**
 * Custom hook for animated counter.
 */
export function useAnimatedCounter(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView({ threshold: 0.5 });
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isInView || hasStarted) return;
    if (startOnView) setHasStarted(true);

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration, hasStarted, startOnView]);

  return { count, ref };
}
