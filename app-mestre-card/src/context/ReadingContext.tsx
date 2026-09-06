import React, { createContext, useContext, useState } from 'react';

interface ReadingContextValue {
  isBionic: boolean;
  toggleBionic: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
  semanticColors: boolean;
  toggleSemanticColors: () => void;
}

const ReadingContext = createContext<ReadingContextValue>({
  isBionic: false,
  toggleBionic: () => {},
  searchTerm: '',
  setSearchTerm: () => {},
  clearSearch: () => {},
  semanticColors: true,
  toggleSemanticColors: () => {}
});

export const useReading = () => useContext(ReadingContext);

export const ReadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBionic, setIsBionic] = useState<boolean>(() => {
    try {
      return localStorage.getItem('mestrecard_bionic') === 'true';
    } catch {
      return false;
    }
  });

  const [semanticColors, setSemanticColors] = useState<boolean>(() => {
    try {
      return localStorage.getItem('mestrecard_semantic_colors') !== 'false';
    } catch {
      return true;
    }
  });

  const [searchTerm, setSearchTerm] = useState('');

  const toggleBionic = () => {
    setIsBionic(prev => {
      const next = !prev;
      try {
        localStorage.setItem('mestrecard_bionic', String(next));
      } catch {}
      return next;
    });
  };

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
        isBionic,
        toggleBionic,
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
