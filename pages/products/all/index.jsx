import { useContext, useState } from 'react';
import Link from 'next/link';

import style from './style.module.scss';

import { ProductCard } from '../../../src/components/ProductCard';
import { DropDownContext } from '../../../src/contexts/DropDownContext';
import { AuthContext } from '../../../src/contexts/AuthContext';
import { supabaseClient } from '../../../src/services/supabaseClient';
import { Modal } from '../../../src/components/Modal';
import { ModalContext } from '../../../src/contexts/ModalContext';
import { ManageProductContext } from '../../../src/contexts/ManageProductContext';

export default function AllProducts({ products }) {
    const { user } = useContext(AuthContext)
    const { handleSetDropDown } = useContext(DropDownContext);
    const { setModalActive, setModalBody, setMessageModal } = useContext(ModalContext);
    const { deleteProduct, confirm } = useContext(ManageProductContext);
    const [ productId, setProductId ] = useState();

    function handleDeleteProduct(id) {
        setProductId(id)
        setModalActive(true);
        setModalBody(confirm);
        setMessageModal('Essa Ação é irreversível')
    }

    return (
        <div className={style.allProductsContainer} onClick={handleSetDropDown}>
            <Modal method={deleteProduct} id={productId} />
            <div className={style.content}>
                <header>
                    <h3>Todos os produtos</h3>

                    { user && (
                        <span>
                            <Link href={'/products/new'}>
                                Adicionar produto
                            </Link>
                        </span>
                    )}
                </header>
                <div className={style.productsContainer}>
                    {
                        products.map(product => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                edit 
                                method={handleDeleteProduct}
                            />
                        ))
                    }
                </div>
            
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    var products;
    const category = context.query.category;

    if(category){
    const categoriesID = await supabaseClient
    .from('categories')
    .select()
    .filter("name", 'ilike', `%${category}%`)

    const categoryId = categoriesID.data[0].id
        const productsList = await supabaseClient.from('products').select().eq('category', categoryId)
        products = productsList.data
    } else {
        const productsList = await supabaseClient.from('products').select()
        products = productsList.data 
    }

    return {
        props: {
            products
        },
    }
}