import style from './style.module.scss';
import Link from 'next/link';
import { ProductCard } from '../../components/ProductCard';
import { VscArrowRight } from 'react-icons/vsc';

function Home({ categories, products }) {
    return(
        <div className={style.container}>
            <div className={style.homeBanner}>   
                <div className={style.bannerContent}>
                    <h2>Março Promocional</h2>
                    <p>Produtos selecionados com 33% de desconto</p>
                    <span>
                        <Link href={'/consoles'}>
                            Ver Consoles
                        </Link>
                    </span>
                </div>
            </div>
            <div className={style.productsArea}>
                {categories.map(item => (
                    <div key={item.id} className={style.productContainer}>
                        <>
                            <header>
                                <h3>{item.name}</h3>
                                <span>
                                    <Link href={'/products/all'}>
                                        Ver tudo
                                    </Link>
                                    <VscArrowRight />
                                </span>
                            </header>
                            <div className={style.productsList}>
                                {products.map(product =>(
                                    product.category === item.id && (
                                        <ProductCard  key={product.id} product={product} />
                                    )
                                ))}
                            </div>
                        </>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { Home }