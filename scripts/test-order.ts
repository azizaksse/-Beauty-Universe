import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testOrderCreation() {
    console.log('Testing order creation...');

    // 1. Get a product to order
    const { data: products, error: productError } = await supabase
        .from('products')
        .select('id, title, price')
        .limit(1);

    if (productError || !products || products.length === 0) {
        console.error('Error fetching product for order test:', productError);
        return;
    }

    const product = products[0];
    console.log(`Ordering product: ${product.title} (${product.id})`);

    // 2. Create a test order
    const orderData = {
        product_id: product.id,
        customer_name: 'Test User',
        customer_phone: '0555555555',
        wilaya: 'Alger',
        baladia: 'Alger Centre',
        address: '123 Test St',
        delivery_method: 'desk',
        product_price: product.price,
        delivery_price: 500,
        total_price: product.price + 500,
        color: 'Black',
        size: 'Standard',
        status: 'pending'
    };

    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

    if (orderError) {
        console.error('❌ Error creating order:', orderError);
    } else {
        console.log('✅ Order created successfully:', order);

        // Cleanup: Delete the test order
        const { error: deleteError } = await supabase
            .from('orders')
            .delete()
            .eq('id', order.id);

        if (deleteError) {
            console.warn('⚠️ Could not delete test order:', deleteError);
        } else {
            console.log('✅ Test order deleted.');
        }
    }
}

testOrderCreation();
