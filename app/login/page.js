"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  Shield,
  Users,
  Award,
} from "lucide-react";
import useAuthStore from "../lib/authstore";

// Floating animation keyframes
const floatingKeyframes = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
`;

function LoginContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();

  // --------------------------------------------------------------
  // Form handling
  // --------------------------------------------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://api.indiem.tech/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const token = data.access_token;
      if (!token || typeof token !== "string") {
        throw new Error("Invalid token received");
      }

      const userData = {
        name: formData.email.split("@")[0] || formData.email || "User",
        email: formData.email,
      };

      setAuth(userData, token);
      console.log("Login successful:", data);

      // REDIRECT TO /journey
      router.push("/journey");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --------------------------------------------------------------
  // Render
  // --------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#27A395] via-[#33A8D3] to-[#354B62] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Inject keyframes */}
      <style dangerouslySetInnerHTML={{ __html: floatingKeyframes }} />

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="floating-element absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl animate-[float_3s_ease-in-out_infinite]"></div>
        <div className="floating-element absolute top-40 right-32 w-24 h-24 bg-white/10 rounded-full blur-lg animate-[float_3s_ease-in-out_infinite_0.5s]"></div>
        <div className="floating-element absolute bottom-32 left-40 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-[float_3s_ease-in-out_infinite_1s]"></div>
        <div className="floating-element absolute bottom-20 right-20 w-28 h-28 bg-white/8 rounded-full blur-xl animate-[float_3s_ease-in-out_infinite_1.5s]"></div>
      </div>

      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full grid lg:grid-cols-2 animate-in fade-in zoom-in duration-700">
        {/* Left Side – Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
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
                Welcome Back
              </h1>
              <p className="text-gray-600 text-lg">
                Sign in to access your healthcare dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2 animate-in slide-in-from-bottom duration-500 delay-200">
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
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#27A395] focus:border-transparent outline-none transition-all duration-300 text-lg bg-gray-50 focus:bg-white"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2 animate-in slide-in-from-bottom duration-500 delay-300">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Password
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
                    placeholder="Enter your password"
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

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between animate-in fade-in duration-500 delay-400">
                <label className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-2 border-gray-300 text-[#27A395] focus:ring-[#27A395] focus:ring-2"
                  />
                  <span className="ml-3 text-gray-600 group-hover:text-gray-800 transition-colors">
                    Remember me
                  </span>
                </label>
                <Link
                  href="#"
                  className="text-[#27A395] hover:text-[#33A8D3] font-semibold transition-colors hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#27A395] to-[#33A8D3] text-white py-4 rounded-xl font-semibold text-lg hover:from-[#33A8D3] hover:to-[#27A395] transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none animate-in fade-in duration-500 delay-500"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In to Dashboard"
                )}
              </button>
            </form>

            {/* Sign-up link */}
            <div className="mt-8 text-center animate-in fade-in duration-500 delay-600">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-[#27A395] hover:text-[#33A8D3] font-semibold transition-colors hover:underline"
                >
                  Create one now
                </Link>
              </p>
            </div>

            {/* Divider */}
            <div className="mt-8 relative animate-in fade-in duration-500 delay-700">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social buttons */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="w-full cursor-pointer flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hover:scale-105 animate-in slide-in-from-left duration-500 delay-800">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button className="cursor-pointer w-full flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hover:scale-105 animate-in slide-in-from-right duration-500 delay-800">
                <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" fill="#F25022" />
                  <rect x="26" y="2" width="20" height="20" fill="#00A4EF" />
                  <rect x="2" y="26" width="20" height="20" fill="#7FBA00" />
                  <rect x="26" y="26" width="20" height="20" fill="#FFB900" />
                </svg>
                Microsoft
              </button>
            </div>
          </div>
        </div>

        {/* Right Side – Info Panel */}
        <div className="bg-gradient-to-br from-[#354B62] to-[#27A395] p-8 lg:p-12 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 space-y-8">
            <div className="animate-in slide-in-from-left duration-600 delay-200">
              <Shield className="w-16 h-16 mb-6 text-white/90" />
              <h2 className="text-3xl font-bold mb-4">
                Secure Healthcare Management
              </h2>
              <p className="text-white/90 text-lg leading-relaxed">
                Access your comprehensive healthcare management dashboard with
                enterprise-grade security and HIPAA compliance.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Users, title: "Multi-User Access", desc: "Collaborate with your team seamlessly and securely" },
                { icon: Award, title: "Industry Leading", desc: "Trusted by 500+ healthcare providers nationwide" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start space-x-4 animate-in slide-in-from-left duration-600"
                  style={{ animationDelay: `${400 + i * 200}ms` }}
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

            <div className="mt-12 p-6 bg-white/10 rounded-2xl backdrop-blur-sm animate-in slide-in-from-bottom duration-600 delay-700">
              <p className="text-sm text-white/90 italic">
                "This platform has revolutionized our claims processing
                workflow. We've seen a 40% increase in efficiency since
                implementation."
              </p>
              <div className="mt-3">
                <p className="font-semibold">Dr. Sarah Johnson</p>
                <p className="text-white/80 text-sm">
                  Chief Medical Officer, HealthFirst Clinic
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}