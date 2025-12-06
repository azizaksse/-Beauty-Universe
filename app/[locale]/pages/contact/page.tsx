import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function ContactPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "ContactPage" });

    return (
        <div className="min-h-screen bg-white text-neutral-900">
            <Navbar />
            <main className="mx-auto max-w-4xl px-4 py-10">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
                        {t("title")}
                    </h1>
                    <p className="mt-4 text-neutral-600">
                        {t("description")}
                    </p>
                </div>

                <div className="grid gap-10 md:grid-cols-2">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="rounded-full bg-neutral-100 p-3 text-neutral-900">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-neutral-900">{t("info.phone")}</h3>
                                <p className="mt-1 text-neutral-600" dir="ltr">+213 700 00 00 00</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="rounded-full bg-neutral-100 p-3 text-neutral-900">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-neutral-900">{t("info.email")}</h3>
                                <p className="mt-1 text-neutral-600">contact@ophirastyle.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="rounded-full bg-neutral-100 p-3 text-neutral-900">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-neutral-900">{t("info.address")}</h3>
                                <p className="mt-1 text-neutral-600">{t("info.addressValue")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium text-neutral-900">
                                    {t("form.name")}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-neutral-900">
                                    {t("form.email")}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="mb-2 block text-sm font-medium text-neutral-900">
                                    {t("form.message")}
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                                />
                            </div>
                            <Button className="w-full bg-black text-white hover:bg-neutral-800">
                                {t("form.submit")}
                            </Button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
