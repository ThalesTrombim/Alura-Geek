import { useContext } from 'react'

import style from './style.module.scss';
import { ProductCard } from '../../../src/components/ProductCard';
import { SearchContext } from '../../../src/contexts/SearchContext'
import { DropDownContext } from '../../../src/contexts/DropDownContext';

export default function Results() {
    const { resultSearch } = useContext(SearchContext);
    const { handleSetDropDown } = useContext(DropDownContext);

    let totalResultText = '1 produto encontrado';

    if(resultSearch){
        totalResultText = `${resultSearch.length} produtos encontrados`
    }
    
    return (
        <>
            {
                resultSearch ? (
                    <div className={style.container} onClick={handleSetDropDown}>
                        <header>
                            <h3>Resultados:</h3>
                            <span>{ totalResultText }</span>
                        </header>
                        <div className={style.resultArea}>
                            {resultSearch.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={style.containerNotResult} onClick={handleSetDropDown}>
                        <header>
                            <h3><strong>Oops! Não encontramos nenhum resultado para sua busca :(</strong></h3>

                            <ul>
                                <li>Verifique se a palavra foi digitada corretamente.</li>
                                <li>Tente palavras menos específicas.</li>
                                <li>Tente palavras-chave diferentes.</li>
                                <li>Faça buscas relacionadas.</li>
                            </ul>
                        </header>
                    </div>
                )
            }
        </>
    )
}