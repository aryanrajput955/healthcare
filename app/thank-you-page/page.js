"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';



export default function ThankYouPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    let remaining = 10;
    setSeconds(remaining);

    // read and sanitize returnTo
    const params = new URLSearchParams(window.location.search);
    let returnTo = params.get('returnTo') || '/';

    try {
      // decode safely (if it was encoded)
      returnTo = decodeURIComponent(returnTo);
    } catch (e) {
      returnTo = '/';
    }

    // allow only internal paths (start with single slash, no protocol, no double-slash)
    if (!/^\/(?!\/)/.test(returnTo) || /https?:\/\//i.test(returnTo)) {
      returnTo = '/';
    }

    // remove query string from URL so the raw param isn't left visible/indexed
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, '', window.location.pathname);
    }

    const id = setInterval(() => {
      remaining -= 1;
      setSeconds(remaining);
      if (remaining <= 0) {
        clearInterval(id);
        router.push(returnTo);
      }
    }, 1000); // tick every second

    return () => clearInterval(id);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-cyan-600 to-slate-700 text-white flex items-center justify-center p-6">
      <div className="relative w-full max-w-2xl">
        <div className="absolute -inset-1 rounded-3xl bg-white/10 blur-xl"></div>
        <div className="relative rounded-3xl bg-white text-slate-900 shadow-2xl overflow-hidden">
          <div className="px-8 py-10 sm:px-12 sm:py-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Thank you for your submission
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600">We have received your form, and our team will get back to you shortly.</p>
            <div className="mt-5 flex items-center gap-3">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-emerald-600 text-white text-lg font-semibold">
                {seconds}
              </span>
              <p className="text-sm text-slate-500">
                Redirecting in <span className="font-medium text-slate-700">{seconds}</span> seconds…
              </p>
            </div>
            
          </div>

          <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-slate-600" />
        </div>
      </div>
    </div>
  );
}
