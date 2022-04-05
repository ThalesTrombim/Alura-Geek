import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { v4 } from 'uuid';

import style from './style.module.scss';

import { DropDownContext } from '../../../src/contexts/DropDownContext'
import { supabaseClient } from '../../../src/services/supabaseClient';
import { NextHead } from '../../../src/components/Head';

export default function NewProduct() {
    const { register, handleSubmit } = useForm();
    const [ img, setImg ] = useState('');
    const { handleSetDropDown } = useContext(DropDownContext);
    const [ categories, setCategories ] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabaseClient.from('categories').select()
            setCategories(data);
        }
        
        fetchData()
    }, [])

    async function addProduct({ category, name, price, desc }, e) {
        // var categoryChosen = document.querySelector(`#suggestions option[value='${category}']`)

        // if(categoryChosen){
        //     setCategory(categoryChosen.getAttribute('datavalue'))
        // } else {
        //     const idCategory = async () => {
        //         if(!categories.find(el => el.name ===  category)){
        //             const { data, error } = await supabaseClient
        //             .from('categories')
        //             .insert([
        //                 { name: category }
        //             ])
    
        //             console.log(data[0])
        //         }
        //     }
        // }

        console.log(categoryId)
        return;
        if(!img){
            const imgUrl = await imageUpload(name, e)

            


            const { data, error } = await supabaseClient
            .from('products')
            .insert([
                { name, category, price, desc, img: imgUrl }
            ])

            
        }

    }

    async function imageUpload(name, event){
        const productImage = event.target['local_image'].files[0];
        const count = v4() // UUID

        await supabaseClient
        .storage
        .from('images')
        .upload(`products/${name}${count}.jpg`, productImage, {
            cacheControl: '3600',
            upsert: false
        })

        const { publicURL, error } = supabaseClient
            .storage
            .from('images')
            .getPublicUrl(`products/${name}.jpg`)

        return publicURL;
    }

    function dropHandler(e) {
        
        e.preventDefault()

        var imageUrl = e.dataTransfer.getData('URL');

        if (e.dataTransfer.items) {
            var file = e.dataTransfer.items[0].getAsFile();
            imageSupa(file)
            return
        } 

        setImg(imageUrl)

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
            <form onSubmit={handleSubmit(addProduct)} className={style.contentContainer}>
                <h2>Adicionar novo produto</h2>
                <div className={style.inputFile} >
                    <div 
                        className={style.dropFile} 
                        onDrop={(e) => dropHandler(e)}
                        onDragOver={(event) => { event.preventDefault()}}
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
                        Procure no seu computador
                    </label>
                    <input name='local_image' onChange={e => imageSupa(e)} type="file" id='input_file' style={{display: 'none'}}/>
                </div>

                <div className={style.inputsArea}>
                    <div className={style.inputDefault}>
                        <label htmlFor="product_name">
                            Nome do produto
                        </label>
                        <input className='cleanForm' id='product_name' type="text" name='name' {...register('name')}/>
                    </div>
                    <div className={style.inputDefault}>
                        <label htmlFor="product_price">
                            Preço do produto
                        </label>
                        <input className='cleanForm' id='product_price' type="text" name='price' {...register('price')}/>
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
                        <input list="suggestions" className='cleanForm' id='product_category' type="text" name='category' {...register('category')}/>
                    </div>
                    <div className={style.textarea}>
                        <label htmlFor="product_desc">
                            Descrição do produto
                        </label>
                        <textarea className='cleanForm' maxLength={230} id='product_desc' name='desc' {...register('desc')}></textarea>
                    </div>
                </div>
                <button type='submit'>Adicionar produto</button>
            </form>
        </div>
    )
}