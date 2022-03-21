import style from './style.module.scss';

function LoginPage() {
    return (
        <div className={style.loginContainer}>
            <form>
                <h4>Iniciar Sessão</h4>
                <input type="text" placeholder='Escreva seu email'/>
                <input type="password" placeholder='Escreva sua senha'/>
                <button>Entrar</button>
            </form>
        </div>
    )
}

export { LoginPage }