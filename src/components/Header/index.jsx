import { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';

import style from './style.module.scss';
import { ButtonLink } from '../ButtonLink';
import { api } from '../../services/api';
import { SearchContext } from '../../contexts/SearchContext';

function Header() {
    const [ search, setSearch ] = useState('')
    const [ searchActive, setSearchActive ] = useState(false);
    const { setResultSearch } = useContext(SearchContext);

    async function searchProduct(search) {
        const result = await api.get(`/products/?q=${search}`)
        const product = await result.data

        setResultSearch(product);
        Router.push('/products/results')
    }
    
    return (
        <div className={style.headerContainer}>
            <div className={style.LogoSearch}>
                <Link passHref href={'/'}>
                    <a>
                        <Image src="/images/Logo.png" alt="Alura Geek" width={176} height={50} />
                    </a>
                </Link>
                <input 
                    type="text" 
                    placeholder='O que deseja encontrar?' 
                    onKeyPress={(e) => {
                        if(e.key === 'Enter') {
                            searchProduct(search)
                        }
                    }}
                    onChange={e => {
                        const val = e.target.value;
                        setSearch(val)
                    }}
                />
                <span className={style.lupa} onClick={() => searchProduct(search)}>
                    <Image src="/icons/lupa.png" alt="Procurar" width={17} height={17} />
                </span>
            </div>
            
            <span className={style.loginButton}>
                <ButtonLink link={'/login'}>
                    Login
                </ButtonLink>
            </span>

            <div className={style.headerMobile}>
                {
                    searchActive ? (
                        <>
                            <input 
                                type="text" 
                                placeholder='O que deseja encontrar?' 
                                className={style.inputMobile}
                                onKeyPress={(e) => {
                                    if(e.key === 'Enter') {
                                        searchProduct(search)
                                    }
                                }}
                                onChange={e => {
                                    const val = e.target.value;
                                    setSearch(val)
                                }}
                            />
                            <span className={style.lupa}>
                                <Image onClick={() => { setSearchActive(false)}} src="/icons/close.png" alt="Procurar" width={17} height={17} />
                            </span>
                            <span onClick={() => searchProduct(search)}>
                                <Image src="/icons/lupa-mobile.png" alt="Procurar" width={'17px'} height={'17px'} />
                            </span>
                        </>
                    ) : ( 
                        <>
                            <Link passHref href={'/'}>
                                <a>
                                    <Image src="/images/Logo.png" alt="Alura Geek" width={'100px'} height={'28px'} />
                                </a>
                            </Link>
                            <ButtonLink  link={'/login'} size='133' className={style.loginButton}>
                                Login
                            </ButtonLink>
                            <Image onClick={() => { setSearchActive(true)}} src="/icons/lupa-mobile.png" alt="Procurar" width={'17px'} height={'17px'} />
                        </>
                    )
                }
            </div>
        </div>
    )
}

export { Header }