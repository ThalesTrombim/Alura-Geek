import style from './style.module.scss';
import Image from 'next/image';

export default function NewProduct() {

    return (
        <div className={style.newProductContainer}>
            <div className={style.contentContainer}>
                <h2>Adicionar novo produto</h2>
                <div className={style.inputFile}>
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
                        <input id='product_name' type="text"/>
                    </div>
                    <div className={style.inputDefault}>
                        <label htmlFor="product_price">
                            Preço do produto
                        </label>
                        <input id='product_price' type="text"/>
                    </div>
                </div>
                <button>Adicionar produto</button>
            </div>
        </div>
    )
}