import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProducts() {
    console.log('Fetching all products...\n');

    const { data: products, error } = await supabase
        .from('products')
        .select('id, title, price, images, created_at')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        return;
    }

    console.log(`Found ${products.length} products:\n`);
    products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.title}`);
        console.log(`   ID: ${product.id}`);
        console.log(`   Price: ${product.price} DA`);
        console.log(`   Images: ${product.images?.length || 0} images`);
        if (product.images && product.images.length > 0) {
            product.images.forEach((img, i) => {
                console.log(`     - ${img}`);
            });
        }
        console.log('');
    });
}

checkProducts();
