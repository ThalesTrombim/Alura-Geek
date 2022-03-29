import style from './style.module.scss';
import Link from 'next/link';

function ButtonLink({ children, link, size='182', inverse = false }) {
    var bgColor = 'var(--white)';
    var textColor = 'var(--blue)';
    
    if(inverse){
        bgColor = 'var(--blue)';
        textColor = 'var(--white)';
    }

    return (
        <div className={style.buttonContainer} style={{ width: `${size}px`, background: bgColor }}>
            <Link href={ link }>
                <a style={{color: textColor}}>
                    { children }
                </a>
            </Link>
        </div>
    )
}

export { ButtonLink };