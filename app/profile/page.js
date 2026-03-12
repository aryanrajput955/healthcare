"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    User,
    ChevronDown,
    ChevronRight,
    LogOut,
    Activity,
    CreditCard,
    FileText,
    ShieldCheck,
    Users,
    Network,
} from "lucide-react";
import useAuthStore from "../lib/authstore";

export default function ProfilePage() {
    const { user, token, initializeAuth, clearAuth } = useAuthStore();
    const router = useRouter();

    const [isUserJourneyOpen, setIsUserJourneyOpen] = useState(false);
    const [isCashlessJourneyOpen, setIsCashlessJourneyOpen] = useState(false);
    const [isReimbursementJourneyOpen, setIsReimbursementJourneyOpen] = useState(false);

    const canInvite = ["ClaimTrue Corporate", "Branch Franchise", "Master Franchise", "Elite"].includes(user?.roles);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, [token, router]);

    const handleLogout = () => {
        clearAuth();
        router.push("/");
    };

    const userJourney = [
        { name: "Profile Setup", href: "#user-journey-profile" },
        { name: "Health Records", href: "#user-journey-records" },
        { name: "Appointments", href: "#user-journey-appointments" },
    ];

    const cashlessJourney = [
        { name: "Cashless Claims", href: "#cashless-journey-claims" },
        { name: "Hospital Network", href: "#cashless-journey-network" },
        { name: "Approval Process", href: "#cashless-journey-approval" },
    ];

    const reimbursementJourney = [
        { name: "Submit Receipts", href: "#reimbursement-journey-receipts" },
        { name: "Track Claims", href: "#reimbursement-journey-track" },
        { name: "Reimbursement Status", href: "#reimbursement-journey-status" },
    ];

    const sections = [
        {
            id: "user",
            label: "User Journey",
            icon: Activity,
            items: userJourney,
            open: isUserJourneyOpen,
            toggle: () => setIsUserJourneyOpen((v) => !v),
        },
        {
            id: "cashless",
            label: "Cashless Journey",
            icon: CreditCard,
            items: cashlessJourney,
            open: isCashlessJourneyOpen,
            toggle: () => setIsCashlessJourneyOpen((v) => !v),
        },
        {
            id: "reimbursement",
            label: "Reimbursement Journey",
            icon: FileText,
            items: reimbursementJourney,
            open: isReimbursementJourneyOpen,
            toggle: () => setIsReimbursementJourneyOpen((v) => !v),
        },
    ];

    if (!token) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e8f5f3] pt-24 pb-12 px-4">
            <div className="max-w-2xl mx-auto space-y-6">

                {/* Header card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                    <div className="flex items-center space-x-5">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#27A395] to-[#33A8D3] rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                            <User className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#354B62]">
                                {user?.name || "User"}
                            </h1>
                            <p className="text-gray-500 mt-0.5">{user?.email || "—"}</p>

                            {user?.roles && (
                                <div className="inline-flex items-center space-x-1.5 mt-2 bg-[#27A395]/10 text-[#27A395] px-2.5 py-1 rounded-full border border-[#27A395]/20">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{user.roles}</span>
                                </div>
                            )}

                            {user?.organizationname && (
                                <p className="text-sm text-[#27A395] font-medium mt-2">
                                    {user.organizationname}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Journey sections */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="px-6 pt-6 pb-2">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                            My Journeys
                        </h2>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {sections.map(({ id, label, icon: Icon, items, open, toggle }) => (
                            <div key={id}>
                                <button
                                    onClick={toggle}
                                    className="flex w-full items-center justify-between text-left text-[#354B62] hover:text-[#27A395] font-semibold py-4 px-6 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-[#27A395]/10 to-[#33A8D3]/10 rounded-lg flex items-center justify-center">
                                            <Icon className="w-4 h-4 text-[#27A395]" />
                                        </div>
                                        <span>{label}</span>
                                    </div>
                                    <ChevronDown
                                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {open && (
                                    <div className="bg-gray-50 px-6 pb-4 space-y-1">
                                        {items.map((item, i) => (
                                            <Link
                                                key={i}
                                                href={item.href}
                                                className="flex items-center justify-between py-3 px-4 text-sm text-gray-700 hover:text-[#27A395] group bg-white rounded-xl hover:shadow-sm transition-all duration-200 border border-transparent hover:border-[#27A395]/20"
                                            >
                                                <span className="font-medium">{item.name}</span>
                                                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#27A395] transition-colors" />
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Referrals CTA */}
                {canInvite && (
                    <button
                        onClick={() => router.push('/referrals')}
                        className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-5 flex items-center justify-between hover:shadow-2xl transition-all duration-200 hover:border-[#27A395]/30 group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#27A395]/15 to-[#33A8D3]/15 rounded-xl flex items-center justify-center">
                                <Users className="w-5 h-5 text-[#27A395]" />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-[#354B62]">Referrals</p>
                                <p className="text-xs text-gray-400 mt-0.5">Invite people to your network</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#27A395] transition-colors" />
                    </button>
                )}

                {/* Organisation CTA */}
                {canInvite && (
                    <button
                        onClick={() => router.push('/organisation')}
                        className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-5 flex items-center justify-between hover:shadow-2xl transition-all duration-200 hover:border-[#27A395]/30 group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#354B62]/15 to-[#27A395]/15 rounded-xl flex items-center justify-center">
                                <Network className="w-5 h-5 text-[#354B62]" />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-[#354B62]">Organisation</p>
                                <p className="text-xs text-gray-400 mt-0.5">View your hierarchy &amp; network</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#27A395] transition-colors" />
                    </button>
                )}


                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.01]"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}
