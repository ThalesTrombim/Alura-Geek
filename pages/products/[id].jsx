import { useContext } from 'react';
import Image from 'next/image';

import style from './style.module.scss';

import { ProductCard } from '../../src/components/ProductCard';
import { DropDownContext } from '../../src/contexts/DropDownContext';
import { supabaseClient } from '../../src/services/supabaseClient';

export default function ProductItem({ product, similar }) {

    const { handleSetDropDown } = useContext(DropDownContext)
    return (
        <div className={style.productContainer} onClick={handleSetDropDown}>
            <div className={style.productInfo}>
                <div className={style.imgContainer}>
                    <Image src={product.img} alt="Alura Geek" width={'560px'} height={'403px'} />
                </div>
                <div className={style.productText}>
                    <h3>{product.name}</h3>
                    <span>{`R$ ${product.price}`}</span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corrupti possimus laborum alias illum sit accusantium voluptate voluptates, eos quo nemo, laudantium molestiae, qui sapiente ut? Quasi pariatur magnam qui!</p>
                </div>
            </div>

            <div className={style.similarProducts}>
                <h3>Produtos similares</h3>
                <div className={style.productsList}>
                    {
                        similar.map(item => (
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
    const { data } = await supabaseClient.from('products').select().eq('id', id)

    const category = data[0].category;
    const similarProducts = await supabaseClient.from('products').select()
        .eq('category', category)
        .filter('id', 'neq', id)

    const product = data[0]
    const similar = similarProducts.data
    
    return {
        props: {
            product,
            similar
        }
    };
}