import { createContext } from 'react';
import { useState } from 'react';

export const ModalContext = createContext({})

export function ModalProvider({ children }) {
    const [ modalActive, setModalActive ] = useState(true)
    const [ modalContent, setModalContent ] = useState()
    
    return (
        <ModalContext.Provider value={{ modalActive, setModalActive, modalContent, setModalContent}}>
            { children }
        </ModalContext.Provider>
    )
}