"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThreeDScrollTriggerContainer, ThreeDScrollTriggerRow } from "@/components/ui/ThreeDScrollTrigger";

const testimonials = [
    {
        id: 1,
        name: "Wissem Allache",
        content: "2À l’écoute, réactifs , sérieux et professionnels .. Merci beaucoup 🙏 Allah ybarak thalaw fiya ou. sa3doni ou tal9a kolach même Ila ma3andhomch ydjibolak wallah lah ybarak Rabi ywafa9kom inchallah",
        rating: 5,
        date: "February 2025"
    },
    {
        id: 2,
        name: "Amir Amine",
        content: "meilleur service.........vraiment c'est top ...... je recommande 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹",
        rating: 5,
        date: "January 2025"
    },
    {
        id: 3,
        name: "Dounya Rahmane",
        content: "انا من قورصوا شكرا على التوصيل عتاد التجميل وحسن المعاملة",
        rating: 5,
        date: "February 2025"
    },
    {
        id: 4,
        name: "Abdou Lizli",
        content: "انا من تسمسيلت ❤️شكرا على التوصيل سلعة ماشاء الله كراسي للحلاقة روعة وخدمة الزبون في القمة ان شاء الله مزال نزيد نشري عليكم ❤️",
        rating: 5,
        date: "January 2025"
    },
    {
        id: 5,
        name: "Mecipssa Sahli",
        content: "Merci pour la livraison de poste de travail à sidi aiche bejaia je recommande ❤️",
        rating: 5,
        date: "January 2025"
    },
    {
        id: 6,
        name: "Fa Tima",
        content: "Commande reçu merci bcp je satisfaite du service et du produit merci pour votre serieux 🙏",
        rating: 5,
        date: "January 2025"
    },
    {
        id: 7,
        name: "Amine Medjamia",
        content: "شكرا على التوصيل الة البخار ومعدات التجميل إلى مدينة العطاف ولاية عين الدفلى وشكرا حسن المعاملة والثقة",
        rating: 5,
        date: "January 2025"
    },
    {
        id: 8,
        name: "Staline Vladimire",
        content: "je suis de guelma merci pour la livraison de relax",
        rating: 5,
        date: "January 2025"
    },
    {
        id: 9,
        name: "Yaya Robaine",
        content: "Recommends Beauty Universe.",
        rating: 5,
        date: "February 2025"
    }
];

export function TestimonialsSection() {
    return (
        <section className="py-16 bg-neutral-50">
            <div className="mx-auto max-w-6xl px-4">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold text-neutral-900">Avis Clients</h2>
                    <div className="mx-auto my-3 h-1 w-20 rounded-full bg-gradient-to-r from-gold-400 to-gold-600" />
                    <p className="mt-2 text-neutral-600">Ce que nos clients disent de nous</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="relative rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-gold-200"
                        >
                            <div className="mb-4 flex items-center gap-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                                ))}
                            </div>

                            <p className="mb-6 text-sm leading-relaxed text-neutral-600">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
                                <div>
                                    <h4 className="font-bold text-neutral-900">{testimonial.name}</h4>
                                    <p className="text-xs text-neutral-400">Client vérifié</p>
                                </div>
                                <div className="text-xs text-neutral-400">{testimonial.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
