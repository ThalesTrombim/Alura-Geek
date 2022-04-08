import { createContext } from 'react';
import { v4 } from 'uuid';

import { supabaseClient } from '../services/supabaseClient';

export const ManageProductContext = createContext({})

export function ManageProductProvider({ children }) {
    
    async function imageUpload(name, event){
        const productImage = event.target['local_image'].files[0];
        const count = v4() // UUID

        var formatedName = name.replace(/[^a-zA-Zs]/g, "");
        formatedName.normalize("NFD").replace(' ', '')

        await supabaseClient
        .storage
        .from('images')
        .upload(`products/${formatedName}${count}.jpg`, productImage, {
            cacheControl: '3600',
            upsert: false
        })

        const { publicURL, error } = supabaseClient
            .storage
            .from('images')
            .getPublicUrl(`products/${formatedName}${count}.jpg`)

        return publicURL;
    }

    function dropHandler(e) {
        
        e.preventDefault()

        var imageUrl = e.dataTransfer.getData('URL');
        
        return imageUrl;

    }

    return (
        <ManageProductContext.Provider value={{ imageUpload, dropHandler }}>
            { children }
        </ManageProductContext.Provider>
    )
}