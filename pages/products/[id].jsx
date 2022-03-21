import style from './style.module.scss';
import products from '../../products.json';
import Image from 'next/image';
import { ProductCard } from '../../src/components/ProductCard';

export default function ProductItem({product}) {
    return (
        <div className={style.productContainer}>
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
                <div>
                    {
                        products.products.slice(2, 8).map(item => (
                            <ProductCard key={item.id} product={item}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const id = context.params.id;
    const prod = products.products[id]

    return {
        props: {
            product: prod,
        }
    };
}