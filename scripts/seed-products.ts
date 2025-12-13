import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Using publishable key might not have enough permissions for INSERT if RLS is strict. 
// However, I set RLS to allow public insert for storage, but for tables usually it's restricted.
// I should check if I have a SERVICE_ROLE_KEY or if I can use the existing client logic.
// Since I am "admin", I probably need the service role key or I need to sign in.
// But wait, the user's `createProduct` action uses `createClient` from `@/lib/supabase/server` which uses cookies.
// A script doesn't have cookies.
// I will try to use the publishable key and see if it works (if RLS allows anon insert, which it might not).
// If not, I will ask the user for the service role key or just use the "Add Product" form in the UI manually?
// No, the user said "place them and update".
// Let's assume I can use the publishable key for now, or better, I'll check if there is a service role key in .env.local.

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
    {
        title: 'جبة حوتي سواري',
        price: 5900,
        category_id: null, // or fetch a category if needed
        status: 'active',
        images: [
            '/images/products/جبة حوتي سواري.webp',
            '/images/products/جبة حوتي سواري (2).webp'
        ]
    },
    {
        title: 'جبة كلوش',
        price: 5800,
        category_id: null,
        status: 'active',
        images: [
            '/images/products/جبة كلوش (1).webp',
            '/images/products/جبة كلوش (2).webp',
            '/images/products/جبة كلوش (3).webp',
            '/images/products/جبة كلوش (4).webp'
        ]
    },
    {
        title: 'كاشكور حوتة بالألماس',
        price: 5900,
        category_id: null,
        status: 'active',
        images: [
            '/images/products/كاشكور حوتة بالألماس (1).webp',
            '/images/products/كاشكور حوتة بالألماس (3).webp'
        ]
    }
];

async function seed() {
    console.log('Seeding products...');

    for (const product of products) {
        const { data, error } = await supabase
            .from('products')
            .insert(product)
            .select();

        if (error) {
            console.error(`Error inserting ${product.title}:`, error);
        } else {
            console.log(`Inserted ${product.title}`);
        }
    }
}

seed();
