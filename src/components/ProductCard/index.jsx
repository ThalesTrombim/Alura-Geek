import style from './style.module.scss'
import Link from 'next/link';
import Image from 'next/image';

function ProductCard({product}) {
    const { id, name, price, img } = product;
    return (
        <div className={style.productContainer}>
            <Image src={img} alt={name} width={176} height={174} />
            <p>{name}</p>
            <span>{price}</span>
            <div>
                <Link href={`/products/${id}`}>
                    Ver produto
                </Link>
            </div>
        </div>
    )
}

export { ProductCard };