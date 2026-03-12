'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, CheckCircle, AlertCircle, X } from 'lucide-react';
import { API_BASE_URL } from '../../../lib/constants';
import useAuthStore from '../../../lib/authstore';

const WORK_LOG_TYPES = [
  { value: 'STATUS_CHANGE', label: 'Status Change' },
  { value: 'FILE_UPLOAD', label: 'File Upload' },
  { value: 'ADMIN_NOTE', label: 'Admin Note' },
  { value: 'HOSPITAL_UPDATE', label: 'Hospital Update' },
];

function CreateWorkLogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const journeyId = searchParams.get('id');
  const { token } = useAuthStore();
  const authToken = token || (typeof window !== 'undefined' ? localStorage.getItem('auth') : '');

  const [formData, setFormData] = useState({
    logType: '',
    description: '',
    startTime: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Redirect if no journeyId
  useEffect(() => {
    if (!journeyId) router.push('/journey');
  }, [journeyId, router]);

  const validate = (data = formData) => {
    const e = {};
    if (!data.logType) e.logType = 'Log type is required';
    if (data.description && data.description.length > 1000) e.description = 'Max 1000 characters';
    return e;
  };

  const isValid = () => {
    const e = validate();
    return Object.keys(e).length === 0 && formData.logType;
  };

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    const e = validate(updated);
    setErrors(e);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setApiError(null);
    try {
      const payload = {
        userJourneyId: Number(journeyId),
        logType: formData.logType,
      };
      if (formData.description) payload.description = formData.description;
      if (formData.startTime) payload.startTime = new Date(formData.startTime).toISOString();

      const res = await fetch(`${API_BASE_URL}/journey-logs/work`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Request failed (${res.status})`);
      }

      router.push(`/journey/logs?id=${journeyId}`);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ logType: '', description: '', startTime: '' });
    setErrors({});
    setApiError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className="px-4 py-4 flex items-center gap-4"
        style={{ background: 'linear-gradient(135deg, #354B62 0%, #27A395 100%)' }}
      >
        <button onClick={() => router.push(`/journey/logs?id=${journeyId}`)} className="text-white/70 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-white font-bold text-base">Add Work Log</h1>
          <p className="text-white/60 text-xs mt-0.5">Record a manual work activity</p>
        </div>
        {/* Status pill */}
        <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${
          isValid() ? 'bg-green-400/20 text-green-100' : 'bg-amber-400/20 text-amber-100'
        }`}>
          {isValid()
            ? <><CheckCircle className="w-3 h-3" /> Ready</>
            : <><AlertCircle className="w-3 h-3" /> Incomplete</>}
        </span>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Gradient accent line */}
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #27A395, #33A8D3, transparent)' }} />

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Journey ID (read-only) */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Journey ID</label>
              <input
                type="text"
                disabled
                value={journeyId || ''}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 bg-gray-50"
              />
            </div>

            {/* Log Type */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                Log Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {WORK_LOG_TYPES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => handleChange('logType', t.value)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                      formData.logType === t.value
                        ? 'border-[#27A395] bg-[#27A395]/10 text-[#27A395]'
                        : 'border-gray-200 text-gray-600 hover:border-[#27A395]/50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              {errors.logType && <p className="text-xs text-red-500 mt-1">{errors.logType}</p>}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                Description <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                placeholder="Describe the work activity..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-[#27A395] resize-none transition-colors"
              />
              {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
            </div>

            {/* Start Time */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                Start Time <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => handleChange('startTime', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-[#27A395] transition-colors"
              />
            </div>

            {/* API Error */}
            {apiError && (
              <div className="px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {apiError}
                <button type="button" className="ml-auto" onClick={() => setApiError(null)}><X className="w-3.5 h-3.5" /></button>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.push(`/journey/logs?id=${journeyId}`)}
                disabled={submitting}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={submitting}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold border-2 border-cyan-400 text-cyan-600 hover:bg-cyan-400 hover:text-white transition-colors disabled:opacity-50"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={!isValid() || submitting}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #27A395 0%, #33A8D3 100%)' }}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : 'Save Work Log'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CreateWorkLogWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-7 h-7 border-2 border-[#27A395] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CreateWorkLogPage />
    </Suspense>
  );
}
