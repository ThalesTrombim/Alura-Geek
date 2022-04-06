import Image from 'next/image';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import style from './style.module.scss';

import { DropDownContext } from '../../contexts/DropDownContext';
import { supabaseClient } from '../../services/supabaseClient';

function Footer() {
    const { handleSetDropDown } = useContext(DropDownContext)
    const { register, handleSubmit } = useForm()

    async function handleFAQ({ faq_name, faq_message }) {
        const { data, error } = await supabaseClient
        .from('faq')
        .insert([
            { name: faq_name, message: faq_message }
        ])
    
        console.log(data)
    }

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
                <form className={style.footerForm} onSubmit={handleSubmit(handleFAQ)}>
                    <h4>Fale conosco</h4>
                    <label htmlFor='faq_name'>Nome</label>
                    <input required maxLength={40} id='faq_name' name='faq_name' type="text" {...register('faq_name')}/>
                    <textarea required maxLength={120} name='faq_message' {...register('faq_message')} placeholder='Escreva sua mensagem' />

                    <button type='submit' className={style.submitForm}>
                        Enviar mensagem
                    </button>
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