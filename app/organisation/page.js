"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Network,
    ArrowLeft,
    Users,
    ChevronRight,
    Building2,
    Shield,
    Star,
    Award,
    TrendingUp,
    UserCheck,
} from "lucide-react";
import useAuthStore from "../lib/authstore";
import { API_BASE_URL } from "../lib/constants";

// ── Role visual config ───────────────────────────────────────────────────────
const ROLE_CONFIG = {
    "ClaimTrue Corporate": {
        label: "ClaimTrue Corporate",
        shortLabel: "Corp",
        color: "#354B62",
        bg: "from-[#354B62] to-[#2D3F56]",
        badge: "bg-[#354B62] text-white",
        border: "border-[#354B62]/20",
        ring: "ring-[#354B62]/30",
        icon: Building2,
    },
    "Branch Franchise": {
        label: "Branch Franchise",
        shortLabel: "BF",
        color: "#27A395",
        bg: "from-[#27A395] to-[#20B2A0]",
        badge: "bg-[#27A395] text-white",
        border: "border-[#27A395]/20",
        ring: "ring-[#27A395]/30",
        icon: Shield,
    },
    "Master Franchise": {
        label: "Master Franchise",
        shortLabel: "MF",
        color: "#33A8D3",
        bg: "from-[#33A8D3] to-[#2196C7]",
        badge: "bg-[#33A8D3] text-white",
        border: "border-[#33A8D3]/20",
        ring: "ring-[#33A8D3]/30",
        icon: Award,
    },
    "Elite": {
        label: "Elite",
        shortLabel: "Elite",
        color: "#F59E0B",
        bg: "from-[#F59E0B] to-[#D97706]",
        badge: "bg-[#F59E0B] text-white",
        border: "border-[#F59E0B]/20",
        ring: "ring-[#F59E0B]/30",
        icon: Star,
    },
};

// ── Helpers ──────────────────────────────────────────────────────────────────
function findInTree(nodes, targetId, path = []) {
    for (const node of nodes) {
        if (node.id === targetId) return { node, ancestors: path };
        if (node.children?.length) {
            const found = findInTree(node.children, targetId, [...path, node]);
            if (found) return found;
        }
    }
    return null;
}

function countDescendants(node) {
    if (!node.children?.length) return 0;
    return node.children.reduce((sum, child) => sum + 1 + countDescendants(child), 0);
}

// ── Sub-components ───────────────────────────────────────────────────────────
function MemberCard({ member, highlight = false, onClick }) {
    const cfg = ROLE_CONFIG[member.roles] ?? {};
    const Icon = cfg.icon ?? Users;
    const direct = member.children?.length ?? 0;
    const total = countDescendants(member);
    const clickable = !!onClick;

    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-150 ${highlight
                ? `${cfg.border ?? "border-gray-200"} ring-2 ${cfg.ring ?? ""} bg-white shadow-md`
                : `${cfg.border ?? "border-gray-100"} bg-gray-50`
                } ${clickable ? "cursor-pointer hover:bg-white hover:shadow-md active:scale-[0.99]" : ""}`}
        >
            <div
                className={`w-11 h-11 bg-gradient-to-br ${cfg.bg ?? "from-gray-400 to-gray-500"} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}
            >
                <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#354B62] text-sm truncate">{member.name}</p>
                <p className="text-gray-400 text-xs truncate">{member.email}</p>
                {member.organizationname && (
                    <p className="text-[#27A395] text-xs font-medium mt-0.5 truncate">{member.organizationname}</p>
                )}
                <p className="text-gray-400 text-xs mt-0.5">
                    {direct} direct &middot; {total} total
                </p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
                <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${cfg.badge ?? "bg-gray-100 text-gray-600"}`}
                >
                    {cfg.shortLabel ?? member.roles}
                </span>
                {clickable && <ChevronRight className="w-4 h-4 text-gray-400" />}
            </div>
        </div>
    );
}

// ── Inner component (uses useSearchParams — must be inside Suspense) ────────
function OrganisationContent() {
    const { user, token, initializeAuth } = useAuthStore();
    const router = useRouter();
    const searchParams = useSearchParams();
    const midParam = searchParams.get("mid");
    const drillId = midParam ? parseInt(midParam, 10) : null;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tree, setTree] = useState(null);   // full hierarchy tree
    const [myNode, setMyNode] = useState(null);
    const [ancestors, setAncestors] = useState([]);
    // drill-down state
    const [drillNode, setDrillNode] = useState(null);
    const [drillAncestors, setDrillAncestors] = useState([]);

    const canView = ["ClaimTrue Corporate", "Branch Franchise", "Master Franchise", "Elite"].includes(
        user?.roles
    );

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    useEffect(() => {
        if (!token) router.push("/login");
    }, [token, router]);

    const fetchHierarchy = useCallback(async () => {
        if (!token || !canView || !user?.id) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE_URL}/referee/hierarchy`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error(`Failed to load hierarchy (HTTP ${res.status})`);
            const data = await res.json();
            setTree(data);
            const found = findInTree(data, user.id);
            if (found) {
                setMyNode(found.node);
                setAncestors(found.ancestors);
            } else {
                setMyNode(null);
                setAncestors([]);
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, [token, canView, user?.id]);

    useEffect(() => {
        fetchHierarchy();
    }, [fetchHierarchy]);

    // When drillId or tree changes, find the drill node
    useEffect(() => {
        if (!drillId || !tree) {
            setDrillNode(null);
            setDrillAncestors([]);
            return;
        }
        const found = findInTree(tree, drillId);
        if (found) {
            setDrillNode(found.node);
            setDrillAncestors(found.ancestors);
        } else {
            setDrillNode(null);
            setDrillAncestors([]);
        }
    }, [drillId, tree]);

    const navigate = (id) => router.push(`/organisation?mid=${id}`);
    const navigateHome = () => router.push("/organisation");

    if (!token) return null;

    const roleConfig = ROLE_CONFIG[user?.roles] ?? null;
    const RoleIcon = roleConfig?.icon ?? Users;

    // ── Loading ──────────────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e8f5f3] pt-20 pb-12 px-4">
                <div className="max-w-2xl mx-auto space-y-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white rounded-3xl h-24 animate-pulse shadow-sm" />
                    ))}
                </div>
            </div>
        );
    }

    // ── Non-hierarchy roles ──────────────────────────────────────────────────
    if (!canView) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e8f5f3] pt-20 pb-12 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
                        <Network className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-[#354B62] mb-2">Not Available</h2>
                        <p className="text-gray-400 text-sm">
                            Organisation hierarchy is only available for franchise partners.
                        </p>
                        <button
                            onClick={() => router.push("/profile")}
                            className="mt-6 text-[#27A395] font-semibold text-sm hover:underline"
                        >
                            ← Back to Profile
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Error ────────────────────────────────────────────────────────────────
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e8f5f3] pt-20 pb-12 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                        <button onClick={fetchHierarchy} className="text-[#27A395] font-semibold text-sm hover:underline">
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ════════════════════════════════════════════════════════════════════════
    // DRILL-DOWN VIEW  (?mid=<id>)
    // ════════════════════════════════════════════════════════════════════════
    if (drillId) {
        if (!drillNode) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e8f5f3] pt-20 pb-12 px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
                            <Network className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-400 text-sm mb-4">Member not found in hierarchy.</p>
                            <button onClick={navigateHome} className="text-[#27A395] font-semibold text-sm hover:underline">
                                ← Back to My Organisation
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        const dCfg = ROLE_CONFIG[drillNode.roles] ?? {};
        const DIcon = dCfg.icon ?? Users;
        const dDirect = drillNode.children?.length ?? 0;
        const dTotal = countDescendants(drillNode);

        return (
            <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e8f5f3] pt-20 pb-12 px-4">
                <div className="max-w-2xl mx-auto space-y-6">

                    {/* Header */}
                    <div className={`bg-gradient-to-br ${dCfg.bg ?? "from-[#27A395] to-[#33A8D3]"} rounded-3xl shadow-xl p-6 text-white`}>
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <DIcon className="w-7 h-7 text-white" />
                            </div>
                            <div className="min-w-0">
                                <h1 className="text-xl font-bold truncate">{drillNode.name}</h1>
                                <p className="text-white/70 text-sm mt-0.5 truncate">{drillNode.email}</p>
                                {drillNode.organizationname && (
                                    <p className="text-white/60 text-xs mt-0.5 truncate">{drillNode.organizationname}</p>
                                )}
                            </div>
                        </div>
                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <div className="bg-white/15 rounded-2xl p-3 text-center">
                                <p className="text-2xl font-bold">{dDirect}</p>
                                <p className="text-white/70 text-xs font-medium mt-0.5">Direct Reports</p>
                            </div>
                            <div className="bg-white/15 rounded-2xl p-3 text-center">
                                <p className="text-2xl font-bold">{dTotal}</p>
                                <p className="text-white/70 text-xs font-medium mt-0.5">Total Network</p>
                            </div>
                        </div>
                    </div>

                    {/* Breadcrumb */}
                    {drillAncestors.length > 0 && (
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="px-6 pt-5 pb-3 border-b border-gray-100">
                                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Upline</h2>
                            </div>
                            <div className="px-6 py-5 flex flex-wrap items-center gap-2">
                                <button onClick={navigateHome} className="flex items-center gap-1 text-xs font-semibold text-[#27A395] hover:underline">
                                    <Network className="w-3.5 h-3.5" />
                                    My Org
                                </button>
                                {drillAncestors.map((ancestor) => {
                                    const anCfg = ROLE_CONFIG[ancestor.roles] ?? {};
                                    return (
                                        <span key={ancestor.id} className="flex items-center gap-2">
                                            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                                            <button
                                                onClick={() => navigate(ancestor.id)}
                                                className="flex items-center gap-1 text-xs font-semibold text-[#354B62] hover:text-[#27A395] transition-colors"
                                            >
                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${anCfg.badge ?? "bg-gray-100 text-gray-600"}`}>
                                                    {anCfg.shortLabel ?? ancestor.roles}
                                                </span>
                                                {ancestor.name}
                                            </button>
                                        </span>
                                    );
                                })}
                                <span className="flex items-center gap-2">
                                    <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                                    <span className="text-xs font-bold text-gray-500">{drillNode.name}</span>
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Direct reports */}
                    {dDirect > 0 ? (
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="px-6 pt-5 pb-3 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Direct Reports</h2>
                                <span className="text-xs font-bold text-[#27A395] bg-[#27A395]/10 px-2 py-0.5 rounded-full">{dDirect}</span>
                            </div>
                            <div className="px-6 py-5 space-y-3">
                                {drillNode.children.map((child) => (
                                    <MemberCard
                                        key={child.id}
                                        member={child}
                                        onClick={child.children?.length > 0 ? () => navigate(child.id) : undefined}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="px-6 pt-5 pb-3 border-b border-gray-100">
                                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Direct Reports</h2>
                            </div>
                            <div className="px-6 py-10 text-center">
                                <UserCheck className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                                <p className="font-semibold text-[#354B62] mb-1">No direct reports</p>
                                <p className="text-gray-400 text-sm">This member has no downline yet.</p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        );
    }

    // ════════════════════════════════════════════════════════════════════════
    // HOME VIEW  (/organisation)
    // ════════════════════════════════════════════════════════════════════════
    const directCount = myNode?.children?.length ?? 0;
    const totalNetwork = myNode ? countDescendants(myNode) : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e8f5f3] pt-20 pb-12 px-4">
            <div className="max-w-2xl mx-auto space-y-6">

                {/* Header */}
                <div
                    className={`bg-gradient-to-br ${roleConfig?.bg ?? "from-[#27A395] to-[#33A8D3]"} rounded-3xl shadow-xl p-6 text-white`}
                >
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Network className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">My Organisation</h1>
                            <p className="text-white/70 text-sm mt-0.5">
                                Your position in the ClaimTrue network
                            </p>
                        </div>
                    </div>
                </div>

                {/* Your Position */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="px-6 pt-5 pb-3 border-b border-gray-100">
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Your Position
                        </h2>
                    </div>
                    <div className="px-6 py-5">
                        <div className="flex items-center gap-4">
                            <div
                                className={`w-14 h-14 bg-gradient-to-br ${roleConfig?.bg ?? "from-[#27A395] to-[#33A8D3]"} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md`}
                            >
                                <RoleIcon className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-[#354B62] text-lg truncate">{user?.name ?? "—"}</p>
                                <p className="text-gray-400 text-sm truncate">{user?.email}</p>
                                {user?.organizationname && (
                                    <p className="text-[#27A395] text-sm font-medium mt-0.5 truncate">
                                        {user.organizationname}
                                    </p>
                                )}
                            </div>
                            <span
                                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${roleConfig?.badge ?? "bg-gray-100 text-gray-600"}`}
                            >
                                {user?.roles}
                            </span>
                        </div>

                        {myNode && (
                            <div className="mt-5 grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 rounded-2xl p-4">
                                    <p className="text-2xl font-bold text-[#354B62]">{directCount}</p>
                                    <p className="text-xs text-gray-400 font-medium mt-0.5">Direct Reports</p>
                                </div>
                                <div className="bg-gray-50 rounded-2xl p-4">
                                    <p className="text-2xl font-bold text-[#354B62]">{totalNetwork}</p>
                                    <p className="text-xs text-gray-400 font-medium mt-0.5">Total Network</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Upline chain */}
                {ancestors.length > 0 && (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="px-6 pt-5 pb-3 border-b border-gray-100">
                            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Your Upline
                            </h2>
                        </div>
                        <div className="px-6 py-5 space-y-2">
                            {ancestors.map((ancestor, idx) => (
                                <div key={ancestor.id} className="flex items-start gap-2">
                                    <div className="flex flex-col items-center pt-4" style={{ width: 20 }}>
                                        {idx > 0 && <div className="w-0.5 h-3 bg-gray-200 -mt-3" />}
                                        <div className="w-2 h-2 rounded-full bg-gray-300 flex-shrink-0" />
                                        <div className="w-0.5 flex-1 bg-gray-200 mt-0.5" />
                                    </div>
                                    <div className="flex-1 pb-1">
                                        <MemberCard member={ancestor} />
                                    </div>
                                </div>
                            ))}
                            <div className="flex items-center gap-2 pl-2">
                                <div className="flex flex-col items-center" style={{ width: 20 }}>
                                    <div className="w-0.5 h-3 bg-gray-200" />
                                    <ChevronRight className="w-4 h-4 text-[#27A395] -ml-0.5" />
                                </div>
                                <span className="text-sm font-bold text-[#27A395]">You</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Not linked in tree yet */}
                {!myNode && (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
                        <TrendingUp className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                        <p className="font-semibold text-[#354B62] mb-1">Not yet linked in the hierarchy</p>
                        <p className="text-gray-400 text-sm">
                            Once a referee record is created for your account, your organisation position will
                            appear here.
                        </p>
                    </div>
                )}

                {/* Downline */}
                {myNode && directCount > 0 && (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="px-6 pt-5 pb-3 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Your Network
                            </h2>
                            <span className="text-xs font-bold text-[#27A395] bg-[#27A395]/10 px-2 py-0.5 rounded-full">
                                {directCount} direct
                            </span>
                        </div>
                        <div className="px-6 py-5 space-y-3">
                            {myNode.children.map((child) => (
                                <MemberCard
                                    key={child.id}
                                    member={child}
                                    onClick={child.children?.length > 0 ? () => navigate(child.id) : undefined}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* No downline yet */}
                {myNode && directCount === 0 && (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="px-6 pt-5 pb-3 border-b border-gray-100">
                            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Your Network
                            </h2>
                        </div>
                        <div className="px-6 py-10 text-center">
                            <UserCheck className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                            <p className="font-semibold text-[#354B62] mb-1">No direct reports yet</p>
                            <p className="text-gray-400 text-sm">
                                Use Referrals to invite people to your network.
                            </p>
                            <button
                                onClick={() => router.push("/referrals")}
                                className="mt-4 bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-md transition-all"
                            >
                                Go to Referrals
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

// ── Page shell with Suspense boundary (required for useSearchParams in static export) ─
export default function OrganisationPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#e8f5f3] pt-20 pb-12 px-4">
                    <div className="max-w-2xl mx-auto space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-3xl h-24 animate-pulse shadow-sm" />
                        ))}
                    </div>
                </div>
            }
        >
            <OrganisationContent />
        </Suspense>
    );
}
