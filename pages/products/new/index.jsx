import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

import style from './style.module.scss';

import { DropDownContext } from '../../../src/contexts/DropDownContext'
import { supabaseClient } from '../../../src/services/supabaseClient';
import { NextHead } from '../../../src/components/Head';
import { ManageProductContext } from '../../../src/contexts/ManageProductContext';
import { Modal } from '../../../src/components/Modal';
import { ModalContext } from '../../../src/contexts/ModalContext';

export default function NewProduct() {
    const { register, handleSubmit } = useForm();
    const [ img, setImg ] = useState('');
    const { handleSetDropDown } = useContext(DropDownContext);
    const [ categories, setCategories ] = useState('');
    const { imageUpload, dropHandler, success, errorModal } = useContext(ManageProductContext);
    const { setModalActive, messageModal, setMessageModal, setModalBody } = useContext(ModalContext)

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabaseClient.from('categories').select()
            setCategories(data);
        }
        
        fetchData()
    }, [])

    function imagePreview(e) {
        let file = e.target.files[0];
        var reader = new FileReader();

        reader.onload = function(event) {
            setImg(event.target.result)
        };
        
        reader.readAsDataURL(file)
    }

    async function addProduct({ category, name, price, desc }, e) {
        const categoryExisting = categories.find(el => el.name ===  category);

        if(!categoryExisting){
            const { data, error } = await supabaseClient
            .from('categories')
            .insert([
                { name: category }
            ])

            var categoryID = await data[0].id
        } else {
            var categoryID = categoryExisting.id
        }

        if(!img){
            const imgUrl = await imageUpload(name, e)

            try {
                const { data, error } = await supabaseClient
                .from('products')
                .insert([
                    { name, category: categoryID, price, desc, img: imgUrl }
                ])

                console.log(data)
            } catch (e) {
                console.log(e)
            }

            cleanForm()
            return
        } 

        try {
            const { data, error } = await supabaseClient
            .from('products')
            .insert([
                { name, category: categoryID, price, desc, img }
            ])

            if(!error){
                setModalBody(success)
                setMessageModal('Produto cadastrado com sucesso')
                setModalActive(true)
            } else {
                setModalBody(errorModal)
                setModalActive(true)
                setMessageModal('N??o foi poss??vel cadastrar o produto');
            }
        } catch (e) {
            console.log(e)
        }

        setImg('')
        cleanForm()
        return
    }

    function cleanForm() {
        const inputs = document.getElementsByClassName('cleanForm')

        for(var i = 0; i < inputs.length; i++){
            inputs[i].value = '';
        }

    }

    return (
        <div className={style.newProductContainer} onClick={handleSetDropDown}>
            <NextHead>Cadastrar produto</NextHead>
            <Modal message={messageModal}/>
            <form onSubmit={handleSubmit(addProduct)} className={style.contentContainer}>
                <h2>Adicionar novo produto</h2>
                <div className={style.inputFile} >
                    <div 
                        className={style.dropFile} 
                        onDrop={(e) => setImg(dropHandler(e))}
                        onDragOver={(event) => { event.preventDefault()}}
                        name='local_image'
                        style={{
                            backgroundImage: `url(${img})`, 
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        {
                            !img && (
                                <>
                                    <Image src={'/icons/input-file.png'} width={'32px'} height={'32px'} alt='Arraste para adicionar uma imagem para o produto'/>
                                    <p>Arraste para adicionar uma imagem para o produto</p>
                                </>
                            )
                        }
                    </div>
                    Ou
                    <label htmlFor="input_file" className={style.labelInputFile}>
                        Procure no seu dispositivo
                    </label>
                    <input 
                        name='local_image' 
                        type="file" 
                        id='input_file' 
                        style={{display: 'none'}}
                        onChange={e => imagePreview(e)}
                    />
                </div>

                <div className={style.inputsArea}>
                    <div className={style.inputDefault}>
                        <label htmlFor="product_name">
                            Nome do produto
                        </label>
                        <input required className='cleanForm' id='product_name' type="text" name='name' {...register('name')}/>
                    </div>
                    <div className={style.inputDefault}>
                        <label htmlFor="product_price">
                            Pre??o do produto
                        </label>
                        <input required className='cleanForm' id='product_price' type="text" name='price' {...register('price')}/>
                    </div>
                    <div className={style.inputDefault}>
                        <label htmlFor="product_category">
                            Categoria
                        </label>
                        <datalist id="suggestions">
                            {
                                categories && 
                                    categories.map(({ id, name}) => (
                                    <option key={id} value={name} datavalue={id} />
                                ))
                            }
                        </datalist>
                        <input required list="suggestions" className='cleanForm' id='product_category' type="text" name='category' {...register('category')}/>
                    </div>
                    <div className={style.textarea}>
                        <label htmlFor="product_desc">
                            Descri????o do produto
                        </label>
                        <textarea className='cleanForm' maxLength={230} id='product_desc' name='desc' {...register('desc')}></textarea>
                    </div>
                </div>
                <button type='submit'>Adicionar produto</button>
            </form>
        </div>
    )
}