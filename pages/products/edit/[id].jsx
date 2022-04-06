import Image from 'next/image';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import style from './style.module.scss';

import { DropDownContext } from '../../../src/contexts/DropDownContext';
import { supabaseClient } from '../../../src/services/supabaseClient';
import { NextHead } from '../../../src/components/Head';

export default function EditProduct({ product, categories }) {
    const { register, handleSubmit } = useForm()
    const { handleSetDropDown } = useContext(DropDownContext)

    async function updateProduct(){

    }

    console.log(product.img)
    console.log(categories)
    return (
        <div className={style.editContainer} onClick={handleSetDropDown}>
            <NextHead>Cadastrar produto</NextHead>
            <form onSubmit={handleSubmit(updateProduct)} className={style.formContainer}>
                <h2>Editar produto</h2>
                <div>
                    {/* <Image src={product.img} alt="Alura Geek" width={'560px'} height={'403px'} /> */}

                    <div 
                        className={style.dropFile} 
                        onDrop={(e) => dropHandler(e)}
                        onDragOver={(event) => { event.preventDefault()}}
                        name='local_image'
                        style={{
                            backgroundImage: `url(${product.img})`, 
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
.
                    </div>
                    Ou
                    <label htmlFor="input_file" className={style.labelInputFile}>
                        Procure no seu computador
                    </label>
                    <input name='local_image' type="file" id='input_file' style={{display: 'none'}}/>
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

export async function getServerSideProps(context) {
    const id = context.params.id

    const { data } = await supabaseClient.from('products').select().eq('id', id)
    const categoryList = await supabaseClient.from('categories').select()

    const product = data[0]
    const categories = categoryList.data

    return {
        props: {
            categories,
            product
        },
    }
}