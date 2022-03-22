import db from '../../../db.json';
import style from './style.module.scss';
import Link from 'next/link';
import { ProductCard } from '../../../src/components/ProductCard';

export default function AllProducts() {
    return (
        <div className={style.allProductsContainer}>
            <div className={style.content}>
                <header>
                    <h3>Todos os produtos</h3>
                    <span>
                        <Link href={'/products/new'}>
                            Adicionar produto
                        </Link>
                    </span>
                </header>
                <div className={style.productsContainer}>
                    {
                        db.products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    }
                </div>
            
            </div>
        </div>
    )
}