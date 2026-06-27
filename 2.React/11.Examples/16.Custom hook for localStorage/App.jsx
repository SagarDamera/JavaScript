import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      if (storedValue) {
        return JSON.parse(storedValue);
      }

      return initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving localStorage:", error);
    }
  }, [key, value]);

  const removeValue = () => {
    try {
      localStorage.removeItem(key);
      setValue(initialValue);
    } catch (error) {
      console.error("Error removing localStorage:", error);
    }
  };

  return [value, setValue, removeValue];
}

export default useLocalStorage;
