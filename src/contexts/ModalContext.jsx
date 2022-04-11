import { createContext } from 'react';
import { useState } from 'react';

export const ModalContext = createContext({})

export function ModalProvider({ children }) {
    const [ modalActive, setModalActive ] = useState(false)
    const [ modalContent, setModalContent ] = useState()
    const [ messageModal, setMessageModal ] = useState()
    const [ modalBody, setModalBody ] = useState({
        title: '',
        img: '/icons/input-file.png',
        buttons: true
    });

    return (
        <ModalContext.Provider value={{ 
                modalActive, 
                setModalActive, 
                modalContent, 
                setModalContent,
                messageModal,
                setMessageModal,
                modalBody, 
                setModalBody
        }}>
            { children }
        </ModalContext.Provider>
    )
}