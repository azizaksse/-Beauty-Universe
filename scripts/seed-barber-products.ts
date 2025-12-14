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

const products = [
    {
        title: "Fauteuil de Coiffure Theodore",
        price: 58000,
        status: 'active',
        images: ["/images/products/theodore-barber-chair.png"],
        category_id: null // You might want to create a category first and link it
    },
    {
        title: "Miroir Intelligent LED",
        price: 25000,
        status: 'active',
        images: ["/images/products/smart-mirror-led.png"],
        category_id: null
    },
    {
        title: "Panneaux Alternatifs Bois",
        price: 4500,
        status: 'active',
        images: ["/images/products/wood-alternative-panels.png"],
        category_id: null
    },
    {
        title: "Armoire Outils Coiffure",
        price: 32000,
        status: 'active',
        images: ["/images/products/barber-tools-cabinet.png"],
        category_id: null
    }
];

async function seed() {
    console.log('Seeding barber products...');

    // Optional: Create a default category
    const { data: category, error: catError } = await supabase
        .from('categories')
        .insert({ name: 'Équipement', slug: 'equipment', image_url: '/images/products/theodore-barber-chair.png' })
        .select()
        .single();

    if (catError && catError.code !== '23505') { // Ignore unique violation
        console.error('Error creating category:', catError);
    }

    const categoryId = category?.id;

    for (const product of products) {
        const productData = { ...product, category_id: categoryId };

        const { data, error } = await supabase
            .from('products')
            .insert(productData)
            .select();

        if (error) {
            console.error(`Error inserting ${product.title}:`, error);
        } else {
            console.log(`Inserted ${product.title}`);
        }
    }
}

seed();
