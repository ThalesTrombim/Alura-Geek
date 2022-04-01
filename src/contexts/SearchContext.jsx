import { createContext } from 'react';
import { useState } from 'react';

export const SearchContext = createContext({})

export function SearchProvider({ children }) {
    const [ resultSearch, setResultSearch ] = useState()
    
    return (
        <SearchContext.Provider value={{ resultSearch, setResultSearch }}>
            { children }
        </SearchContext.Provider>
    )
}