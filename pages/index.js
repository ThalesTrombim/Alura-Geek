import { Home } from '../src/screens/Home';
import { supabaseClient } from '../src/services/supabaseClient';

export default Home;

export async function getStaticProps(context) {
    const productsList = await supabaseClient.from('products').select()
    const categoriesList = await supabaseClient.from('categories').select().order('id')
    
    const products = productsList.data
    const categories = categoriesList.data

    return {
        props: {
            categories,
            products
        },
    }
}