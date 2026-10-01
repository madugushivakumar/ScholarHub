import { useState, useEffect } from "react";

/**
 * Safe and error-resilient localStorage hook
 * Handles JSON parsing errors gracefully with fallback to initialValue
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === "undefined") {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }
      const parsed = JSON.parse(item);
      // Ensure if array is expected, parsed is an array
      if (Array.isArray(initialValue) && !Array.isArray(parsed)) {
        console.warn(`LocalStorage key "${key}" expected an array, got invalid format. Falling back to default.`);
        return initialValue;
      }
      return parsed;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}". Falling back to default.`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
