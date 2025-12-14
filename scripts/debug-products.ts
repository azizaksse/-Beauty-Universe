import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugProducts() {
    console.log('Fetching products...');
    const { data: products, error } = await supabase
        .from('products')
        .select('id, title, images, category_id, created_at')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        return;
    }

    console.log(`Found ${products.length} products.`);

    products.forEach(p => {
        console.log('------------------------------------------------');
        console.log(`ID: ${p.id}`);
        console.log(`Title: ${p.title}`);
        console.log(`Created At: ${p.created_at}`);
        console.log(`Category ID: ${p.category_id}`);
        console.log(`Images:`, p.images);

        if (Array.isArray(p.images) && p.images.length > 0) {
            const firstImage = p.images[0];
            if (firstImage.startsWith('http')) {
                console.log(`[NEW] Image is a URL. Check if accessible.`);
            } else {
                console.log(`[OLD] Image is a path. Likely local.`);
            }
        } else {
            console.log(`[WARN] No images.`);
        }
    });
}

debugProducts();
