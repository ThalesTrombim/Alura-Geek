import Image from 'next/image';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import style from './style.module.scss';

import { DropDownContext } from '../../../src/contexts/DropDownContext';
import { supabaseClient } from '../../../src/services/supabaseClient';
import { NextHead } from '../../../src/components/Head';

export default function EditProduct({ product, categories }) {
    const { register, handleSubmit } = useForm()
    const { handleSetDropDown } = useContext(DropDownContext)
    const [ editedProduct, setEditedProduct ] = useState(product);

    async function categoryId(category){
        const nameCategory = `${category[0].toUpperCase()}${category.slice(1)}`
        const categoryExisting = categories.find(el => {
            return(
                el.name ===  nameCategory
            )
        });
        
        if(categoryExisting){
            return (categoryExisting.id)
        }

        const { data, error } = await supabaseClient
        .from('categories')
        .insert([
          { name: nameCategory }
        ])

        return data[0].id
    }

    console.log(editedProduct)

    async function updateProduct(){
        const teste = await categoryId(editedProduct.categories.name)

        console.log('teste', teste)
        // const { data, error } = await supabaseClient
        // .from('products')
        // .update({ 
        //     name: product.name,
        //     category: 
        // })
        // .match({ name: 'Auckland' })


    }

    return (

        // <div>teste</div>
        <div className={style.editContainer} onClick={handleSetDropDown}>
            <NextHead>Cadastrar produto</NextHead>
            <form onSubmit={handleSubmit(updateProduct)} className={style.formContainer}>
                <h2>Editar produto</h2>
                <Image src={product.img} alt="Alura Geek" width={'250px'} height={'303px'} />
                <main className={style.main}>
                    <div 
                        className={style.dropFile} 
                        onDrop={(e) => dropHandler(e)}
                        onDragOver={(event) => { event.preventDefault()}}
                        name='local_image'
                        style={{
                            // backgroundImage: `url(${img})`, 
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <Image src={'/icons/input-file.png'} width={'32px'} height={'32px'} alt='Arraste para adicionar uma imagem para o produto'/>
                        <p>Arraste para adicionar uma imagem para o produto</p>
                    </div>
                    
                    Ou
                    <label htmlFor="input_file" className={style.labelInputFile}>
                        Procure no seu computador
                    </label>
                    <input name='local_image' type="file" id='input_file' style={{display: 'none'}}/>
                </main>

                <div className={style.inputsArea}>
                    <div className={style.inputDefault}>
                        <label htmlFor="product_name">
                            Nome do produto
                        </label>
                        <input 
                            value={editedProduct.name} 
                            className='cleanForm' 
                            id='product_name' 
                            type="text" 
                            name='name' 
                            {...register('name')}
                            onChange={e => {
                                setEditedProduct(
                                    {...editedProduct, name: e.target.value}
                                )
                            }}
                        />
                    </div>
                    <div className={style.inputDefault}>
                        <label htmlFor="product_price">
                            Preço do produto
                        </label>
                        <input 
                            value={editedProduct.price} 
                            className='cleanForm' 
                            id='product_price' 
                            type="text" 
                            name='price' 
                            {...register('price')}
                            onChange={e => {
                                setEditedProduct(
                                    {...editedProduct, price: e.target.value}
                                )
                            }}
                        />
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
                        <input 
                            value={editedProduct.categories.name} 
                            list="suggestions" 
                            className='cleanForm' 
                            id='product_category' 
                            type="text" 
                            name='category' 
                            {...register('category')}
                            onChange={e => {
                                setEditedProduct(
                                    {...editedProduct, categories: { name: e.target.value } }
                                )
                            }}
                        />
                    </div>
                    <div className={style.textarea}>
                        <label htmlFor="product_desc">
                            Descrição do produto
                        </label>
                        <textarea 
                            value={editedProduct.desc} 
                            className='cleanForm' 
                            maxLength={230} 
                            id='product_desc' 
                            name='desc' 
                            {...register('desc')}
                            onChange={e => {
                                setEditedProduct(
                                    {...editedProduct, desc: e.target.value}
                                )
                            }}
                        >

                        </textarea>
                    </div>
                </div>
                <button type='submit'>Adicionar produto</button>
            </form>
        </div>
    )
}

export async function getServerSideProps(context) {
    const id = context.params.id

    const { data } = await supabaseClient.from('products')
    .select(`*, categories ( name )`)
    .eq('id', id)

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