import style from './style.module.scss';
import Image from 'next/image';
import Link from 'next/link';

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
                <Link className={style.teste} href={'/login'}>
                    Login
                </Link>
            </span>
        </div>
    )
}

export { Header }