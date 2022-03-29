import Image from 'next/image';
import { useForm } from 'react-hook-form';

import { api } from '../../../src/services/api';
import style from './style.module.scss';

export default function NewProduct() {
    const { register, handleSubmit } = useForm();

    async function addProduct({ name, price, desc}) {
        const res = await api.post('/products', { name, price, desc})

    }

    return (
        <div className={style.newProductContainer}>
            <form onSubmit={handleSubmit(addProduct)} className={style.contentContainer}>
                <h2>Adicionar novo produto</h2>
                <div className={style.inputFile} >
                    <div className={style.dropFile}>
                        <Image src={'/icons/input-file.png'} width={'32px'} height={'32px'} alt='Arraste para adicionar uma imagem para o produto'/>
                        <p>Arraste para adicionar uma imagem para o produto</p>
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
                        <input id='product_name' type="text" name='name' {...register('name')}/>
                    </div>
                    <div className={style.inputDefault} name='name' {...register('name')}>
                        <label htmlFor="product_price">
                            Preço do produto
                        </label>
                        <input id='product_price' type="text" name='price' {...register('price')}/>
                    </div>
                    <div className={style.textarea}>
                        <label htmlFor="product_desc">
                            Descrição do produto
                        </label>
                        <textarea maxLength={230} id='product_desc' name='desc' {...register('desc')}></textarea>
                    </div>
                </div>
                <button>Adicionar produto</button>
            </form>
        </div>
    )
}