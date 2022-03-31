import { useContext } from 'react'

import { SearchContext } from '../../../src/contexts/SearchContext'
import style from './style.module.scss';
import { ProductCard } from '../../../src/components/ProductCard';
import Router from 'next/router';

export default function Results() {
    const { resultSearch } = useContext(SearchContext);
    let totalResultText = '1 produto encontrado';

    if(resultSearch.length > 1){
        totalResultText = `${resultSearch.length} produtos encontrados`
    }
    
    return (
        <div className={style.container}>
            <header>
                <h3>Resultados:</h3>
                <span>{ totalResultText }</span>
            </header>
            <div className={style.resultArea}>
                {/* {resultSearch.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))} */}
            </div>
        </div>
    )
}