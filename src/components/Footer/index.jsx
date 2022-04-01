import { useContext } from 'react';
import Image from 'next/image';

import style from './style.module.scss';

import { ButtonLink } from '../ButtonLink';
import { DropDownContext } from '../../contexts/DropDownContext';

function Footer() {
    const { handleSetDropDown } = useContext(DropDownContext)

    return (
        <div className={style.footerContainer} onClick={handleSetDropDown}>
            <main className={style.footerMain}>
                <div className={style.footerLeft}>
                    <div>
                        <Image src="/images/Logo.png" alt="Alura Geek" width={176} height={50} />
                    </div>
                    <div>
                        <ul>
                            <li>Quem somos nós</li>
                            <li>Política de privacidade</li>
                            <li>Programa fidelidade</li>
                            <li>Nossas lojas</li>
                            <li>Quero ser franqueado</li>
                            <li>Anuncie aqui</li>
                        </ul>
                    </div>
                </div>
                <form className={style.footerForm}>
                    <h4>Fale conosco</h4>
                    <div>Nome</div>
                    <input type="text" />
                    <textarea placeholder='Escreva sua mensagem' />

                    <ButtonLink link={'/message'} size='151' inverse>
                        Enviar mensagem
                    </ButtonLink>
                </form>
            </main>
            <footer>
                <span>Desenvolvido por Thales Trombim</span>
                <span>2022</span>
            </footer>
        </div>
    )
}

export { Footer };