import style from './style.module.scss';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { DropDownContext } from '../../contexts/DropDownContext';


function LoginPage() {
    const { register, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext);
    const { handleSetDropDown } = useContext(DropDownContext);

    async function handleSign(data) {
        const res = await signIn(data)
    }

    return (
        <div className={style.loginContainer} onClick={handleSetDropDown}>
            <form onSubmit={handleSubmit(handleSign)}>
                <h4>Iniciar Sessão</h4>
                <input {...register('email')} name='email' value={'admim@email.com'} type="email" placeholder='Escreva seu email'/>
                <input {...register('password')} value="123456" name='password' type="password" placeholder='Escreva sua senha'/>
                <button>Entrar</button>
            </form>
        </div>
    )
}

export { LoginPage }