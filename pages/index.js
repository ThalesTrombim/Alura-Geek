import { Home } from '../src/screens/Home';
import { supabaseClient } from '../src/services/supabaseClient';

export default Home;

export async function getStaticProps(context) {
    const categoriesList = await supabaseClient.from('categories').select().order('id')
    const categories = categoriesList.data
    let products = [];

    for(let i = 1; i < categories.length+1; i++){
        const { data } = await supabaseClient.from('products').select().eq('category', i).limit(6)
        data.map(product => products.push(product))
    }

    return {
        props: {
            categories,
            products
        },
    }
}