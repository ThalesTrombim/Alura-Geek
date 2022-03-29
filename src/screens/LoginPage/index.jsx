import style from './style.module.scss';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';


function LoginPage() {
    const { register, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext);

    async function handleSign(data) {
        const res = await signIn(data)
        console.log(res)
    }

    return (
        <div className={style.loginContainer}>
            <form onSubmit={handleSubmit(handleSign)}>
                <h4>Iniciar Sessão</h4>
                <input {...register('email')} name='email' value={'admin@email.com'} type="email" placeholder='Escreva seu email'/>
                <input {...register('password')} value={'1234'} name='password' type="password" placeholder='Escreva sua senha'/>
                <button>Entrar</button>
            </form>
        </div>
    )
}

export { LoginPage }