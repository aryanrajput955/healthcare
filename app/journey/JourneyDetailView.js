'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Calendar,
  FileText,
  Shield,
  ChevronRight,
  X,
  Activity,
  CreditCard,
  Send,
  Building2,
  Stethoscope,
} from 'lucide-react';
import { API_BASE_URL } from '../lib/constants';
import useAuthStore from '../lib/authstore';
import { generateUserCode } from '../lib/userCode';

// ── Helpers ───────────────────────────────────────────────────────────────────

const CURRENCY_RE = /amount|cost|charges?|fee|price|settled|assessed|deductible|bill|insured|payment/i;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}T/;

function formatVal(key, val) {
  if (val === null || val === undefined) return '—';
  if (typeof val === 'boolean') return val ? 'Yes' : 'No';
  if (typeof val === 'number') {
    if (CURRENCY_RE.test(key)) return '₹' + val.toLocaleString('en-IN');
    return String(val);
  }
  if (typeof val === 'string' && ISO_DATE_RE.test(val)) {
    return new Date(val).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
  }
  return String(val);
}

function formatKey(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function isPlainObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

function allBooleans(obj) {
  return Object.values(obj).every((v) => typeof v === 'boolean');
}

function getStepResponse(step, journey) {
  if (!step || !journey) return null;
  if (step.formId) {
    return (
      journey.formResponses?.find(
        (fr) => fr.formId === step.formId && fr.userJourneyId === journey.id,
      ) || null
    );
  }
  if (step.actionId) {
    return (
      journey.actionResponses?.find(
        (ar) => ar.actionId === step.actionId && ar.userJourneyId === journey.id,
      ) || null
    );
  }
  return null;
}

function getStepStatus(step, journey) {
  if (!step || !journey) return 'PENDING';
  if (['completed', 'COMPLETED'].includes(journey.status)) return 'COMPLETED';
  if (getStepResponse(step, journey)) return 'COMPLETED';
  const currentStep = journey.metadata?.currentStep;
  if (currentStep == null) return 'PENDING';
  if (step.sequentialOrder === currentStep) return 'IN_PROGRESS';
  return 'PENDING';
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const map = {
    completed:   'bg-green-100 text-green-700',
    in_progress: 'bg-cyan-100 text-cyan-700',
    intimation:  'bg-blue-100 text-blue-700',
    approved:    'bg-emerald-100 text-emerald-700',
    declined:    'bg-red-100 text-red-700',
    pending:     'bg-yellow-100 text-yellow-700',
  };
  const cls = map[status?.toLowerCase()] || 'bg-gray-100 text-gray-600';
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-semibold capitalize ${cls}`}>
      {status?.replace(/_/g, ' ') || 'Unknown'}
    </span>
  );
}

function StepCircle({ order, status }) {
  if (status === 'COMPLETED') {
    return (
      <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center shadow flex-shrink-0">
        <CheckCircle className="w-5 h-5 text-white" />
      </div>
    );
  }
  if (status === 'IN_PROGRESS') {
    return (
      <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center shadow flex-shrink-0 animate-pulse">
        <span className="text-white font-bold text-sm">{order}</span>
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center shadow flex-shrink-0">
      <span className="text-gray-600 font-bold text-sm">{order}</span>
    </div>
  );
}

// ── Form Response Body ────────────────────────────────────────────────────────

function FormResponseBody({ resp }) {
  const r = resp.response || resp;
  const data = r.data || {};
  const submittedAt = r.submittedAt;
  const status = r.status;

  return (
    <>
      {(submittedAt || status) && (
        <div className="flex flex-wrap gap-3 p-3.5 rounded-lg bg-teal-50 border border-teal-100 mb-5 text-sm">
          {submittedAt && (
            <span className="flex items-center gap-1.5 text-gray-600">
              <Calendar className="w-3.5 h-3.5 text-[#27A395]" />
              <span className="font-semibold text-gray-700">Submitted:</span>
              <span>{new Date(submittedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
            </span>
          )}
          {status && (
            <span className="px-2 py-0.5 rounded bg-cyan-100 text-cyan-700 font-semibold capitalize text-xs">
              {status}
            </span>
          )}
        </div>
      )}

      <p className="text-xs font-bold uppercase tracking-wider text-[#27A395] mb-3 pb-2 border-b border-gray-100">
        Form Data
      </p>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(data).map(([key, val]) => {
          const isLong = typeof val === 'string' && val.length > 60;
          const isFile = typeof val === 'string' && /\.(pdf|png|jpg|jpeg|doc|docx)$/i.test(val);
          return (
            <div key={key} className={`flex flex-col gap-1 ${isLong ? 'col-span-2' : ''}`}>
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {formatKey(key)}
              </span>
              {isFile ? (
                <span className="text-sm text-gray-500 italic flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 flex-shrink-0" />{val}
                </span>
              ) : typeof val === 'boolean' ? (
                <span className={`text-sm font-semibold inline-flex w-fit px-2 py-0.5 rounded ${val ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {val ? 'Yes' : 'No'}
                </span>
              ) : (
                <span className="text-sm text-gray-800 font-medium">{formatVal(key, val)}</span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

// ── Action Response Body ──────────────────────────────────────────────────────

function ActionResponseBody({ resp }) {
  const r = resp.response || resp;
  const { performedAt, performedBy, outcome, remarks, ...rest } = r;

  const outcomeCls = {
    approved:    'bg-green-100 text-green-700',
    verified:    'bg-green-100 text-green-700',
    settled:     'bg-green-100 text-green-700',
    complete:    'bg-green-100 text-green-700',
    cleared:     'bg-green-100 text-green-700',
    assessed:    'bg-blue-100 text-blue-700',
    rejected:    'bg-red-100 text-red-700',
    repudiated:  'bg-red-100 text-red-700',
    query_raised:'bg-yellow-100 text-yellow-700',
  }[outcome?.toLowerCase()] || 'bg-teal-100 text-teal-700';

  const scalarFields = Object.entries(rest).filter(([, v]) => !isPlainObject(v) && !Array.isArray(v));
  const objectFields = Object.entries(rest).filter(([, v]) => isPlainObject(v));

  return (
    <>
      <div className="flex flex-wrap gap-3 p-3.5 rounded-lg bg-teal-50 border border-teal-100 mb-5 text-sm">
        {performedAt && (
          <span className="flex items-center gap-1.5 text-gray-600">
            <Calendar className="w-3.5 h-3.5 text-[#27A395]" />
            <span className="font-semibold text-gray-700">Performed:</span>
            <span>{new Date(performedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
          </span>
        )}
        {performedBy && (
          <span className="flex items-center gap-1.5 text-gray-600">
            <User className="w-3.5 h-3.5 text-[#27A395]" />
            <span className="font-semibold text-gray-700">By:</span>
            <span className="capitalize">{String(performedBy).replace(/_/g, ' ')}</span>
          </span>
        )}
        {outcome && (
          <span className={`font-bold px-2.5 py-0.5 rounded text-sm capitalize ${outcomeCls}`}>
            {String(outcome).replace(/_/g, ' ')}
          </span>
        )}
      </div>

      {remarks && (
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-wider text-[#27A395] mb-2 pb-1.5 border-b border-gray-100">
            Remarks
          </p>
          <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 border-l-4 border-[#27A395] rounded-r-lg px-4 py-3">
            {String(remarks)}
          </p>
        </div>
      )}

      {scalarFields.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-wider text-[#27A395] mb-3 pb-1.5 border-b border-gray-100">
            Details
          </p>
          <div className="grid grid-cols-2 gap-4">
            {scalarFields.map(([key, val]) => (
              <div key={key} className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">{formatKey(key)}</span>
                {typeof val === 'boolean' ? (
                  <span className={`text-sm font-semibold w-fit px-2 py-0.5 rounded ${val ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {val ? 'Yes' : 'No'}
                  </span>
                ) : (
                  <span className="text-sm text-gray-800 font-medium">{formatVal(key, val)}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {objectFields.map(([key, obj]) => (
        <div key={key} className="mb-5">
          <p className="text-xs font-bold uppercase tracking-wider text-[#27A395] mb-3 pb-1.5 border-b border-gray-100">
            {formatKey(key)}
          </p>
          {allBooleans(obj) ? (
            <div className="space-y-1.5">
              {Object.entries(obj).map(([k, v]) => (
                <div key={k} className="flex items-center gap-2 py-1.5 border-b border-gray-100 last:border-0">
                  {v
                    ? <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    : <X className="w-4 h-4 text-red-500 flex-shrink-0" />}
                  <span className="text-sm text-gray-700 font-medium">{formatKey(k)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(obj).map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">{formatKey(k)}</span>
                  <span className="text-sm text-gray-800 font-medium">{formatVal(k, v)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}

// ── Step Response Modal ───────────────────────────────────────────────────────

function StepResponseModal({ step, journey, onClose }) {
  if (!step) return null;
  const resp = getStepResponse(step, journey);
  const status = getStepStatus(step, journey);
  const isForm = !!step.formId;

  const statusCls = {
    COMPLETED:   'bg-green-500/20 text-green-300',
    IN_PROGRESS: 'bg-cyan-500/20 text-cyan-300',
    PENDING:     'bg-yellow-500/20 text-yellow-300',
  }[status] || 'bg-gray-500/20 text-gray-300';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div
          className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #1a2a3a 0%, #2a3f55 100%)' }}
        >
          <div className="w-10 h-10 rounded-full border-2 border-white/25 bg-white/15 flex items-center justify-center text-white font-bold text-base flex-shrink-0">
            {step.sequentialOrder}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-base leading-snug truncate">{step.title}</p>
            <p className="text-white/55 text-xs mt-0.5">{isForm ? 'Form Step' : 'Action Step'}</p>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-md flex-shrink-0 ${statusCls}`}>
            {status.replace('_', ' ')}
          </span>
          <button onClick={onClose} className="ml-1 text-white/60 hover:text-white transition-colors flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <p className="text-sm text-gray-600 bg-gray-50 border-l-4 border-gray-300 rounded-r-lg px-4 py-3 mb-5 leading-relaxed">
            {step.description}
          </p>
          {!resp ? (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No response recorded yet</p>
              <p className="text-gray-400 text-sm mt-1">This step has not been completed.</p>
            </div>
          ) : isForm ? (
            <FormResponseBody resp={resp} />
          ) : (
            <ActionResponseBody resp={resp} />
          )}
        </div>

        <div className="border-t px-5 py-3 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ── JourneyDetailView ─────────────────────────────────────────────────────────
// Accepts `id` prop (from query param). Back button navigates to /journey.

export default function JourneyDetailView({ id }) {
  const router = useRouter();
  const { token } = useAuthStore();

  const [journey, setJourney] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  const loadJourney = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const authToken = token || (typeof window !== 'undefined' ? localStorage.getItem('auth') : '') || '';
      const res = await fetch(`${API_BASE_URL}/user-journey/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error(`Failed to load journey (${res.status})`);
      const data = await res.json();
      setJourney(data);
      setNotes(data.notes || '');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    loadJourney();
  }, [loadJourney]);

  const saveNotes = async () => {
    if (!id) return;
    setSavingNotes(true);
    try {
      const authToken = token || (typeof window !== 'undefined' ? localStorage.getItem('auth') : '') || '';
      await fetch(`${API_BASE_URL}/user-journey/${id}/notes`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${authToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
    } finally {
      setSavingNotes(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#27A395] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading journey details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Failed to load journey</h3>
          <p className="text-gray-500 text-sm mb-4">{error}</p>
          <button onClick={loadJourney} className="bg-[#27A395] text-white px-5 py-2 rounded-lg font-medium">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!journey) return null;

  const steps = (journey.steps || []).slice().sort((a, b) => a.sequentialOrder - b.sequentialOrder);
  const completedCount = steps.filter((s) => getStepStatus(s, journey) === 'COMPLETED').length;
  const progress = steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0;
  const meta = journey.metadata || {};
  const userCode = generateUserCode(journey.userId);
  const isCashless = journey.journeyCode === 'CASHLESS';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ── Header Card ── */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-5" style={{ background: 'linear-gradient(135deg, #354B62 0%, #27A395 100%)' }}>
            <div className="flex items-start gap-3">
              <button
                onClick={() => router.push('/journey')}
                className="text-white/70 hover:text-white transition-colors mt-0.5 flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${isCashless ? 'bg-teal-400/30 text-teal-100' : 'bg-amber-400/30 text-amber-100'}`}>
                    {isCashless ? <Shield className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                    {journey.journeyCode}
                  </span>
                  <span className="bg-white/20 text-white/90 px-3 py-1 rounded-full text-xs font-bold font-mono">
                    {userCode}
                  </span>
                </div>
                <h1 className="text-xl font-bold text-white leading-snug">
                  {meta.patientName
                    ? `${meta.patientName}'s ${isCashless ? 'Cashless' : 'Reimbursement'} Claim`
                    : isCashless ? 'Cashless Claim Journey' : 'Reimbursement Claim Journey'}
                </h1>
                {meta.diagnosis && (
                  <p className="text-white/70 text-sm mt-1 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 flex-shrink-0" />
                    {meta.diagnosis}
                  </p>
                )}
              </div>
              <StatusBadge status={journey.status} />
            </div>
          </div>

          {/* Progress bar */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span className="font-medium">{completedCount} of {steps.length} steps completed</span>
              <span className="font-bold text-[#27A395]">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full transition-all duration-700"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #27A395 0%, #33A8D3 100%)' }}
              />
            </div>
          </div>

          {/* Meta pills */}
          {(meta.hospitalName || meta.dateOfAdmission || meta.estimatedCost || meta.totalBillAmount || meta.policyNumber) && (
            <div className="px-6 py-4 flex flex-wrap gap-4">
              {meta.hospitalName && (
                <span className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Building2 className="w-4 h-4 text-[#27A395]" />
                  {meta.hospitalName}{meta.hospitalCity ? `, ${meta.hospitalCity}` : ''}
                </span>
              )}
              {meta.dateOfAdmission && (
                <span className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-[#27A395]" />
                  Admitted: {new Date(meta.dateOfAdmission).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                </span>
              )}
              {(meta.estimatedCost || meta.totalBillAmount || meta.totalClaimAmount) && (
                <span className="flex items-center gap-1.5 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4 text-[#27A395]" />
                  ₹{(meta.estimatedCost || meta.totalBillAmount || meta.totalClaimAmount).toLocaleString('en-IN')}
                </span>
              )}
              {meta.policyNumber && (
                <span className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-[#27A395]" />
                  <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">{meta.policyNumber}</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* ── Steps Timeline ── */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 flex items-center gap-2 text-base">
              <Activity className="w-5 h-5 text-[#27A395]" />
              Journey Steps
            </h2>
            <span
              className="text-xs font-bold text-white px-3 py-1 rounded-full"
              style={{ background: 'linear-gradient(135deg, #27A395 0%, #33A8D3 100%)' }}
            >
              {steps.length} steps
            </span>
          </div>
          <div className="p-6">
            {steps.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <Clock className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No steps loaded yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {steps.map((step, idx) => {
                  const status = getStepStatus(step, journey);
                  const hasResponse = !!getStepResponse(step, journey);
                  const isDone = status === 'COMPLETED';
                  const isActive = status === 'IN_PROGRESS';
                  return (
                    <div key={step.id} className="relative flex gap-4">
                      {idx < steps.length - 1 && (
                        <div className="absolute left-4 top-9 bottom-[-16px] w-0.5 bg-gradient-to-b from-[#27A395] to-gray-200 z-0" />
                      )}
                      <div className="relative z-10">
                        <StepCircle order={step.sequentialOrder} status={status} />
                      </div>
                      <div
                        onClick={() => setSelectedStep(step)}
                        className={`flex-1 rounded-xl px-4 py-3.5 border cursor-pointer transition-all duration-150 ${
                          isDone
                            ? 'bg-green-50 border-green-200 hover:border-green-400'
                            : isActive
                            ? 'bg-cyan-50 border-cyan-200 hover:border-cyan-400'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1 gap-2">
                          <h4 className="font-semibold text-gray-900 text-sm flex-1 min-w-0">{step.title}</h4>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                              isDone ? 'bg-green-100 text-green-700'
                              : isActive ? 'bg-cyan-100 text-cyan-700'
                              : 'bg-gray-100 text-gray-500'
                            }`}>
                              {isDone ? 'Completed' : isActive ? 'In Progress' : 'Pending'}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded ${step.formId ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                              {step.formId ? 'Form' : 'Action'}
                            </span>
                            {hasResponse && <ChevronRight className="w-4 h-4 text-gray-400" />}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Notes ── */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 flex items-center gap-2 text-base">
              <FileText className="w-5 h-5 text-[#27A395]" />
              Notes
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">Notes and updates for this claim journey</p>
          </div>
          <div className="p-6">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              placeholder="Add notes about this journey..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#27A395] resize-none transition-colors"
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={saveNotes}
                disabled={savingNotes}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-white font-semibold text-sm disabled:opacity-60 transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #27A395 0%, #33A8D3 100%)' }}
              >
                <Send className="w-4 h-4" />
                {savingNotes ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
          </div>
        </div>

      </div>

      {selectedStep && (
        <StepResponseModal
          step={selectedStep}
          journey={journey}
          onClose={() => setSelectedStep(null)}
        />
      )}
    </div>
  );
}
