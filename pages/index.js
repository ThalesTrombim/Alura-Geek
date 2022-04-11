import { Home } from '../src/screens/Home';
import { supabaseClient } from '../src/services/supabaseClient';

export default Home;

export async function getStaticProps(context) {
    const categoriesList = await supabaseClient.from('categories').select().order('id')
    const categories = categoriesList.data
    let products = [];

    for(let i = 0; i < categories.length; i++){
        const categoryId = categories[i].id
        const { data } = await supabaseClient.from('products').select().eq('category', categoryId).limit(6).order('id')
        data.map(product => products.push(product))
    }

    return {
        props: {
            categories,
            products
        },
    }
}