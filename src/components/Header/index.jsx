import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import style from './style.module.scss';
import { ButtonLink } from '../ButtonLink';

function Header() {
    const [ searchActive, setSearchActive ] = useState(false)

    return (
        <div className={style.headerContainer}>
            <div className={style.LogoSearch}>
                <Link passHref href={'/'}>
                    <a>
                        <Image src="/images/Logo.png" alt="Alura Geek" width={176} height={50} />
                    </a>
                </Link>
                <input type="text" placeholder='O que deseja encontrar?' />
                <span className={style.lupa}>
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
                            <input type="text" placeholder='O que deseja encontrar?' className={style.inputMobile}/>
                            <span className={style.lupa}>
                                <Image onClick={() => { setSearchActive(false)}} src="/icons/close.png" alt="Procurar" width={17} height={17} />
                            </span>
                            <Image onClick={() => console.log('click')} src="/icons/lupa-mobile.png" alt="Procurar" width={'17px'} height={'17px'} />
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