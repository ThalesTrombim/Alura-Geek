import { createContext } from 'react';
import { useState } from 'react';

export const DropDownContext = createContext({})

export function DropDownProvider({ children }) {
    const [ dropDown, setDropDown ] = useState(false)

    function handleSetDropDown(e){
        if(dropDown){
            setDropDown(false)
        }
    }
    
    return (
        <DropDownContext.Provider value={{ dropDown, setDropDown, handleSetDropDown}}>
            { children }
        </DropDownContext.Provider>
    )
}