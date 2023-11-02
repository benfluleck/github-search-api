import { useEffect, useState, Dispatch, SetStateAction } from 'react';


export function useLocalStorageState<T>(
  defaultValue: T,
  key?: string
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    if (!key) {
      return defaultValue;
    }

    try {
      const storedValue = window.localStorage.getItem(key);

      // no stored value
      if (storedValue === null) {
        return defaultValue;
      }

      return JSON.parse(storedValue);
    } catch (e) {
      // silently fail if no localStorage or JSON parse fails
      return defaultValue;
    }
  });

  useEffect(() => {
    if (!key) {
      return;
    }

    try {
      // remove item from storage if it's the default option
      if (value === defaultValue) {
        window.localStorage.removeItem(key);
        return;
      }

      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // silently fail if no localStorage or JSON stringify fails
    }
  }, [key, value]);

  return [value, setValue];
}
