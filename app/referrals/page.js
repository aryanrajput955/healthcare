"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Link2,
    Mail,
    UserPlus,
    ArrowLeft,
    Users,
} from "lucide-react";
import useAuthStore from "../lib/authstore";
import RefereeRegistrationModal from "../components/RefereeRegistrationModal";
import { API_BASE_URL, API_ENDPOINTS } from "../lib/constants";

export default function ReferralsPage() {
    const { user, token, initializeAuth } = useAuthStore();
    const router = useRouter();

    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isRefereeModalOpen, setIsRefereeModalOpen] = useState(false);

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

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    useEffect(() => {
        if (!token) router.push("/login");
    }, [token, router]);

    const handleAddReferee = async (formData) => {
        try {
            const body = new FormData();
            body.append("assignedRole", formData.assignedRole);
            body.append("refereeEmail", formData.email);

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

            if (formData.selfie instanceof File) {
                body.append("selfie", formData.selfie);
            }

            const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.REFEREE}`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body,
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.message || res.statusText || "Submission failed");
            }

            return await res.json();
        } catch (e) {
            throw e;
        }
    };

    if (!token) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e8f5f3] pt-24 pb-12 px-4">
            <div className="max-w-xl mx-auto space-y-6">

                {/* Header */}
                <div
                    className="rounded-3xl p-6 text-white shadow-xl"
                    style={{ background: "linear-gradient(135deg, #354B62 0%, #27A395 100%)" }}
                >
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="text-white/70 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Referrals</h1>
                            <p className="text-white/70 text-sm mt-0.5">Invite people to join your network</p>
                        </div>
                    </div>
                </div>

                {canInvite ? (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center space-x-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-[#27A395]/15 to-[#33A8D3]/15 rounded-xl flex items-center justify-center">
                                <Link2 className="w-5 h-5 text-[#27A395]" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#354B62]">Create Link</h2>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Enter the referee&apos;s email and select their role to continue
                                </p>
                            </div>
                        </div>

                        <div className="px-6 py-6 space-y-5">
                            {/* Email */}
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

                            {/* Role */}
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

                            {/* Continue */}
                            <button
                                type="button"
                                onClick={() => canContinue && setIsRefereeModalOpen(true)}
                                disabled={!canContinue}
                                className="w-full flex items-center justify-center space-x-2.5 py-4 rounded-xl font-semibold text-base transition-all duration-300 bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white hover:from-[#33A8D3] hover:to-[#27A395] hover:shadow-lg hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                <UserPlus className="w-5 h-5" />
                                <span>Continue to Referee Details</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 text-center">
                        <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Users className="w-7 h-7 text-gray-400" />
                        </div>
                        <h3 className="text-gray-700 font-semibold text-lg mb-2">Not available</h3>
                        <p className="text-gray-400 text-sm">
                            Your current role doesn&apos;t have permission to invite new referees.
                        </p>
                    </div>
                )}
            </div>

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
