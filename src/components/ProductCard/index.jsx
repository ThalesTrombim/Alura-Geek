import style from './style.module.scss'
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function ProductCard({ product, edit = false }) {
    const { id, name, price, img } = product;
    const { user } = useContext(AuthContext);

    return (
        <div className={style.productContainer}>
            <Link passHref href={`/products/${id}`}>
                <a>
                    <Image src={img} alt={name} width={176} height={174} />
                </a>
            </Link>
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
                                    <span>
                                        <Link href={`/products/edit/${id}`} passHref>
                                            <a>
                                                <Image src='/icons/trash-icon.png' alt={name} width={'14px'} height={'18px'} />
                                            </a>
                                        </Link>
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