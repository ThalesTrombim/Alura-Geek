import style from './style.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { ButtonLink } from '../ButtonLink';

function Header() {
    return (
        <div className={style.headerContainer}>
            <div className={style.LogoSearch}>
                <Link passHref href={'/'}>
                    <Image src="/images/Logo.png" alt="Alura Geek" width={176} height={50} />
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
                <Image src="/images/Logo.png" alt="Alura Geek" width={'100px'} height={'28px'} />
                <ButtonLink link={'/login'} size='133'>
                    Login
                </ButtonLink>
                <Image src="/icons/lupa-mobile.png" alt="Procurar" width={'17px'} height={'17px'} />
            </div>
        </div>
    )
}

export { Header }