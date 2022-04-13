import style from './style.module.scss'
import Link from 'next/link';
import Image from 'next/image';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function ProductCard({ product, edit = false, method = false }) {
    const { id, name, price, img } = product;
    const { user } = useContext(AuthContext);

    return (
        <div className={style.productContainer}>
                <a href={`/products/${id}`}>
                    <Image className={style.productImage} src={img} alt={name} width={'176px'} height={'174px'} />
                </a>
            {
                edit && (
                    <>
                        {
                            user && (
                                <div className={style.editArea}>
                                    <span>
                                        <Link href={`/products/edit/${id}`} passHref>
                                            <a>
                                                <Image src='/icons/edit-icon.png' alt={name} width={'18px'} height={'18px'} />
                                            </a>
                                        </Link>
                                    </span>
                                    <span onClick={() => method(id, img)}>
                                        <Image src='/icons/trash-icon.png' alt={name} width={'14px'} height={'18px'} />
                                    </span>
                                </div>
                            )
                        }   
                    </>
                )
            }
            <p>{name}</p>
            <span>{price}</span>
            <div>
                <Link href={`/products/${id}`}>
                    Ver produto
                </Link>
            </div>
        </div>
    )
}

export { ProductCard };