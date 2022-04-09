import Image from 'next/image';
import { useContext } from 'react';

import style from './style.module.scss';
import { ModalContext } from '../../contexts/ModalContext';

function Modal() {
    const { modalActive, setModalActive } = useContext(ModalContext)

    function handleModal(e) {
        if (e.target.id == "overlay") {
            setModalActive(false);
        }
    }

    return (
        modalActive && (
            <div id='overlay' className={style.modalOverlay} onClick={e => handleModal(e)}>
                <main className={style.modal}>
                    <Image src={'/icons/danger.png'} width={'30px'} height={'30px'}  alt='Tem certeza? essa ação não pode ser desfeita'/>
                    <h3>Tem certeza?</h3>
                    <span>Essa ação é irreversível</span>

                    <div className={style.buttonArea}>
                        <button
                            className={style.cancelButton}
                        >
                            Cancelar
                        </button>
                        <button className={style.confirmButton}>
                            Sim, deletar
                        </button>
                    </div>
                </main>
            </div>
        )
    )
}

export { Modal };