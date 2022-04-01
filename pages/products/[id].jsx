import { useContext } from 'react';
import Image from 'next/image';

import style from './style.module.scss';
import db from '../../backend/db.json';

import { ProductCard } from '../../src/components/ProductCard';
import { DropDownContext } from '../../src/contexts/DropDownContext';

export default function ProductItem({product}) {
    const { handleSetDropDown } = useContext(DropDownContext)
    return (
        <div className={style.productContainer} onClick={handleSetDropDown}>
            <div className={style.productInfo}>
                <div className={style.imgContainer}>
                    <Image src={product.img} alt="Alura Geek" width={'560px'} height={'403px'} />
                </div>
                <div className={style.productText}>
                    <h3>{product.name}</h3>
                    <span>{product.price}</span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corrupti possimus laborum alias illum sit accusantium voluptate voluptates, eos quo nemo, laudantium molestiae, qui sapiente ut? Quasi pariatur magnam qui!</p>
                </div>
            </div>

            <div className={style.similarProducts}>
                <h3>Produtos similares</h3>
                <div className={style.productsList}>
                    {
                        db.products.slice(1, 7).map(item => (
                            <ProductCard key={item.id} product={item}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const id = parseInt(context.params.id);
    const prod = db.products.find(v => v.id === id)

    return {
        props: {
            product: prod,
        }
    };
}