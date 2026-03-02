import React, { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'wouter';
import { DEFAULT_MAX_LINKS_PER_DEST } from '@/lib/internalLinking/dictionaries';

type Ctx = {
  allocate: (href: string, allocationId: string) => boolean;
  maxPerDestination: number;
};

const InternalLinkingContext = createContext<Ctx | undefined>(undefined);

export function InternalLinkingProvider(props: { children: React.ReactNode; maxPerDestination?: number }) {
  const maxPerDestination = props.maxPerDestination ?? DEFAULT_MAX_LINKS_PER_DEST;
  const [location] = useLocation();

  // Count links per destination (per page)
  const countsRef = useRef<Map<string, number>>(new Map());
  // Track allocations so re-renders don't consume the budget repeatedly
  const allocationsRef = useRef<Set<string>>(new Set());

  // Reset budgets when the route changes
  useEffect(() => {
    countsRef.current = new Map();
    allocationsRef.current = new Set();
  }, [location]);

  const ctx = useMemo<Ctx>(() => {
    return {
      maxPerDestination,
      allocate: (href: string, allocationId: string) => {
        const key = String(href || '').replace(/\/+$/, '');
        const allocKey = `${allocationId}`;

        if (allocationsRef.current.has(allocKey)) return true;

        const current = countsRef.current.get(key) || 0;
        if (current >= maxPerDestination) return false;

        countsRef.current.set(key, current + 1);
        allocationsRef.current.add(allocKey);
        return true;
      },
    };
  }, [maxPerDestination]);

  return <InternalLinkingContext.Provider value={ctx}>{props.children}</InternalLinkingContext.Provider>;
}

export function useInternalLinking() {
  const ctx = useContext(InternalLinkingContext);
  if (!ctx) return null;
  return ctx;
}
