import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

import style from './style.module.scss';
import { ModalContext } from '../../contexts/ModalContext';

function Modal({ message, method }) {
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
                    <Image src={ modalBody.img } width={'30px'} height={'30px'}  alt='Tem certeza? essa ação não pode ser desfeita'/>
                    <h3>{ modalBody.title }</h3>
                    <span>{ message }</span>

                    { modalBody.buttons && (
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
                        )
                    }
                </main>
            </div>
        )
    )
}

export { Modal };