import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Instagram, Facebook } from "lucide-react";
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
                                <p className="mt-1 text-neutral-600" dir="ltr">0771 51 41 01</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="rounded-full bg-neutral-100 p-3 text-neutral-900">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-neutral-900">{t("info.email")}</h3>
                                <p className="mt-1 text-neutral-600">contact@beautyuniverse.com</p>
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

                        {/* Social Media & WhatsApp */}
                        <div className="pt-6 border-t border-neutral-100 space-y-6">
                            <div>
                                <h3 className="font-semibold text-neutral-900 mb-4">{t("info.followUs")}</h3>
                                <div className="flex gap-4">
                                    <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-900 transition hover:bg-black hover:text-white">
                                        <Instagram className="h-5 w-5" />
                                    </a>
                                    <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-900 transition hover:bg-black hover:text-white">
                                        <Facebook className="h-5 w-5" />
                                    </a>
                                    <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-900 transition hover:bg-black hover:text-white">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <a
                                href="https://wa.me/213700000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-semibold text-white transition hover:bg-[#20bd5a]"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                                </svg>
                                {t("info.whatsapp")}
                            </a>
                        </div>
                    </div>

                    {/* Google Map */}
                    <div className="h-full min-h-[400px] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.466540645674!2d3.1366667!3d36.7233333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e531e2170364d%3A0x673f32958069502!2s04%20Rue%20ahmed%20ait%20mohand%20el%20harrach%2C%20Algiers%2C%20Algeria!5e0!3m2!1sen!2sdz!4v1709825432100!5m2!1sen!2sdz"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: "400px" }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
