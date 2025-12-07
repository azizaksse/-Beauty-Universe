"use client";

import { useState, useEffect, useTransition } from "react";
import { getShippingZones, updateShippingRate } from "@/app/[locale]/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

interface ShippingZone {
    id: number;
    wilaya_name: string;
    home_delivery_price: number;
    desk_delivery_price: number;
}

export default function ShippingSettingsPage() {
    const [zones, setZones] = useState<ShippingZone[]>([]);
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState<number | null>(null);

    useEffect(() => {
        const fetchZones = async () => {
            const data = await getShippingZones();
            setZones(data);
            setLoading(false);
        };
        fetchZones();
    }, []);

    const handlePriceChange = (id: number, field: "home_delivery_price" | "desk_delivery_price", value: string) => {
        setZones(zones.map(zone =>
            zone.id === id ? { ...zone, [field]: parseFloat(value) || 0 } : zone
        ));
    };

    const handleSave = async (zone: ShippingZone) => {
        setSavingId(zone.id);
        await updateShippingRate(zone.id, zone.home_delivery_price, zone.desk_delivery_price);
        setSavingId(null);
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading shipping zones...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Shipping Rates</h1>
                <p className="text-gray-500">Manage delivery prices for all 58 Wilayas</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 font-medium">Wilaya</th>
                                <th className="px-6 py-3 font-medium">Home Delivery (DA)</th>
                                <th className="px-6 py-3 font-medium">Desk Delivery (DA)</th>
                                <th className="px-6 py-3 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {zones.map((zone) => (
                                <tr key={zone.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {zone.wilaya_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Input
                                            type="number"
                                            value={zone.home_delivery_price}
                                            onChange={(e) => handlePriceChange(zone.id, "home_delivery_price", e.target.value)}
                                            className="max-w-[120px]"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <Input
                                            type="number"
                                            value={zone.desk_delivery_price}
                                            onChange={(e) => handlePriceChange(zone.id, "desk_delivery_price", e.target.value)}
                                            className="max-w-[120px]"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button
                                            size="sm"
                                            onClick={() => handleSave(zone)}
                                            disabled={savingId === zone.id}
                                            className={savingId === zone.id ? "opacity-70" : ""}
                                        >
                                            {savingId === zone.id ? (
                                                "Saving..."
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4 mr-2" />
                                                    Save
                                                </>
                                            )}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
