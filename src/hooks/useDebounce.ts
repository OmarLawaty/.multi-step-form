import { useEffect, useState } from 'react';

export const useDebounce = (text: string, debounceTime: number = 700) => {
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedText(text);
    }, debounceTime);

    return () => clearTimeout(debounceTimer);
  }, [text, debounceTime]);

  return debouncedText;
};
