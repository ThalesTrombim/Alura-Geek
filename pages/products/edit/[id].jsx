import Image from 'next/image';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import style from './style.module.scss';

import { DropDownContext } from '../../../src/contexts/DropDownContext';
import { supabaseClient } from '../../../src/services/supabaseClient';
import { NextHead } from '../../../src/components/Head';
import { ManageProductContext } from '../../../src/contexts/ManageProductContext';
import { Modal } from '../../../src/components/Modal';
import { ModalContext } from '../../../src/contexts/ModalContext';

export default function EditProduct({ product, categories }) {
    const { register, handleSubmit } = useForm();
    const { handleSetDropDown } = useContext(DropDownContext);
    const { dropHandler, imageUpload, success, errorModal } = useContext(ManageProductContext);
    const [ editedProduct, setEditedProduct ] = useState(product);
    const [ localImg, setLocalImg ] = useState(false);
    const [ img, setImg ] = useState(editedProduct.img);
    const { setModalActive, setModalBody, messageModal, setMessageModal, } = useContext(ModalContext);
    const router = useRouter()

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

    async function updateProduct(dataForm, e){
        const category = await categoryId(editedProduct.categories.name)
        let img = editedProduct.img

        if(localImg){
            img = await imageUpload(editedProduct.name, e)
        }

        try {
            const { data, error } = await supabaseClient
            .from('products')
            .update({ 
                name: editedProduct.name,
                category,
                price: editedProduct.price,
                desc: editedProduct.desc,
                img
            })
            .match({ id:  editedProduct.id })

            if(!error){
                setModalBody(success)
                setModalActive(true)
                setMessageModal('Produto atualizado com sucesso')
            } else {
                setModalBody(errorModal)
                setModalActive(true)
                setMessageModal('Não foi possível editar o produto')
            }

            setTimeout(() => {
                router.push('/products/all')
            }, 3000)
        } catch(e) {
            console.log(e)
        }

    }

    function imagePreview(e) {
        
        let file = e.target.files[0];
        var reader = new FileReader();

        reader.onload = function(event) {
            setImg(event.target.result)
        };
        
        reader.readAsDataURL(file)
    }

    return (
        <div className={style.editContainer} onClick={handleSetDropDown}>
            <NextHead>Cadastrar produto</NextHead>
            <Modal message={messageModal} />
            <form onSubmit={handleSubmit(updateProduct)} className={style.formContainer}>
                <h2>Editar produto</h2>
                {/* <Image src={product.img} alt="Alura Geek" width={'250px'} height={'303px'} /> */}
                <main className={style.main}>
                    <div 
                        className={style.dropFile} 
                        onDrop={(e) => {
                            setEditedProduct({...editedProduct, img: dropHandler(e)});
                            setImg(dropHandler(e))
                        }}
                        onDragOver={(event) => { event.preventDefault()}}
                        name='local_image'
                        style={{
                            backgroundImage: `url(${img})`, 
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <Image className={style.hideHover} src={'/icons/input-file.png'} width={'32px'} height={'32px'} alt='Arraste para adicionar uma imagem para o produto'/>
                        <p className={style.hideHover} >Arraste para adicionar uma imagem para o produto</p>
                    </div>
                    
                    Ou
                    <label htmlFor="input_file" className={style.labelInputFile}>
                        Procure no seu dispositivo
                    </label>
                    <input onChange={(e) => {setLocalImg(true); imagePreview(e)}} name='local_image' type="file" id='input_file' style={{display: 'none'}}/>
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

                <div className={style.buttonArea}>
                    <button 
                        className={style.cancelButton} 
                        onClick={() => router.back()}
                    >
                        Cancelar
                    </button>
                    <button className={style.confirmButton} type='submit'>Salvar</button>
                </div>
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