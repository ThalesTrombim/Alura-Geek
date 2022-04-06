import { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';

import style from './style.module.scss';

import { ButtonLink } from '../ButtonLink';
import { SearchContext } from '../../contexts/SearchContext';
import { AuthContext } from '../../contexts/AuthContext';
import { DropDownContext } from '../../contexts/DropDownContext';
import { supabaseClient } from '../../services/supabaseClient';

function Header() {
    const [ search, setSearch ] = useState('')
    const [ searchActive, setSearchActive ] = useState(false);
    const { dropDown, setDropDown, handleSetDropDown } = useContext(DropDownContext)
    const { setResultSearch } = useContext(SearchContext);
    const { user } = useContext(AuthContext);
    let nameUser;

    if(user){
        nameUser = user.username;
    }

    async function searchProduct(search) {
        const result = await supabaseClient.from('products').select()
        .filter(["name", "category"], 'ilike', `%${search}%`)

        setResultSearch(result.data);
        Router.push('/products/results')
    }

    return (
        <div className={style.headerContainer} onClick={handleSetDropDown}>
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
            
            <div className={style.loginButton}>
                {
                    !user ? (
                        <ButtonLink link={'/login'}>
                            Login
                        </ButtonLink>
                    ) : (
                        <div className={style.dropDowContainer}>
                            <p onClick={() => setDropDown(!dropDown)}>Olá, { nameUser }</p>
                            {
                                dropDown && (
                                    <div id='dropdown' className={style.dropDown}>
                                        <span>
                                            <Link href={'/products/new'}>
                                                Adicionar produtos
                                            </Link>
                                        </span>
                                        <span>
                                            <Link href={'/products/all'}>
                                                Gerenciar produtos
                                            </Link>
                                        </span>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>

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