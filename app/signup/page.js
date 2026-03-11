"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building,
  ArrowLeft,
  Zap,
  TrendingUp,
  Database,
  Shield,
  CheckCircle,
} from "lucide-react";
import { API_BASE_URL, API_ENDPOINTS } from "../lib/constants";
import useAuthStore from "../lib/authstore";
import { decodeInvite } from "../lib/utils";

// Floating animation keyframes (Tailwind-compatible)
const floatingKeyframes = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
`;

function SignupPageContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [razorpayDetails, setRazorpayDetails] = useState(null);
  const [paymentConfig, setPaymentConfig] = useState({});

  const searchParams = useSearchParams();
  const rawInvite = searchParams.get("invite");

  let inviteEmail = "";
  let inviteRole = "";
  let inviteName = "";
  let inviteOrgName = "";
  let inviteOrgType = "";
  let isInviteLink = false;

  if (rawInvite) {
    const decoded = decodeInvite(rawInvite);
    if (decoded) {
      inviteEmail = decoded.email;
      inviteRole = decoded.role;
      inviteName = decoded.name || "";
      inviteOrgName = decoded.organizationname || "";
      inviteOrgType = decoded.organizationtype || "";
      isInviteLink = true;
    }
  }

  const [formData, setFormData] = useState({
    name: inviteName,
    email: inviteEmail,
    organizationname: inviteOrgName,
    organizationtype: inviteOrgType,
    roles: inviteRole,
    password: "",
    agreeToTerms: false,
  });

  const router = useRouter();
  const { setAuth } = useAuthStore();

  // Fetch role-based prices from the backend whenever step 3 is reached
  useEffect(() => {
    if (currentStep === 3 && Object.keys(paymentConfig).length === 0) {
      fetch(`${API_BASE_URL}/auth/payment-config`)
        .then((r) => r.json())
        .then((data) => setPaymentConfig(data))
        .catch(() => { });
    }
  }, [currentStep]);

  // --------------------------------------------------------------
  // Form handling
  // --------------------------------------------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateStep1 = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.organizationname.trim() !== "" &&
      formData.organizationtype.trim() !== "" &&
      formData.roles.trim() !== ""
    );
  };

  const handleContinue = () => {
    if (validateStep1()) setCurrentStep(2);
    else alert("Please fill in all required fields correctly.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!razorpayDetails) {
      alert("Please complete the payment to proceed.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        organizationname: formData.organizationname.trim(),
        organizationtype: formData.organizationtype.trim(),
        roles: formData.roles,
        ...razorpayDetails
      };

      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SIGNUP}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      if (data.access_token) {
        const userData = {
          name: payload.name,
          email: payload.email,
          organizationname: payload.organizationname,
          roles: payload.roles,
        };
        setAuth(userData, data.access_token);
      }

      // SUCCESS → SHOW MODAL
      setIsLoading(false);
      setShowSuccessModal(true);

      // Auto redirect after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (error) {
      console.error("Signup error:", error);
      alert(error.message);
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CREATE_PAYMENT_ORDER}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: formData.roles }),
      });
      const order = await response.json();

      if (!order || !order.id) {
        throw new Error("Failed to initialize payment");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_YourTestKeyHere",
        amount: order.amount,
        currency: order.currency,
        name: "ClaimTrue",
        description: "Registration Fee",
        order_id: order.id,
        handler: function (response) {
          setRazorpayDetails({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
          });
        },
        prefill: {
          name: formData.name,
          email: formData.email,
        },
        theme: {
          color: "#27A395",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment initialization failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const organizationTypes = [
    "Hospital",
    "Clinic",
    "Private Practice",
    "Insurance Company",
    "Healthcare Network",
    "Medical Center",
    "Other",
  ];

  const userRoles = [
    { value: "ClaimTrue Corporate", label: "ClaimTrue Corporate" },
    { value: "Branch Franchise", label: "Branch Franchise" },
    { value: "Master Franchise", label: "Master Franchise" },
    { value: "Elite", label: "Elite" },
  ];

  // selectedPrice is derived from the server-fetched paymentConfig — zero hardcoding
  const selectedPrice = paymentConfig[formData.roles] ?? null;

  // --------------------------------------------------------------
  // Render
  // --------------------------------------------------------------
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      {/* Inject floating animation keyframes */}
      <style dangerouslySetInnerHTML={{ __html: floatingKeyframes }} />

      <div className="min-h-screen bg-gradient-to-br from-[#33A8D3] via-[#27A395] to-[#354B62] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="floating-element absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-xl animate-[float_3s_ease-in-out_infinite]"></div>
          <div className="floating-element absolute top-40 left-32 w-24 h-24 bg-white/10 rounded-full blur-lg animate-[float_3s_ease-in-out_infinite_0.5s]"></div>
          <div className="floating-element absolute bottom-32 right-40 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-[float_3s_ease-in-out_infinite_1s]"></div>
          <div className="floating-element absolute bottom-20 left-20 w-28 h-28 bg-white/8 rounded-full blur-xl animate-[float_3s_ease-in-out_infinite_1.5s]"></div>
        </div>

        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full grid lg:grid-cols-2 animate-in fade-in zoom-in duration-700">
          {/* Left Side – Info Panel */}
          <div className="bg-gradient-to-br from-[#354B62] to-[#33A8D3] p-8 lg:p-12 text-white flex flex-col justify-center relative overflow-hidden order-2 lg:order-1">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 space-y-8">
              <div className="animate-in slide-in-from-left duration-600 delay-200">
                <Zap className="w-16 h-16 mb-6 text-white/90" />
                <h2 className="text-3xl font-bold mb-4">
                  Transform Your Healthcare Operations
                </h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  Join thousands of healthcare professionals who trust our
                  platform to streamline their operations and improve patient
                  outcomes.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: TrendingUp, title: "Increase Efficiency", desc: "Boost your claims processing efficiency by up to 40%" },
                  { icon: Database, title: "Comprehensive CMS", desc: "Full-featured content management tailored for healthcare" },
                  { icon: Shield, title: "Enterprise Security", desc: "Bank-level security guaranteed" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start space-x-4 animate-in slide-in-from-left duration-600"
                    style={{ animationDelay: `${300 + i * 150}ms` }}
                  >
                    <div className="bg-white/20 rounded-lg p-2 mt-1">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-white/80">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-white/10 rounded-2xl backdrop-blur-sm animate-in slide-in-from-bottom duration-600 delay-700">
                <p className="text-sm text-white/90 italic">
                  "The signup process was seamless, and we were up and running
                  within hours. The platform has exceeded our expectations."
                </p>
                <div className="mt-3">
                  <p className="font-semibold">Michael Chen, MD</p>
                  <p className="text-white/80 text-sm">
                    Director, Metro Health Systems
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side – Form */}
          <div className="p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2">
            <div className="space-y-8">
              <div className="animate-in slide-in-from-top duration-500">
                <Link
                  href="/"
                  className="inline-flex items-center text-[#354B62] hover:text-[#27A395] transition-colors mb-6 group"
                >
                  <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Link>
                <h1 className="text-4xl font-bold text-[#354B62] mb-3">
                  Create Your Account
                </h1>
                <p className="text-gray-600 text-lg">
                  Start your healthcare management journey today
                </p>
              </div>

              {/* Progress */}
              <div className="animate-in fade-in duration-500 delay-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Account Setup
                  </span>
                  <span className="text-sm font-medium text-[#27A395]">
                    Step {currentStep} of 3
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1 */}
                {currentStep === 1 && (
                  <>
                    <div className="grid grid-cols-1 gap-4 animate-in slide-in-from-bottom duration-500 delay-400">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                          Name
                        </label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#27A395] transition-colors" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={isInviteLink && inviteName ? undefined : handleChange}
                            readOnly={isInviteLink && !!inviteName}
                            className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 text-lg ${
                              isInviteLink && inviteName
                                ? "border-green-200 bg-green-50 cursor-not-allowed opacity-80"
                                : formData.name.trim() === ""
                                  ? "border-gray-200 bg-gray-50 focus:bg-white"
                                  : "border-green-200 bg-gray-50 focus:bg-white"
                            }`}
                            placeholder="Full name"
                            required
                          />
                        </div>
                        {isInviteLink && inviteName && (
                          <p className="text-xs text-[#27A395] font-medium flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Pre-filled from registration
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 animate-in slide-in-from-bottom duration-500 delay-500">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                        Email Address
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#27A395] transition-colors" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={isInviteLink ? undefined : handleChange}
                          readOnly={isInviteLink}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 text-lg bg-gray-50 focus:bg-white ${isInviteLink ? "border-green-200 bg-green-50 cursor-not-allowed opacity-80" : formData.email.trim() === "" ? "border-gray-200" : "border-green-200"}`}
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-in slide-in-from-bottom duration-500 delay-600">
                      <div className="space-y-2">
                        <label htmlFor="organizationname" className="block text-sm font-semibold text-gray-700">
                          Organization Name
                        </label>
                        <div className="relative group">
                          <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#27A395] transition-colors" />
                          <input
                            type="text"
                            id="organizationname"
                            name="organizationname"
                            value={formData.organizationname}
                            onChange={isInviteLink && inviteOrgName ? undefined : handleChange}
                            readOnly={isInviteLink && !!inviteOrgName}
                            className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 text-lg ${
                              isInviteLink && inviteOrgName
                                ? "border-green-200 bg-green-50 cursor-not-allowed opacity-80"
                                : formData.organizationname.trim() === ""
                                  ? "border-gray-200 bg-gray-50 focus:bg-white"
                                  : "border-green-200 bg-gray-50 focus:bg-white"
                            }`}
                            placeholder="Your healthcare organization"
                            required
                          />
                        </div>
                        {isInviteLink && inviteOrgName && (
                          <p className="text-xs text-[#27A395] font-medium flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Pre-filled from registration
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="organizationtype" className="block text-sm font-semibold text-gray-700">
                          Organization Type
                        </label>
                        <select
                          id="organizationtype"
                          name="organizationtype"
                          value={formData.organizationtype}
                          onChange={isInviteLink && inviteOrgType ? undefined : handleChange}
                          disabled={isInviteLink && !!inviteOrgType}
                          className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 text-lg ${
                            isInviteLink && inviteOrgType
                              ? "border-green-200 bg-green-50 cursor-not-allowed opacity-80"
                              : formData.organizationtype === ""
                                ? "border-gray-200 bg-gray-50 focus:bg-white"
                                : "border-green-200 bg-gray-50 focus:bg-white"
                          }`}
                          required
                        >
                          <option value="">Select type</option>
                          {organizationTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {isInviteLink && inviteOrgType && (
                          <p className="text-xs text-[#27A395] font-medium flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Pre-filled from registration
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 animate-in slide-in-from-bottom duration-500 delay-650">
                      <label htmlFor="roles" className="block text-sm font-semibold text-gray-700">
                        Your Role
                      </label>
                      <select
                        id="roles"
                        name="roles"
                        value={formData.roles}
                        onChange={isInviteLink ? undefined : handleChange}
                        disabled={isInviteLink}
                        className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 text-lg bg-gray-50 focus:bg-white ${isInviteLink ? "border-green-200 bg-green-50 cursor-not-allowed opacity-80" : formData.roles === "" ? "border-gray-200" : "border-green-200"}`}
                        required
                      >
                        <option value="">Select your role</option>
                        {userRoles.map((role) => (
                          <option key={role.value} value={role.value}>
                            {role.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={handleContinue}
                      disabled={!validateStep1()}
                      className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:shadow-lg animate-in fade-in duration-500 delay-700 ${validateStep1()
                        ? "bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white hover:from-[#33A8D3] hover:to-[#27A395] hover:scale-105"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                      Continue to Security Setup
                    </button>
                  </>
                )}

                {/* Step 2 */}
                {currentStep === 2 && (
                  <>
                    <div className="space-y-2 animate-in slide-in-from-bottom duration-500">
                      <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                        Create Password
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#27A395] transition-colors" />
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 text-lg bg-gray-50 focus:bg-white"
                          placeholder="Create a strong password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl animate-in fade-in duration-500 delay-200">
                      <h4 className="font-semibold text-gray-700 mb-2">Password Requirements:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 transition-colors ${formData.password.length >= 8 ? "bg-green-500" : "bg-gray-300"
                              }`}
                          ></div>
                          At least 8 characters
                        </li>
                        <li className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 transition-colors ${/[A-Z]/.test(formData.password) ? "bg-green-500" : "bg-gray-300"
                              }`}
                          ></div>
                          One uppercase letter
                        </li>
                        <li className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 transition-colors ${/[0-9]/.test(formData.password) ? "bg-green-500" : "bg-gray-300"
                              }`}
                          ></div>
                          One number
                        </li>
                      </ul>
                    </div>

                    <div className="flex items-start space-x-3 animate-in slide-in-from-bottom duration-500 delay-300">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-[#27A395] focus:ring-[#27A395] focus:ring-2"
                        required
                      />
                      <label htmlFor="agreeToTerms" className="text-gray-600 leading-relaxed">
                        I agree to the{" "}
                        <Link
                          href="/terms-of-service"
                          className="text-[#27A395] hover:text-[#33A8D3] font-semibold transition-colors hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy-policy"
                          className="text-[#27A395] hover:text-[#33A8D3] font-semibold transition-colors hover:underline"
                        >
                          Privacy Policy
                        </Link>
                        . I understand that my data will be processed in accordance with HIPAA regulations.
                      </label>
                    </div>

                    <div className="flex space-x-4 animate-in fade-in duration-500 delay-400">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold text-lg hover:bg-gray-300 transition-all duration-300"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        disabled={formData.password.length < 8 || !formData.agreeToTerms}
                        className="flex-1 bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white py-4 rounded-xl font-semibold text-lg hover:from-[#33A8D3] hover:to-[#27A395] transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </>
                )}

                {/* Step 3 */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
                    <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-100">
                      <h3 className="text-xl font-bold text-[#354B62] mb-1">Registration Fee</h3>
                      <p className="text-sm text-[#27A395] font-medium mb-3">{formData.roles}</p>
                      <p className="text-gray-600 mb-4">
                        A one-time setup fee is required to complete your registration and activate your account.
                      </p>
                      <div className="flex justify-between items-center text-lg font-semibold py-4 border-t-2 border-gray-200">
                        <span>Total amount:</span>
                        <span className="text-[#27A395]">
                          {selectedPrice !== null ? `₹ ${selectedPrice.toLocaleString('en-IN')}.00` : "—"}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold text-lg hover:bg-gray-300 transition-all duration-300"
                      >
                        Back
                      </button>

                      {!razorpayDetails ? (
                        <button
                          type="button"
                          onClick={handlePayment}
                          disabled={isLoading}
                          className="flex-1 bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white py-4 rounded-xl font-semibold text-lg hover:from-[#33A8D3] hover:to-[#27A395] transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {isLoading
                            ? "Processing..."
                            : `Pay ₹${selectedPrice ? selectedPrice.toLocaleString('en-IN') : '...'}`}
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="flex-1 bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {isLoading ? "Creating..." : "Create Account"}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </form>

              {currentStep === 1 && (
                <div className="mt-8 text-center animate-in fade-in duration-500 delay-500">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-[#27A395] hover:text-[#33A8D3] font-semibold transition-colors hover:underline"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SUCCESS POPUP MODAL */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowSuccessModal(false)} />
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Account Created Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Welcome aboard! Redirecting you to login...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] h-2 rounded-full animate-[pulse_1.5s_ease-in-out_infinite]" style={{ width: "100%" }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#27A395] border-t-transparent rounded-full animate-spin" /></div>}>
      <SignupPageContent />
    </Suspense>
  );
}