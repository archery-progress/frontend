import { useEffect, useState } from 'react'

/**
 * Custom hook to debounce useEffect
 * @param fn The effect callback to debounce
 * @param dependencies Dependencies that trigger the effect
 * @param delay The debounce delay in milliseconds
 */
export function useDebouncedEffect(fn: () => void, dependencies: unknown[], delay: number) {
  useEffect(() => {
    const handler = setTimeout(fn, delay)
    return () => clearTimeout(handler)
  }, [...dependencies, delay])
}

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
