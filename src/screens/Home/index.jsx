import style from './style.module.scss';
import Link from 'next/link';
import products from '../../../products.json'
import { ProductCard } from '../../components/ProductCard';
import { VscArrowRight } from 'react-icons/vsc';

function Home() {
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
                <div className={style.productContainer}>
                    <header>
                        <h3>Star Wars</h3>
                        <span>
                            <Link href={'/produtos'}>
                                Ver tudo
                            </Link>
                            <VscArrowRight />
                        </span>
                    </header>
                    <div className={style.productsList}>
                        {products['star-wars'].map(item =>(
                            <ProductCard  key={item.id} product={item} />
                        ))}
                    </div>
                </div>
                <div className={style.productContainer}>
                    <header>
                        <h3>Consoles</h3>
                        <span>
                            <Link href={'/produtos'}>
                                Ver tudo
                            </Link>
                            <VscArrowRight />
                        </span>
                    </header>
                    <div className={style.productsList}>
                        {products['consoles'].map(item =>(
                            <ProductCard  key={item.id} product={item} />
                        ))}
                    </div>
                </div>
                <div className={style.productContainer}>
                    <header>
                        <h3>Diversos</h3>
                        <span>
                            <Link href={'/produtos'}>
                                Ver tudo
                            </Link>
                            <VscArrowRight />
                        </span>
                    </header>
                    <div className={style.productsList}>
                        {products['diversos'].map(item =>(
                            <ProductCard  key={item.id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Home };