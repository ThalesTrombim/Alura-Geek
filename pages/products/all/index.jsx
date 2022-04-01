import { useContext } from 'react';
import Link from 'next/link';

import db from '../../../backend/db.json';
import style from './style.module.scss';

import { ProductCard } from '../../../src/components/ProductCard';
import { DropDownContext } from '../../../src/contexts/DropDownContext';
import { AuthContext } from '../../../src/contexts/AuthContext';

export default function AllProducts() {
    const { user } = useContext(AuthContext)
    const { handleSetDropDown } = useContext(DropDownContext);
    
    return (
        <div className={style.allProductsContainer} onClick={handleSetDropDown}>
            <div className={style.content}>
                <header>
                    <h3>Todos os produtos</h3>

                    { user && (
                        <span>
                            <Link href={'/products/new'}>
                                Adicionar produto
                            </Link>
                        </span>
                    )}
                </header>
                <div className={style.productsContainer}>
                    {
                        db.products.map(product => (
                            <ProductCard key={product.id} product={product} edit />
                        ))
                    }
                </div>
            
            </div>
        </div>
    )
}