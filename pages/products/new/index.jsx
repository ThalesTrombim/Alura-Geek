import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

import style from './style.module.scss';
import db from '../../../backend/db.json';
import { api } from '../../../src/services/api';
import { DropDownContext } from '../../../src/contexts/DropDownContext'

export default function NewProduct() {
    const { register, handleSubmit } = useForm();
    const [ img, setImg ] = useState('')
    const { handleSetDropDown } = useContext(DropDownContext);
    const categories = db.categories;

    async function addProduct({ category, name, price, desc}) {
        await api.post('/products', { category, name, price, desc, img, })

        const categoryExists = await api.get(`/categories?name=${category}`)

        if(categoryExists.data == ''){
            await api.post('/categories', { name: category })
        }

        setImg('')
        cleanForm()
    }

    function dropHandler(e) {
        
        var imageUrl = e.dataTransfer.getData('URL');

        if (e.dataTransfer.items) {
            var file = e.dataTransfer.items[0].getAsFile();
        } 

        setImg(imageUrl)

    }
    function dragOverHandler(e) {
        
    }

    function cleanForm() {
        const inputs = document.getElementsByClassName('cleanForm')

        for(var i = 0; i < inputs.length; i++){
            inputs[i].value = '';
        }

    }


    return (
        <div className={style.newProductContainer} onClick={handleSetDropDown}>
            <form onSubmit={handleSubmit(addProduct)} className={style.contentContainer}>
                <h2>Adicionar novo produto</h2>
                <div className={style.inputFile} >
                    <div 
                        className={style.dropFile} 
                        onDrop={(e) => { e.preventDefault(), dropHandler(e)}} 
                        onDragOver={(event) => { event.preventDefault(), dragOverHandler(event)}}
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
                    <input type="file" id='input_file' style={{display: 'none'}}/>
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
                            { categories.map(({ id, name}) => (
                                <option key={id} value={name}/>
                            ))}
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
                <button>Adicionar produto</button>
            </form>
        </div>
    )
}