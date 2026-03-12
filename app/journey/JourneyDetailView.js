'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
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
  Upload,
  Paperclip,
  Eye,
  Download,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { API_BASE_URL, API_ENDPOINTS } from '../lib/constants';
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

// ── Inline Form Fill ──────────────────────────────────────────────────────────

function InlineFormFill({ step, journey, token, userId, onSuccess }) {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loadingForm, setLoadingForm] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.FORM_BY_ID(step.formId)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to load form');
        const data = await res.json();
        const raw = typeof data.fields === 'string' ? JSON.parse(data.fields) : data.fields;
        // Support both flat array and sectioned { sections: [{ title, fields }] }
        const sections = Array.isArray(raw)
          ? [{ title: null, fields: raw }]
          : (raw?.sections || []).map((s) => ({ title: s.title || null, fields: s.fields || [] }));
        setFields(sections);
        const initial = {};
        sections.forEach(({ fields: flds }) =>
          flds.forEach((f) => {
            initial[f.name] = f.type === 'checkbox' && f.allowMultiple ? [] : '';
          })
        );
        setFormData(initial);
      } catch (e) {
        setFetchError(e.message);
      } finally {
        setLoadingForm(false);
      }
    };
    load();
  }, [step.formId, token]);

  const validateField = (name, value, field) => {
    if (field.required && !value && value !== 0) return `${field.label || name} is required`;
    if (value && field.type === 'email' && !/^\S+@\S+\.\S+$/.test(value)) return 'Invalid email';
    if (value && field.type === 'tel' && !/^\+?[\d\s-]{10,}$/.test(value)) return 'Invalid phone';
    return '';
  };

  const handleChange = (e, field) => {
    const { name, value, type, checked } = e.target;
    let newValue;
    if (field.type === 'checkbox' && field.allowMultiple) {
      const arr = formData[name] || [];
      newValue = checked ? [...arr, value] : arr.filter((v) => v !== value);
    } else if (type === 'checkbox') {
      newValue = checked;
    } else {
      newValue = value;
    }
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue, field) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    let valid = true;
    fields.forEach(({ fields: flds }) =>
      flds.forEach((f) => {
        const err = validateField(f.name, formData[f.name], f);
        if (err) { valid = false; newErrors[f.name] = err; }
      })
    );
    setErrors(newErrors);
    if (!valid) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.FORM_RESPONSE}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: Number(userId),
          userJourneyId: Number(journey.id),
          formId: Number(step.formId),
          response: formData,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      onSuccess();
    } catch (err) {
      alert('Failed to submit: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingForm) {
    return (
      <div className="py-10 text-center">
        <div className="w-8 h-8 border-4 border-[#27A395] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-400 text-sm">Loading form fields…</p>
      </div>
    );
  }
  if (fetchError) {
    return <div className="py-8 text-center text-red-500 text-sm">{fetchError}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map(({ title, fields: sectionFields }, si) => (
        <div key={si}>
          {title && (
            <p className="text-xs font-bold uppercase tracking-wider text-[#27A395] mb-3 pb-2 border-b border-gray-100">
              {title}
            </p>
          )}
          <div className="space-y-4">
          {sectionFields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            {field.label || field.name}
            {field.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
          {field.description && <p className="text-xs text-gray-400 mb-1">{field.description}</p>}

          {field.type === 'select' ? (
            <select
              name={field.name}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(e, field)}
              className="p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#27A395]"
            >
              <option value="">Select…</option>
              {field.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          ) : field.type === 'radio' ? (
            <div className="flex gap-3 flex-wrap">
              {field.options?.map((opt) => (
                <label key={opt} className="flex items-center gap-1.5 text-sm cursor-pointer">
                  <input type="radio" name={field.name} value={opt}
                    checked={formData[field.name] === opt}
                    onChange={(e) => handleChange(e, field)} />
                  {opt}
                </label>
              ))}
            </div>
          ) : field.type === 'checkbox' && field.allowMultiple ? (
            <div className="flex gap-3 flex-wrap">
              {field.options?.map((opt) => (
                <label key={opt} className="flex items-center gap-1.5 text-sm cursor-pointer">
                  <input type="checkbox" name={field.name} value={opt}
                    checked={formData[field.name]?.includes(opt)}
                    onChange={(e) => handleChange(e, field)} />
                  {opt}
                </label>
              ))}
            </div>
          ) : field.type === 'textarea' ? (
            <textarea
              name={field.name}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(e, field)}
              rows={3}
              placeholder={field.description}
              className="p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#27A395] resize-none"
            />
          ) : (
            <input
              type={field.type || 'text'}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(e, field)}
              placeholder={field.description}
              className="p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#27A395]"
            />
          )}
          {errors[field.name] && (
            <span className="text-xs text-red-500 mt-0.5">{errors[field.name]}</span>
          )}
        </div>
          ))}
          </div>
        </div>
      ))}

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-white font-semibold text-sm disabled:opacity-60 transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #27A395 0%, #33A8D3 100%)' }}
        >
          <Send className="w-4 h-4" />
          {submitting ? 'Submitting…' : 'Submit Form'}
        </button>
      </div>
    </form>
  );
}

// ── Inline Action Upload ──────────────────────────────────────────────────────

function InlineActionUpload({ step, journey, token, onSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const pdfFiles = files.filter((f) => f.type === 'application/pdf');
    const imageFiles = files.filter((f) => f.type === 'image/jpeg' || f.type === 'image/png');
    if (pdfFiles.length > 1 || imageFiles.length + pdfFiles.length !== files.length) {
      setError('Only JPG/PNG images (multiple) and one PDF are permitted.');
      return;
    }

    setUploading(true);
    setProgress(0);
    setError('');
    setUploadStatus(`Uploading ${files.length} file${files.length > 1 ? 's' : ''}…`);

    const fd = new FormData();
    fd.append('actionId', step.actionId);
    fd.append('userJourneyId', journey.id);
    fd.append('response', JSON.stringify({}));
    files.forEach((f) => fd.append('file', f));

    const interval = setInterval(() => setProgress((p) => Math.min(p + 5, 90)), 150);

    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ACTION_RESPONSE}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      clearInterval(interval);
      setProgress(100);
      if (!res.ok) throw new Error((await res.text()) || 'Upload failed');
      setUploadStatus('Upload complete!');
      setTimeout(() => onSuccess(), 800);
    } catch (err) {
      clearInterval(interval);
      setProgress(0);
      setUploadStatus('');
      setError(err.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
        Upload supporting documents (JPG, PNG, or PDF) for this step.
      </p>

      {!uploading && !uploadStatus && (
        <label
          htmlFor={`upload-modal-${step.id}`}
          className="cursor-pointer inline-flex items-center gap-2 bg-[#27A395] hover:bg-[#229b87] text-white font-medium py-2.5 px-5 rounded-lg transition-colors shadow-sm text-sm"
        >
          <Upload className="w-4 h-4" />
          Upload Documents
        </label>
      )}
      <input
        id={`upload-modal-${step.id}`}
        type="file"
        multiple
        accept="image/jpeg,image/png,application/pdf"
        ref={fileInputRef}
        onChange={handleUpload}
        className="hidden"
        disabled={uploading}
      />

      {uploading && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">{uploadStatus}</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-[#27A395] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400">{progress}%</p>
        </div>
      )}

      {uploadStatus && !uploading && (
        <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
          <CheckCircle className="w-5 h-5" />
          {uploadStatus}
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

// ── Step Response Modal ───────────────────────────────────────────────────────

function StepResponseModal({ step, journey, token, userId, onClose, onSuccess }) {
  if (!step) return null;
  const resp = getStepResponse(step, journey);
  const status = getStepStatus(step, journey);
  const isForm = !!step.formId;
  const isCompleted = status === 'COMPLETED';

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

          {isCompleted && resp ? (
            isForm ? <FormResponseBody resp={resp} /> : <ActionResponseBody resp={resp} />
          ) : isCompleted ? (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">Step completed</p>
            </div>
          ) : isForm ? (
            <InlineFormFill
              step={step}
              journey={journey}
              token={token}
              userId={userId}
              onSuccess={onSuccess}
            />
          ) : (
            <InlineActionUpload
              step={step}
              journey={journey}
              token={token}
              onSuccess={onSuccess}
            />
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

// ── Attachments helpers ────────────────────────────────────────────────────────

function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
}

function getMimeLabel(mimeType) {
  if (!mimeType) return 'FILE';
  return mimeType.split('/').pop()?.toUpperCase() || 'FILE';
}

// ── AttachmentsSection ─────────────────────────────────────────────────────────

function AttachmentsSection({ journey, token, onRefresh }) {
  const fileInputRef = useRef(null);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewFileData, setPreviewFileData] = useState(null);
  const [previewFileUrl, setPreviewFileUrl] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [previewError, setPreviewError] = useState('');

  const files = journey?.metadata?.files || [];

  const openUploadModal = () => {
    setShowUploadModal(true);
    setSelectedFile(null);
    setFileName('');
    setUploadError('');
    setUploadProgress(0);
  };

  const closeUploadModal = () => {
    if (uploading) return;
    setShowUploadModal(false);
    setSelectedFile(null);
    setFileName('');
    setUploadError('');
    setUploadProgress(0);
    setIsDragging(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!fileName) setFileName(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!fileName) setFileName(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpload = async () => {
    if (!selectedFile || !fileName || !journey?.id) return;
    setUploading(true);
    setUploadProgress(0);
    setUploadError('');

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('name', fileName);

    const interval = setInterval(() => {
      setUploadProgress((p) => (p < 90 ? p + 10 : p));
    }, 200);

    try {
      const res = await fetch(`${API_BASE_URL}/user-journey/${journey.id}/upload`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      clearInterval(interval);
      if (!res.ok) throw new Error((await res.text()) || 'Upload failed');
      setUploadProgress(100);
      setTimeout(() => {
        closeUploadModal();
        onRefresh();
      }, 500);
    } catch (err) {
      clearInterval(interval);
      setUploadProgress(0);
      setUploadError(err.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const openPreview = async (file) => {
    setShowPreviewModal(true);
    setPreviewFileData(file);
    setPreviewFileUrl(null);
    setPreviewError('');
    setLoadingPreview(true);
    try {
      const res = await fetch(`${API_BASE_URL}/user-journey/${journey.id}/files/presigned-urls`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to fetch file URL');
      const data = await res.json();
      const match = data.files?.find((f) => f.fileName === file.fileName);
      if (match?.presignedUrl) {
        setPreviewFileUrl(match.presignedUrl);
      } else {
        throw new Error('File URL not found');
      }
    } catch (err) {
      setPreviewError(err.message || 'Could not load preview');
    } finally {
      setLoadingPreview(false);
    }
  };

  const closePreview = () => {
    setShowPreviewModal(false);
    setPreviewFileData(null);
    setPreviewFileUrl(null);
    setPreviewError('');
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900 flex items-center gap-2 text-base">
            <Paperclip className="w-5 h-5 text-[#27A395]" />
            Attachments
            {files.length > 0 && (
              <span
                className="text-xs font-bold text-white px-2.5 py-0.5 rounded-full"
                style={{ background: 'linear-gradient(135deg, #27A395 0%, #33A8D3 100%)' }}
              >
                {files.length}
              </span>
            )}
          </h2>
          <button
            onClick={openUploadModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #27A395 0%, #33A8D3 100%)' }}
          >
            <Upload className="w-4 h-4" />
            Upload File
          </button>
        </div>

        <div className="p-6">
          {files.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <Paperclip className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No attachments yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {files.map((file, i) => {
                const isPdf = file.mimeType?.includes('pdf');
                const isImage = file.mimeType?.startsWith('image/');
                return (
                  <div
                    key={`${file.fileName || 'file'}-${i}`}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-sm transition-all"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isPdf
                          ? 'bg-red-100 text-red-600'
                          : isImage
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {file.name || file.fileName}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {formatFileSize(file.fileSize)} · {getMimeLabel(file.mimeType)}
                      </p>
                    </div>
                    <button
                      onClick={() => openPreview(file)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#27A395] text-white hover:bg-[#229b87] transition-colors flex-shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Preview
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Upload Modal ── */}
      {showUploadModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.55)' }}
          onClick={(e) => e.target === e.currentTarget && closeUploadModal()}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ background: 'linear-gradient(135deg, #354B62 0%, #27A395 100%)' }}
            >
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload File
              </h3>
              <button
                onClick={closeUploadModal}
                disabled={uploading}
                className="text-white/70 hover:text-white transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* File Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  File Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Enter a descriptive name for this file"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#27A395] transition-colors"
                />
                <p className="text-xs text-gray-400 mt-1">Give this file a descriptive name</p>
              </div>

              {/* Drag & Drop */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Select File <span className="text-red-500">*</span>
                </label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => !selectedFile && fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    selectedFile
                      ? 'border-green-400 bg-green-50 cursor-default'
                      : isDragging
                      ? 'border-[#27A395] bg-teal-50 cursor-copy'
                      : 'border-gray-300 hover:border-[#27A395] hover:bg-gray-50 cursor-pointer'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  {selectedFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="w-8 h-8 text-green-600 flex-shrink-0" />
                      <div className="text-left min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{selectedFile.name}</p>
                        <p className="text-xs text-gray-400">{formatFileSize(selectedFile.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeSelectedFile(); }}
                        className="ml-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 font-medium">Drag file here or click to browse</p>
                      <p className="text-xs text-gray-400 mt-1">Supported: PDF, Images, Documents</p>
                    </>
                  )}
                </div>
              </div>

              {/* Progress */}
              {uploading && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Uploading and processing...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-200"
                      style={{
                        width: `${uploadProgress}%`,
                        background: 'linear-gradient(90deg, #27A395 0%, #33A8D3 100%)',
                      }}
                    />
                  </div>
                </div>
              )}

              {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}
            </div>

            <div className="px-5 py-4 border-t flex justify-end gap-3">
              <button
                onClick={closeUploadModal}
                disabled={uploading}
                className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors text-sm disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!selectedFile || !fileName || uploading}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-white font-semibold text-sm disabled:opacity-60 transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #27A395 0%, #33A8D3 100%)' }}
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Preview Modal ── */}
      {showPreviewModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={(e) => e.target === e.currentTarget && closePreview()}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col overflow-hidden"
            style={{ maxHeight: '90vh' }}
          >
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #354B62 0%, #27A395 100%)' }}
            >
              <h3 className="text-white font-semibold flex items-center gap-2 min-w-0">
                <FileText className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{previewFileData?.fileName || 'File Preview'}</span>
              </h3>
              <button
                onClick={closePreview}
                className="text-white/70 hover:text-white transition-colors flex-shrink-0 ml-3"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto">
              {loadingPreview ? (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <div className="w-10 h-10 border-4 border-[#27A395] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">Loading preview...</p>
                  </div>
                </div>
              ) : previewError ? (
                <div className="flex items-center justify-center py-16 text-center">
                  <div>
                    <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
                    <p className="text-gray-700 font-medium">{previewError}</p>
                  </div>
                </div>
              ) : previewFileUrl ? (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-gray-50 border-b text-sm text-gray-600">
                    <div className="flex flex-wrap gap-4">
                      {previewFileData?.fileSize && (
                        <span><strong>Size:</strong> {formatFileSize(previewFileData.fileSize)}</span>
                      )}
                      {previewFileData?.mimeType && (
                        <span><strong>Type:</strong> {getMimeLabel(previewFileData.mimeType)}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={previewFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#27A395] text-white hover:bg-[#229b87] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Open in New Tab
                      </a>
                      <a
                        href={previewFileUrl}
                        download={previewFileData?.fileName}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </a>
                    </div>
                  </div>
                  <iframe
                    src={previewFileUrl}
                    title="File Preview"
                    style={{ width: '100%', height: 'calc(90vh - 160px)', border: 'none' }}
                  />
                </div>
              ) : null}
            </div>

            <div className="border-t px-5 py-3 flex justify-end flex-shrink-0">
              <button
                onClick={closePreview}
                className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── JourneyDetailView ─────────────────────────────────────────────────────────
// Accepts `id` prop (from query param). Back button navigates to /journey.

export default function JourneyDetailView({ id }) {
  const router = useRouter();
  const { token, user } = useAuthStore();

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
              <div className="flex items-center gap-2">
                <StatusBadge status={journey.status} />
                <button
                  onClick={() => router.push(`/journey/chat?id=${journey.id}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white/90 hover:text-white border border-white/30 hover:border-white/60 bg-white/10 hover:bg-white/20 transition-all text-xs font-semibold flex-shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat
                </button>
              </div>
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

        {/* ── Attachments ── */}
        <AttachmentsSection
          journey={journey}
          token={token || (typeof window !== 'undefined' ? localStorage.getItem('auth') : '')}
          onRefresh={loadJourney}
        />

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
          token={token || (typeof window !== 'undefined' ? localStorage.getItem('auth') : '')}
          userId={journey.userId}
          onClose={() => setSelectedStep(null)}
          onSuccess={() => { setSelectedStep(null); loadJourney(); }}
        />
      )}
    </div>
  );
}
