-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    price NUMERIC NOT NULL,
    images JSONB DEFAULT '[]'::JSONB,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Product Variants Table
CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    size TEXT,
    color TEXT,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    wilaya TEXT NOT NULL,
    baladia TEXT,
    address TEXT,
    delivery_method TEXT,
    product_price NUMERIC NOT NULL,
    delivery_price NUMERIC NOT NULL,
    total_price NUMERIC NOT NULL,
    color TEXT,
    size TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Storage Buckets (if not exists)
-- Note: This usually requires SQL execution or API calls. 
-- We can insert into storage.buckets if we have permissions.
INSERT INTO storage.buckets (id, name, public) 
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS Policies (Basic)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow public read access to categories and products
CREATE POLICY "Public categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Public products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Public variants are viewable by everyone" ON product_variants FOR SELECT USING (true);

-- Allow authenticated (admin) full access
-- Assuming admin uses service role or authenticated user with specific role
-- For simplicity, allowing service role full access (it has it by default)
-- But if we want to allow the "admin" panel users (if any), we need policies.
-- For now, let's allow public read, and maybe anon insert for orders?
CREATE POLICY "Public can create orders" ON orders FOR INSERT WITH CHECK (true);

-- Allow all access for service role (implicit, but good to be explicit if needed)
-- CREATE POLICY "Service role full access" ON products USING (auth.role() = 'service_role');
