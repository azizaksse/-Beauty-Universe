import { setRequestLocale } from 'next-intl/server';

export default async function SettingsPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 text-center">
                <p className="text-lg text-gray-500">Coming Soon</p>
                <p className="text-sm text-gray-400 mt-2">Global store settings will be available here.</p>
            </div>
        </div>
    );
}
