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
    UserPlus,
    Link2,
    Mail,
} from "lucide-react";
import useAuthStore from "../lib/authstore";
import RefereeRegistrationModal from "../components/RefereeRegistrationModal";
import { API_BASE_URL, API_ENDPOINTS } from "../lib/constants";

export default function ProfilePage() {
    const { user, token, initializeAuth, clearAuth } = useAuthStore();
    const router = useRouter();

    const [isUserJourneyOpen, setIsUserJourneyOpen] = useState(false);
    const [isCashlessJourneyOpen, setIsCashlessJourneyOpen] = useState(false);
    const [isReimbursementJourneyOpen, setIsReimbursementJourneyOpen] = useState(false);
    const [isRefereeModalOpen, setIsRefereeModalOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("");
    const [emailError, setEmailError] = useState("");

    const canInvite = ["ClaimTrue Corporate", "Branch Franchise", "Master Franchise", "Elite"].includes(user?.roles);

    let inviteRoles = [];
    if (user?.roles === "ClaimTrue Corporate") {
        inviteRoles = ["Branch Franchise", "Master Franchise", "Elite"];
    } else if (user?.roles === "Branch Franchise") {
        inviteRoles = ["Master Franchise", "Elite"];
    } else if (user?.roles === "Master Franchise") {
        inviteRoles = ["Elite"];
    } else if (user?.roles === "Elite") {
        inviteRoles = ["Elite"];
    }

    const validateEmail = (value) => {
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address";
        return "";
    };

    const canContinue = inviteEmail.trim() !== "" && !emailError && inviteRole !== "";

    const handleAddReferee = async (formData) => {
        try {
            const body = new FormData();
            body.append("assignedRole", formData.assignedRole);
            body.append("refereeEmail", formData.email);

            // Build the sectioned formData object (strip the File object — it goes separately)
            const sections = {
                section1: {
                    fullName: formData.fullName,
                    fatherName: formData.fatherName,
                    dob: formData.dob,
                    mobile: formData.mobile,
                    whatsapp: formData.whatsapp,
                    email: formData.email,
                    currentAddress: formData.currentAddress,
                    permanentAddress: formData.permanentAddress,
                    aadhar: formData.aadhar || "",
                    pan: formData.pan,
                    bankDetails: formData.bankDetails,
                },
                section2: {
                    occupation: formData.occupation,
                    hasSalesExp: formData.hasSalesExp,
                    expYears: formData.expYears || "",
                },
                section3: { contacts: formData.contacts },
                section4: { earningModel: formData.earningModel },
                section5: {
                    hasKnowledge: formData.hasKnowledge,
                    whyPartner: formData.whyPartner,
                },
                section6: {
                    signature: formData.signature,
                    declarationDate: formData.declarationDate,
                },
            };
            body.append("formData", JSON.stringify(sections));

            // Attach selfie file if one was uploaded
            if (formData.selfie instanceof File) {
                body.append("selfie", formData.selfie);
            }

            const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REFEREE}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Do NOT set Content-Type — browser sets it with the correct boundary for multipart
                },
                body,
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                console.error("Referee submission failed:", err);
                throw new Error(err.message || res.statusText || "Submission failed");
            }

            const result = await res.json();
            console.log("Referee saved successfully:", result);
        } catch (e) {
            console.error("Network error submitting referee:", e);
            throw e; // Re-throw so the modal can catch it and show inline error
        }
    };


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

                {/* Create Link / Continue to Referee Details */}
                {canInvite && (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center space-x-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-[#27A395]/15 to-[#33A8D3]/15 rounded-xl flex items-center justify-center">
                                <Link2 className="w-5 h-5 text-[#27A395]" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#354B62]">Create Link</h2>
                                <p className="text-xs text-gray-400 mt-0.5">Enter the referee&apos;s email and select their role to continue</p>
                            </div>
                        </div>

                        <div className="px-6 py-6 space-y-5">
                            {/* Email field */}
                            <div className="space-y-1.5">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#27A395] transition-colors" />
                                    <input
                                        type="email"
                                        value={inviteEmail}
                                        onChange={(e) => {
                                            setInviteEmail(e.target.value);
                                            setEmailError(validateEmail(e.target.value));
                                        }}
                                        onBlur={(e) => setEmailError(validateEmail(e.target.value))}
                                        placeholder="Enter recipient's email"
                                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm ${
                                            emailError
                                                ? "border-red-300 bg-red-50"
                                                : inviteEmail && !emailError
                                                    ? "border-green-200"
                                                    : "border-gray-200"
                                        }`}
                                    />
                                </div>
                                {emailError && (
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                        <span>⚠</span> {emailError}
                                    </p>
                                )}
                            </div>

                            {/* Role dropdown */}
                            <div className="space-y-1.5">
                                <label className="block text-sm font-semibold text-gray-700">
                                    User Role <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={inviteRole}
                                    onChange={(e) => setInviteRole(e.target.value)}
                                    className={`w-full px-4 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm ${
                                        inviteRole ? "border-green-200" : "border-gray-200"
                                    }`}
                                >
                                    <option value="">Select a role</option>
                                    {inviteRoles.map((r) => (
                                        <option key={r} value={r}>{r}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Continue button */}
                            <button
                                type="button"
                                onClick={() => canContinue && setIsRefereeModalOpen(true)}
                                disabled={!canContinue}
                                className="w-full flex items-center justify-center space-x-2.5 py-4 rounded-xl font-semibold text-base transition-all duration-300 bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white hover:from-[#33A8D3] hover:to-[#27A395] hover:shadow-lg hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:from-[#27A395] disabled:hover:to-[#33A8D3]"
                            >
                                <UserPlus className="w-5 h-5" />
                                <span>Continue to Referee Details</span>
                            </button>
                        </div>
                    </div>
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

            {/* Referee Registration Modal — conditionally mounted so it always starts fresh */}
            {isRefereeModalOpen && (
                <RefereeRegistrationModal
                    isOpen={isRefereeModalOpen}
                    onClose={() => setIsRefereeModalOpen(false)}
                    onAddReferee={handleAddReferee}
                    initialEmail={inviteEmail}
                    initialRole={inviteRole}
                />
            )}
        </div>
    );
}
