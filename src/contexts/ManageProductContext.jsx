import { createContext, useContext } from 'react';
import { v4 } from 'uuid';
import { useRouter } from 'next/router';

import { supabaseClient } from '../services/supabaseClient';
import { ModalContext } from './ModalContext';

export const ManageProductContext = createContext({})

export function ManageProductProvider({ children }) {
    const { setModalBody, setMessageModal, setModalActive } = useContext(ModalContext);
    const router = useRouter();

    const success = {
        title: 'Sucesso',
        img: '/icons/success.png',
        buttons: false
    }

    const confirm = {
        title: 'Tem Certeza',
        img: '/icons/danger.png',
        buttons: true
    }

    const errorModal = {
        title: 'Erro',
        img: '/icons/error.png',
        buttons: false
    }

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

    async function deleteProduct(productId) {
        const { data, error } = await supabaseClient
        .from('products')
        .delete()
        .match({ id: productId })

        if(!error){
            setModalBody(success)
            setMessageModal('Produto Excluido')
            setModalActive(true)
        } else {
            setModalBody(errorModal)
            setMessageModal('Não foi possível excluir o produto')
            setModalActive(true)
        }

        setTimeout(() => {
            router.push('/products/all')
            setModalActive(false)
        }, 2000)
    }

    return (
        <ManageProductContext.Provider value={{ 
            imageUpload, 
            dropHandler, 
            success, 
            confirm, 
            errorModal,
            deleteProduct
        }}>
            { children }
        </ManageProductContext.Provider>
    )
}