import React, { createContext, useContext, useState } from 'react';

interface ReadingContextValue {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
  semanticColors: boolean;
  toggleSemanticColors: () => void;
}

const ReadingContext = createContext<ReadingContextValue>({
  searchTerm: '',
  setSearchTerm: () => {},
  clearSearch: () => {},
  semanticColors: true,
  toggleSemanticColors: () => {}
});

export const useReading = () => useContext(ReadingContext);

export const ReadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [semanticColors, setSemanticColors] = useState<boolean>(() => {
    try {
      return localStorage.getItem('mestrecard_semantic_colors') !== 'false';
    } catch {
      return true;
    }
  });

  const [searchTerm, setSearchTerm] = useState('');

  const toggleSemanticColors = () => {
    setSemanticColors(prev => {
      const next = !prev;
      try {
        localStorage.setItem('mestrecard_semantic_colors', String(next));
      } catch {}
      return next;
    });
  };

  const clearSearch = () => setSearchTerm('');

  return (
    <ReadingContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        clearSearch,
        semanticColors,
        toggleSemanticColors
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
};
