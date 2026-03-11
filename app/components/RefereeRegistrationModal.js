"use client";

import { useState, useRef } from "react";
import {
    X,
    ChevronRight,
    ChevronLeft,
    User,
    Briefcase,
    Network,
    DollarSign,
    BookOpen,
    FileCheck,
    Check,
    UserPlus,
    Upload,
    AlertCircle,
    ShieldCheck,
    CheckCircle,
    Copy,
    ClipboardCheck,
    Loader2,
} from "lucide-react";
import { encodeInvite } from "../lib/utils";

// ─── Step metadata ────────────────────────────────────────────────────────────
const STEPS = [
    { id: 1, title: "Basic Information", icon: User },
    { id: 2, title: "Professional Background", icon: Briefcase },
    { id: 3, title: "Network & Market Reach", icon: Network },
    { id: 4, title: "Preferred Earning Model", icon: DollarSign },
    { id: 5, title: "About Company", icon: BookOpen },
    { id: 6, title: "Declaration", icon: FileCheck },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const isEmpty = (v) => v === undefined || v === null || String(v).trim() === "";
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidMobile = (v) => /^[6-9]\d{9}$/.test(v);
const isValidPAN = (v) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v.toUpperCase());
const isValidAadhar = (v) => v === "" || /^\d{12}$/.test(v);

// ─── Field-level validators ───────────────────────────────────────────────────
function validateStep(step, data) {
    const errs = {};

    if (step === 1) {
        if (isEmpty(data.fullName)) errs.fullName = "Full name is required";
        if (isEmpty(data.fatherName)) errs.fatherName = "Father's name is required";
        if (isEmpty(data.dob)) errs.dob = "Date of birth is required";
        if (isEmpty(data.mobile)) errs.mobile = "Mobile number is required";
        else if (!isValidMobile(data.mobile)) errs.mobile = "Enter a valid 10-digit mobile number";
        if (isEmpty(data.whatsapp)) errs.whatsapp = "Please select an option";
        if (isEmpty(data.email)) errs.email = "Email is required";
        else if (!isValidEmail(data.email)) errs.email = "Enter a valid email address";
        if (isEmpty(data.currentAddress)) errs.currentAddress = "Current address is required";
        if (isEmpty(data.permanentAddress)) errs.permanentAddress = "Permanent address is required";
        if (!isEmpty(data.aadhar) && !isValidAadhar(data.aadhar)) errs.aadhar = "Aadhar must be 12 digits";
        // selfie is optional — can be uploaded later
        if (isEmpty(data.pan)) errs.pan = "PAN number is required (mandatory for commission)";
        else if (!isValidPAN(data.pan)) errs.pan = "Enter a valid PAN number (e.g. ABCDE1234F)";
        if (isEmpty(data.bankDetails)) errs.bankDetails = "NEFT / Bank details are required";
    }

    if (step === 2) {
        if (isEmpty(data.occupation)) errs.occupation = "Please select your occupation";
        if (isEmpty(data.hasSalesExp)) errs.hasSalesExp = "Please select an option";
        if (data.hasSalesExp === "Yes" && isEmpty(data.expYears))
            errs.expYears = "Please enter years of experience";
    }

    if (step === 3) {
        if (!data.contacts || data.contacts.length === 0)
            errs.contacts = "Please select at least one option";
    }

    if (step === 4) {
        if (isEmpty(data.earningModel)) errs.earningModel = "Please select a preferred earning model";
    }

    if (step === 5) {
        if (isEmpty(data.hasKnowledge)) errs.hasKnowledge = "Please select an option";
        if (isEmpty(data.whyPartner)) errs.whyPartner = "Please fill in this field";
    }

    if (step === 6) {
        if (isEmpty(data.signature)) errs.signature = "Signature is required";
        if (isEmpty(data.declarationDate)) errs.declarationDate = "Date is required";
    }

    return errs;
}

// ─── Reusable field components ────────────────────────────────────────────────
function FieldWrapper({ label, error, required, children }) {
    return (
        <div className="space-y-1.5" data-error={error ? "true" : undefined}>
            <label className="block text-sm font-semibold text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {children}
            {error && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" /> {error}
                </p>
            )}
        </div>
    );
}

function TextInput({ value, onChange, onBlur, placeholder, type = "text", error, readOnly = false }) {
    return (
        <input
            type={type}
            value={value}
            onChange={readOnly ? undefined : onChange}
            onBlur={readOnly ? undefined : onBlur}
            placeholder={placeholder}
            readOnly={readOnly}
            className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all text-sm ${
                readOnly
                    ? "bg-[#27A395]/5 border-[#27A395]/30 text-gray-600 cursor-not-allowed"
                    : error
                        ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-[#27A395] focus:border-transparent focus:bg-white"
                        : "border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#27A395] focus:border-transparent focus:bg-white"
            }`}
        />
    );
}

function TextArea({ value, onChange, onBlur, placeholder, rows = 3, error }) {
    return (
        <textarea
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={rows}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm resize-none ${error ? "border-red-300 bg-red-50" : "border-gray-200"}`}
        />
    );
}

function RadioGroup({ options, value, onChange, error }) {
    return (
        <div className={`space-y-2 ${error ? "p-3 border-2 border-red-300 rounded-xl bg-red-50" : ""}`}>
            {options.map((opt) => (
                <label
                    key={opt}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border-2 ${value === opt
                        ? "border-[#27A395] bg-[#27A395]/5"
                        : "border-gray-200 bg-gray-50 hover:border-[#27A395]/40"}`}
                >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${value === opt ? "border-[#27A395]" : "border-gray-300"}`}>
                        {value === opt && <div className="w-2 h-2 rounded-full bg-[#27A395]" />}
                    </div>
                    <span className="text-sm text-gray-700">{opt}</span>
                    <input type="radio" className="sr-only" value={opt} checked={value === opt} onChange={() => onChange(opt)} />
                </label>
            ))}
        </div>
    );
}

function CheckboxGroup({ options, values, onChange, error }) {
    const toggle = (opt) => {
        if (opt === "None") {
            onChange(values.includes("None") ? [] : ["None"]);
            return;
        }
        const without = values.filter((v) => v !== "None");
        if (without.includes(opt)) {
            onChange(without.filter((v) => v !== opt));
        } else {
            onChange([...without, opt]);
        }
    };

    return (
        <div className={`space-y-2 ${error ? "p-3 border-2 border-red-300 rounded-xl bg-red-50" : ""}`}>
            {options.map((opt) => {
                const checked = values.includes(opt);
                return (
                    <label
                        key={opt}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border-2 ${checked ? "border-[#27A395] bg-[#27A395]/5" : "border-gray-200 bg-gray-50 hover:border-[#27A395]/40"}`}
                    >
                        <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${checked ? "border-[#27A395] bg-[#27A395]" : "border-gray-300"}`}>
                            {checked && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span className="text-sm text-gray-700">{opt}</span>
                        <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggle(opt)} />
                    </label>
                );
            })}
        </div>
    );
}

// ─── Step components ──────────────────────────────────────────────────────────

function Step1({ data, errors, onChange, onBlur, onFileChange, lockedEmail = false }) {
    return (
        <div className="space-y-5">
            <FieldWrapper label="Full Name" required error={errors.fullName}>
                <TextInput value={data.fullName} onChange={(e) => onChange("fullName", e.target.value)} onBlur={() => onBlur("fullName")} placeholder="Enter your full name" error={errors.fullName} />
            </FieldWrapper>

            <FieldWrapper label="Father's Name" required error={errors.fatherName}>
                <TextInput value={data.fatherName} onChange={(e) => onChange("fatherName", e.target.value)} onBlur={() => onBlur("fatherName")} placeholder="Enter father's name" error={errors.fatherName} />
            </FieldWrapper>

            <FieldWrapper label="Date of Birth" required error={errors.dob}>
                <TextInput type="date" value={data.dob} onChange={(e) => onChange("dob", e.target.value)} onBlur={() => onBlur("dob")} error={errors.dob} />
            </FieldWrapper>

            <FieldWrapper label="Mobile Number" required error={errors.mobile}>
                <TextInput type="tel" value={data.mobile} onChange={(e) => onChange("mobile", e.target.value)} onBlur={() => onBlur("mobile")} placeholder="10-digit mobile number" error={errors.mobile} />
            </FieldWrapper>

            <FieldWrapper label="Is WhatsApp active on this number?" required error={errors.whatsapp}>
                <RadioGroup options={["Yes", "No"]} value={data.whatsapp} onChange={(v) => onChange("whatsapp", v)} error={errors.whatsapp} />
            </FieldWrapper>

            <FieldWrapper
                label="Email ID"
                required
                error={lockedEmail ? undefined : errors.email}
            >
                <TextInput
                    type="email"
                    value={data.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    onBlur={() => onBlur("email")}
                    placeholder="example@email.com"
                    error={lockedEmail ? undefined : errors.email}
                    readOnly={lockedEmail}
                />
                {lockedEmail && (
                    <p className="text-xs text-[#27A395] font-medium mt-1 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Pre-filled from profile
                    </p>
                )}
            </FieldWrapper>

            <FieldWrapper label="Current Address" required error={errors.currentAddress}>
                <TextArea value={data.currentAddress} onChange={(e) => onChange("currentAddress", e.target.value)} onBlur={() => onBlur("currentAddress")} placeholder="Enter your current address" error={errors.currentAddress} />
            </FieldWrapper>

            <FieldWrapper label="Permanent Address" required error={errors.permanentAddress}>
                <TextArea value={data.permanentAddress} onChange={(e) => onChange("permanentAddress", e.target.value)} onBlur={() => onBlur("permanentAddress")} placeholder="Enter your permanent address" error={errors.permanentAddress} />
            </FieldWrapper>

            <FieldWrapper label="Aadhar Number (Optional)" error={errors.aadhar}>
                <TextInput type="text" value={data.aadhar} onChange={(e) => onChange("aadhar", e.target.value)} onBlur={() => onBlur("aadhar")} placeholder="12-digit Aadhar number" error={errors.aadhar} />
            </FieldWrapper>

            <FieldWrapper label="Selfie Upload (Optional)" error={errors.selfie}>
                <SelfieUpload value={data.selfie} onChange={onFileChange} error={errors.selfie} />
            </FieldWrapper>

            <FieldWrapper label="PAN Number (Mandatory – for commission purpose)" required error={errors.pan}>
                <TextInput
                    value={data.pan}
                    onChange={(e) => onChange("pan", e.target.value.toUpperCase())}
                    onBlur={() => onBlur("pan")}
                    placeholder="e.g. ABCDE1234F"
                    error={errors.pan}
                />
            </FieldWrapper>

            <FieldWrapper label="NEFT / Bank Details" required error={errors.bankDetails}>
                <TextArea value={data.bankDetails} onChange={(e) => onChange("bankDetails", e.target.value)} onBlur={() => onBlur("bankDetails")} placeholder="Account number, IFSC code, Bank name, Branch" rows={4} error={errors.bankDetails} />
            </FieldWrapper>
        </div>
    );
}

function SelfieUpload({ value, onChange, error }) {
    const inputRef = useRef(null);
    return (
        <div
            onClick={() => inputRef.current?.click()}
            className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all ${error ? "border-red-400 bg-red-50" : value ? "border-[#27A395] bg-[#27A395]/5" : "border-gray-300 bg-gray-50 hover:border-[#27A395]/70 hover:bg-[#27A395]/5"}`}
        >
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                capture="user"
                className="sr-only"
                onChange={onChange}
            />
            {value ? (
                <div className="flex flex-col items-center gap-2">
                    <img
                        src={URL.createObjectURL(value)}
                        alt="Selfie preview"
                        className="w-20 h-20 rounded-full object-cover border-4 border-[#27A395] shadow"
                    />
                    <p className="text-xs text-[#27A395] font-semibold">{value.name}</p>
                    <p className="text-xs text-gray-400">Click to change</p>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                    <Upload className="w-8 h-8" />
                    <p className="text-sm font-medium">Click to upload selfie</p>
                    <p className="text-xs">JPG, PNG or WEBP accepted</p>
                </div>
            )}
        </div>
    );
}

function Step2({ data, errors, onChange }) {
    const occupations = ["Job", "Business", "Insurance Advisor", "Medical / Hospital related", "Freelancer", "Other"];
    return (
        <div className="space-y-5">
            <FieldWrapper label="Current Occupation" required error={errors.occupation}>
                <RadioGroup options={occupations} value={data.occupation} onChange={(v) => onChange("occupation", v)} error={errors.occupation} />
            </FieldWrapper>

            <FieldWrapper label="Do you have experience in sales, insurance, or hospital field?" required error={errors.hasSalesExp}>
                <RadioGroup options={["Yes", "No"]} value={data.hasSalesExp} onChange={(v) => onChange("hasSalesExp", v)} error={errors.hasSalesExp} />
            </FieldWrapper>

            {data.hasSalesExp === "Yes" && (
                <FieldWrapper label="If Yes, how many years of experience do you have?" required error={errors.expYears}>
                    <TextInput
                        type="number"
                        value={data.expYears}
                        onChange={(e) => onChange("expYears", e.target.value)}
                        placeholder="e.g. 3"
                        error={errors.expYears}
                    />
                </FieldWrapper>
            )}
        </div>
    );
}

function Step3({ data, errors, onChange }) {
    const contactOptions = ["Hospital staff", "Insurance agent", "CA / Lawyer", "Corporate HR", "Medical store", "None"];
    return (
        <div className="space-y-5">
            <FieldWrapper label="Do you have contacts in the following?" required error={errors.contacts}>
                <CheckboxGroup
                    options={contactOptions}
                    values={data.contacts || []}
                    onChange={(v) => onChange("contacts", v)}
                    error={errors.contacts}
                />
            </FieldWrapper>
        </div>
    );
}

function Step4({ data, errors, onChange }) {
    const models = ["Pure Commission", "Commission + Incentive", "Revenue Sharing", "Fixed + Commission"];
    return (
        <div className="space-y-5">
            <FieldWrapper label="What is your preferred earning model?" required error={errors.earningModel}>
                <RadioGroup options={models} value={data.earningModel} onChange={(v) => onChange("earningModel", v)} error={errors.earningModel} />
            </FieldWrapper>
        </div>
    );
}

function Step5({ data, errors, onChange, onBlur }) {
    return (
        <div className="space-y-5">
            <FieldWrapper label="Do you have complete knowledge about our services?" required error={errors.hasKnowledge}>
                <RadioGroup options={["Yes", "No"]} value={data.hasKnowledge} onChange={(v) => onChange("hasKnowledge", v)} error={errors.hasKnowledge} />
            </FieldWrapper>

            <FieldWrapper label="Why do you want to become an Associate Partner?" required error={errors.whyPartner}>
                <TextArea
                    value={data.whyPartner}
                    onChange={(e) => onChange("whyPartner", e.target.value)}
                    onBlur={() => onBlur("whyPartner")}
                    placeholder="Describe your motivation..."
                    rows={5}
                    error={errors.whyPartner}
                />
            </FieldWrapper>
        </div>
    );
}

function Step6({ data, errors, onChange, onBlur }) {
    return (
        <div className="space-y-6">
            {/* Declaration box */}
            <div className="bg-gradient-to-br from-[#27A395]/10 to-[#33A8D3]/10 border border-[#27A395]/30 rounded-2xl p-5">
                <p className="text-sm text-gray-700 leading-relaxed italic">
                    &ldquo;I confirm that the information provided by me is correct and I agree to work as
                    an Associate Partner with ClaimTrue under the company&apos;s policies and terms.&rdquo;
                </p>
            </div>

            <FieldWrapper label="Signature (Type your full name as digital signature)" required error={errors.signature}>
                <TextInput
                    value={data.signature}
                    onChange={(e) => onChange("signature", e.target.value)}
                    onBlur={() => onBlur("signature")}
                    placeholder="Type your full name"
                    error={errors.signature}
                />
            </FieldWrapper>

            <FieldWrapper label="Date" required error={errors.declarationDate}>
                <TextInput
                    type="date"
                    value={data.declarationDate}
                    onChange={(e) => onChange("declarationDate", e.target.value)}
                    onBlur={() => onBlur("declarationDate")}
                    error={errors.declarationDate}
                />
            </FieldWrapper>
        </div>
    );
}

// ─── Initial form data ────────────────────────────────────────────────────────
const INITIAL_DATA = {
    // Step 1
    fullName: "", fatherName: "", dob: "", mobile: "", whatsapp: "",
    email: "", currentAddress: "", permanentAddress: "", aadhar: "",
    selfie: null, pan: "", bankDetails: "",
    // Step 2
    occupation: "", hasSalesExp: "", expYears: "",
    // Step 3
    contacts: [],
    // Step 4
    earningModel: "",
    // Step 5
    hasKnowledge: "", whyPartner: "",
    // Step 6
    signature: "", declarationDate: "",
};

// ─── Main Modal ───────────────────────────────────────────────────────────────
export default function RefereeRegistrationModal({ isOpen, onClose, onAddReferee, initialEmail = "", initialRole = "" }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({ ...INITIAL_DATA, email: initialEmail });
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successLink, setSuccessLink] = useState(null);
    const [copied, setCopied] = useState(false);
    const scrollRef = useRef(null);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) handleClose();
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (touchedFields[field]) {
            // Re-validate only the changed field inline
            const errs = validateStep(currentStep, { ...formData, [field]: value });
            setErrors((prev) => ({ ...prev, [field]: errs[field] }));
        }
    };

    const handleBlur = (field) => {
        setTouchedFields((prev) => ({ ...prev, [field]: true }));
        const errs = validateStep(currentStep, formData);
        setErrors((prev) => ({ ...prev, [field]: errs[field] }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, selfie: file }));
        setErrors((prev) => ({ ...prev, selfie: file ? undefined : "Please upload a selfie" }));
    };

    const scrollToTop = () => {
        setTimeout(() => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" }), 50);
    };

    const scrollToFirstError = () => {
        setTimeout(() => {
            if (!scrollRef.current) return;
            const firstError = scrollRef.current.querySelector('[data-error="true"]');
            if (firstError) {
                // Scroll within the modal's own scroll container (scrollIntoView scrolls the viewport, not the container)
                const containerRect = scrollRef.current.getBoundingClientRect();
                const elementRect = firstError.getBoundingClientRect();
                const offset = elementRect.top - containerRect.top + scrollRef.current.scrollTop - 24;
                scrollRef.current.scrollTo({ top: offset, behavior: "smooth" });
            }
        }, 80);
    };

    const handleNext = () => {
        const stepErrors = validateStep(currentStep, formData);
        if (Object.keys(stepErrors).length > 0) {
            setErrors(stepErrors);
            // Mark all fields in this step as touched
            const allTouched = Object.keys(stepErrors).reduce((acc, k) => ({ ...acc, [k]: true }), {});
            setTouchedFields((prev) => ({ ...prev, ...allTouched }));
            scrollToFirstError();
            return;
        }
        setErrors({});
        setCurrentStep((s) => Math.min(s + 1, STEPS.length));
        scrollToTop();
    };

    const handleBack = () => {
        setErrors({});
        setCurrentStep((s) => Math.max(s - 1, 1));
        scrollToTop();
    };

    const handleAddReferee = async () => {
        const stepErrors = validateStep(currentStep, formData);
        if (Object.keys(stepErrors).length > 0) {
            setErrors(stepErrors);
            const allTouched = Object.keys(stepErrors).reduce((acc, k) => ({ ...acc, [k]: true }), {});
            setTouchedFields((prev) => ({ ...prev, ...allTouched }));
            return;
        }

        setIsSubmitting(true);
        try {
            await onAddReferee?.({ ...formData, assignedRole: initialRole });

            // Build the invite link using the registrant's details
            const token = encodeInvite({
                email: formData.email,
                role: initialRole,
                name: formData.fullName,
                organizationname: "",
                organizationtype: "",
            });
            const origin = typeof window !== "undefined" ? window.location.origin : "";
            const link = `${origin}/signup?invite=${token}`;
            setSuccessLink(link);
        } catch (err) {
            console.error("Referee submission failed:", err);
            setErrors({ _submit: err?.message || "Submission failed. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCopyLink = async () => {
        if (!successLink) return;
        try {
            await navigator.clipboard.writeText(successLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            // Fallback for older browsers
            const el = document.createElement("textarea");
            el.value = successLink;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    const handleClose = () => {
        // Reset all state then close
        setFormData({ ...INITIAL_DATA, email: initialEmail });
        setCurrentStep(1);
        setErrors({});
        setTouchedFields({});
        setIsSubmitting(false);
        setSuccessLink(null);
        setCopied(false);
        onClose();
    };

    const StepIcon = STEPS[currentStep - 1].icon;

    // ── Success view ──────────────────────────────────────────────────────────
    if (successLink) {
        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                style={{ backgroundColor: "rgba(53,75,98,0.55)", backdropFilter: "blur(4px)" }}
            >
                <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
                    {/* Success header */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 pt-8 pb-6 text-white text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-9 h-9 text-white" />
                        </div>
                        <h2 className="text-xl font-bold leading-tight">
                            The user <span className="underline underline-offset-2">{formData.fullName}</span> has been registered
                        </h2>
                        <p className="text-white/80 text-sm mt-1.5">
                            Share the signup link below with the registrant.
                        </p>
                    </div>

                    {/* Link section */}
                    <div className="px-6 py-6 space-y-4">
                        <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Signup Link</p>
                            <div className="flex items-center gap-2 p-3 bg-gray-50 border-2 border-gray-200 rounded-xl">
                                <p className="flex-1 text-sm text-gray-700 break-all font-mono select-all">
                                    {successLink}
                                </p>
                            </div>
                            <p className="text-xs text-gray-400">
                                This link pre-fills the signup form with the registrant&apos;s details. Fields are locked and cannot be changed.
                            </p>
                        </div>

                        <button
                            onClick={handleCopyLink}
                            className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                                copied
                                    ? "bg-green-500 text-white shadow-md"
                                    : "bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white hover:from-[#33A8D3] hover:to-[#27A395] hover:shadow-lg hover:scale-[1.01]"
                            }`}
                        >
                            {copied
                                ? <><ClipboardCheck className="w-4 h-4" /> Copied!</>
                                : <><Copy className="w-4 h-4" /> Copy Signup Link</>}
                        </button>

                        <button
                            onClick={handleClose}
                            className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-[#27A395] hover:text-[#27A395] transition-all"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(53,75,98,0.55)", backdropFilter: "blur(4px)" }}
            onClick={handleOverlayClick}
        >
            <div
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden"
                style={{ maxHeight: "92vh" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* ── Header ── */}
                <div className="flex-shrink-0 bg-gradient-to-r from-[#27A395] to-[#33A8D3] px-6 pt-6 pb-5">
                    <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                            <h2 className="text-xl font-bold text-white leading-tight">
                                ClaimTrue Associate Partner
                                <br />Registration Form
                            </h2>
                            <p className="text-white/75 text-xs mt-1.5 leading-relaxed">
                                Please fill out this form to apply as an Associate Partner with ClaimTrue.
                            </p>
                            {initialRole && (
                                <div className="inline-flex items-center gap-1.5 mt-2 bg-white/20 text-white px-2.5 py-1 rounded-full">
                                    <ShieldCheck className="w-3 h-3" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{initialRole}</span>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors flex-shrink-0"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Step progress */}
                    <div className="mt-5">
                        {/* Step dots */}
                        <div className="flex items-center justify-between relative">
                            {/* connector line */}
                            <div className="absolute top-3.5 left-3.5 right-3.5 h-0.5 bg-white/25" />
                            <div
                                className="absolute top-3.5 left-3.5 h-0.5 bg-white transition-all duration-500"
                                style={{ width: `calc(${((currentStep - 1) / (STEPS.length - 1)) * 100}% - 0px)` }}
                            />
                            {STEPS.map(({ id, icon: Icon }) => (
                                <div
                                    key={id}
                                    className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${id < currentStep
                                        ? "bg-white border-white"
                                        : id === currentStep
                                            ? "bg-white border-white scale-110 shadow-lg"
                                            : "bg-white/20 border-white/40"
                                        }`}
                                >
                                    {id < currentStep ? (
                                        <Check className="w-3 h-3 text-[#27A395]" />
                                    ) : (
                                        <Icon className={`w-3 h-3 ${id === currentStep ? "text-[#27A395]" : "text-white/60"}`} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* step label */}
                        <p className="text-center text-white text-xs font-semibold mt-3 tracking-wide">
                            Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}
                        </p>
                    </div>
                </div>

                {/* ── Scrollable body ── */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
                    {/* Section header */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 bg-gradient-to-br from-[#27A395]/15 to-[#33A8D3]/15 rounded-xl flex items-center justify-center flex-shrink-0">
                            <StepIcon className="w-5 h-5 text-[#27A395]" />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#354B62] text-base">{STEPS[currentStep - 1].title}</h3>
                            <p className="text-xs text-gray-400">Fields marked <span className="text-red-500">*</span> are required</p>
                        </div>
                    </div>

                    {currentStep === 1 && <Step1 data={formData} errors={errors} onChange={handleChange} onBlur={handleBlur} onFileChange={handleFileChange} lockedEmail={!!initialEmail} />}
                    {currentStep === 2 && <Step2 data={formData} errors={errors} onChange={handleChange} />}
                    {currentStep === 3 && <Step3 data={formData} errors={errors} onChange={handleChange} />}
                    {currentStep === 4 && <Step4 data={formData} errors={errors} onChange={handleChange} />}
                    {currentStep === 5 && <Step5 data={formData} errors={errors} onChange={handleChange} onBlur={handleBlur} />}
                    {currentStep === 6 && <Step6 data={formData} errors={errors} onChange={handleChange} onBlur={handleBlur} />}
                </div>

                {/* ── Footer navigation ── */}
                <div className="flex-shrink-0 border-t border-gray-100 px-6 py-4 bg-white space-y-3">
                    {/* Error summary — only show real (non-undefined) errors */}
                    {(() => {
                        const fieldErrors = Object.entries(errors).filter(([k, v]) => k !== "_submit" && v);
                        if (fieldErrors.length === 0 && !errors._submit) return null;
                        return (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                <p className="text-xs text-red-600 font-medium">
                                    {errors._submit
                                        ? errors._submit
                                        : `${fieldErrors.length} field${fieldErrors.length > 1 ? "s" : ""} need${fieldErrors.length === 1 ? "s" : ""} attention — please scroll up to review`}
                                </p>
                            </div>
                        );
                    })()}
                    <div className="flex items-center justify-between gap-3">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 1 || isSubmitting}
                            className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-[#27A395] hover:text-[#27A395] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-600"
                        >
                            <ChevronLeft className="w-4 h-4" /> Back
                        </button>

                        {currentStep < STEPS.length ? (
                            <button
                                onClick={handleNext}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white font-semibold text-sm hover:from-[#33A8D3] hover:to-[#27A395] hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                Next <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleAddReferee}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white font-semibold text-sm hover:from-[#33A8D3] hover:to-[#27A395] hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isSubmitting
                                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                                    : <><UserPlus className="w-4 h-4" /> Add Referee</>}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
