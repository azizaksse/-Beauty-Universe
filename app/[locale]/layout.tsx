import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Beauty Universe | بيوتي يونيفرس",
    description: "Vente et Distribution De Matériel et Produits et Articles de Coiffure et d'esthétique et Cosmétiques | بيع وتوزيع معدات ومنتجات ومواد الحلاقة والتجميل ومستحضرات التجميل",
    icons: {
        icon: "/images/logo.png",
        shortcut: "/images/logo.png",
        apple: "/images/logo.png",
    },
    openGraph: {
        title: "Beauty Universe | بيوتي يونيفرس",
        description: "Vente et Distribution De Matériel et Produits et Articles de Coiffure et d'esthétique et Cosmétiques | بيع وتوزيع معدات ومنتجات ومواد الحلاقة والتجميل ومستحضرات التجميل",
        images: [
            {
                url: "/images/logo.png",
                width: 800,
                height: 600,
                alt: "Beauty Universe Logo",
            },
        ],
        locale: "fr_DZ",
        type: "website",
    },
};

const inter = Inter({
    variable: "--font-inter",
    display: "swap",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const tajawal = Tajawal({
    variable: "--font-tajawal",
    display: "swap",
    weight: ["400", "500", "700"],
    subsets: ["arabic", "latin"],
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
            <body
                className={`${inter.className} ${tajawal.variable} ${inter.variable} antialiased bg-white text-neutral-900`}
            >
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem={false}
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
