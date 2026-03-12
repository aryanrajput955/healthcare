'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  X,
  Clock,
  CreditCard,
  Search,
  Filter,
  Plus,
  ChevronRight,
  CheckCircle,
  FileText,
  Activity,
  Upload,
  Building2,
  User,
  StopCircle,
} from 'lucide-react';
import { API_BASE_URL } from '../../lib/constants';
import useAuthStore from '../../lib/authstore';

// ── Constants ─────────────────────────────────────────────────────────────────

const WORK_LOG_LABELS = {
  STATUS_CHANGE: 'Status Change',
  FILE_UPLOAD: 'File Upload',
  ADMIN_NOTE: 'Admin Note',
  HOSPITAL_UPDATE: 'Hospital Update',
};

const TRANSACTION_LOG_LABELS = {
  FORM_SUBMISSION: 'Form Submission',
  ACTION_COMPLETION: 'Action Completed',
  CLAIM_AMOUNT: 'Claim Amount',
  PAYMENT: 'Payment',
};

const WORK_LOG_COLORS = {
  STATUS_CHANGE: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  FILE_UPLOAD: { bg: 'bg-cyan-100', text: 'text-cyan-700', dot: 'bg-cyan-500' },
  ADMIN_NOTE: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  HOSPITAL_UPDATE: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
};

const TRANSACTION_LOG_COLORS = {
  FORM_SUBMISSION: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  ACTION_COMPLETION: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  CLAIM_AMOUNT: { bg: 'bg-sky-100', text: 'text-sky-700', dot: 'bg-sky-500' },
  PAYMENT: { bg: 'bg-teal-100', text: 'text-teal-700', dot: 'bg-teal-500' },
};

function getLogColor(log) {
  if (log.logCategory === 'work') return WORK_LOG_COLORS[log.logType] || { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' };
  return TRANSACTION_LOG_COLORS[log.transactionType] || { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' };
}

function getLogLabel(log) {
  if (log.logCategory === 'work') return WORK_LOG_LABELS[log.logType] || log.logType;
  return TRANSACTION_LOG_LABELS[log.transactionType] || log.transactionType;
}

function getLogIcon(log) {
  if (log.logCategory === 'transaction') {
    if (log.transactionType === 'PAYMENT' || log.transactionType === 'CLAIM_AMOUNT') return CreditCard;
    return CheckCircle;
  }
  if (log.logType === 'FILE_UPLOAD') return Upload;
  if (log.logType === 'HOSPITAL_UPDATE') return Building2;
  if (log.logType === 'STATUS_CHANGE') return Activity;
  return FileText;
}

function formatDateTime(ts) {
  if (!ts) return '—';
  return new Date(ts).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
}

function formatDate(ts) {
  if (!ts) return 'Unknown';
  const d = new Date(ts);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatDuration(seconds) {
  if (!seconds) return null;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

// ── Main Component ────────────────────────────────────────────────────────────

function JourneyLogsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const journeyId = searchParams.get('id');
  const { token } = useAuthStore();
  const authToken = token || (typeof window !== 'undefined' ? localStorage.getItem('auth') : '');

  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [journeyCode, setJourneyCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Close work log modal state
  const [closeModal, setCloseModal] = useState(null); // holds the log being closed
  const [closeEndTime, setCloseEndTime] = useState('');
  const [closing, setClosing] = useState(false);
  const [closeError, setCloseError] = useState(null);

  const fetchLogs = useCallback(async () => {
    if (!journeyId || !authToken) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/journey-logs/${journeyId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!res.ok) throw new Error(`Failed to load logs (${res.status})`);
      const data = await res.json();
      setLogs(data);
      setFilteredLogs(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [journeyId, authToken]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  useEffect(() => {
    if (!journeyId || !authToken) return;
    fetch(`${API_BASE_URL}/user-journey/${journeyId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((r) => r.json())
      .then((d) => setJourneyCode(d?.journeyCode || ''))
      .catch(() => {});
  }, [journeyId, authToken]);

  // Apply filters whenever deps change
  useEffect(() => {
    let filtered = [...logs];
    if (filterCategory !== 'all') {
      filtered = filtered.filter((l) => l.logCategory === filterCategory);
    }
    if (filterType !== 'all') {
      filtered = filtered.filter((l) =>
        l.logCategory === 'work' ? l.logType === filterType : l.transactionType === filterType
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.description?.toLowerCase().includes(q) ||
          l.performedByUser?.name?.toLowerCase().includes(q) ||
          l.performedByUser?.email?.toLowerCase().includes(q)
      );
    }
    setFilteredLogs(filtered);
  }, [logs, filterCategory, filterType, searchQuery]);

  const openCloseModal = (log) => {
    setCloseModal(log);
    setCloseEndTime('');
    setCloseError(null);
  };

  const handleCloseWorkLog = async () => {
    if (!closeModal) return;
    setClosing(true);
    setCloseError(null);
    try {
      const endTime = closeEndTime
        ? new Date(closeEndTime).toISOString()
        : new Date().toISOString();
      const res = await fetch(`${API_BASE_URL}/journey-logs/work/${closeModal.id}/close`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ endTime }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Failed (${res.status})`);
      }
      setCloseModal(null);
      await fetchLogs();
    } catch (e) {
      setCloseError(e.message);
    } finally {
      setClosing(false);
    }
  };

  // Group by date
  const groupedLogs = filteredLogs.reduce((acc, log) => {
    const key = formatDate(log.createdAt);
    if (!acc[key]) acc[key] = [];
    acc[key].push(log);
    return acc;
  }, {});

  if (!journeyId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">No journey selected.</p>
          <button onClick={() => router.push('/journey')} className="mt-4 text-[#27A395] underline text-sm">
            Go to My Journeys
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ── */}
      <div
        className="px-4 py-4 flex items-center gap-4"
        style={{ background: 'linear-gradient(135deg, #354B62 0%, #27A395 100%)' }}
      >
        <button onClick={() => router.push(`/journey?id=${journeyId}`)} className="text-white/70 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-white font-bold text-base truncate">
            Activity Logs{journeyCode ? ` — ${journeyCode}` : ''}
          </h1>
          <p className="text-white/60 text-xs mt-0.5">Work & transaction history</p>
        </div>
        <button
          onClick={fetchLogs}
          disabled={isLoading}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-5 space-y-4">
        {/* ── Action Buttons ── */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => router.push(`/journey/logs/create-work?id=${journeyId}`)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #27A395 0%, #33A8D3 100%)' }}
          >
            <Plus className="w-4 h-4" />
            Add Work Log
          </button>
          <button
            onClick={() => router.push(`/journey/logs/create-transaction?id=${journeyId}`)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #354B62 0%, #27A395 100%)' }}
          >
            <CreditCard className="w-4 h-4" />
            Add Transaction
          </button>
        </div>

        {/* ── Filters ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search logs..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#27A395] transition-colors"
            />
          </div>
          {/* Category + Type filters */}
          <div className="flex gap-2 flex-wrap">
            <select
              value={filterCategory}
              onChange={(e) => { setFilterCategory(e.target.value); setFilterType('all'); }}
              className="flex-1 min-w-[130px] px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#27A395] bg-white transition-colors"
            >
              <option value="all">All Categories</option>
              <option value="work">Work Logs</option>
              <option value="transaction">Transactions</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="flex-1 min-w-[130px] px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#27A395] bg-white transition-colors"
            >
              <option value="all">All Types</option>
              {(filterCategory === 'all' || filterCategory === 'work') && (
                <>
                  <optgroup label="Work Logs">
                    {Object.entries(WORK_LOG_LABELS).map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </optgroup>
                </>
              )}
              {(filterCategory === 'all' || filterCategory === 'transaction') && (
                <>
                  <optgroup label="Transactions">
                    {Object.entries(TRANSACTION_LOG_LABELS).map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </optgroup>
                </>
              )}
            </select>
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
            <button className="ml-auto" onClick={() => setError(null)}><X className="w-3.5 h-3.5" /></button>
          </div>
        )}

        {/* ── Loading ── */}
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="w-7 h-7 border-2 border-[#27A395] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
            <Activity className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium text-sm">
              {logs.length === 0 ? 'No activity recorded yet.' : 'No logs match your filters.'}
            </p>
          </div>
        ) : (
          Object.entries(groupedLogs).map(([date, dayLogs]) => (
            <div key={date}>
              {/* Date header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 font-semibold px-2">{date}</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="space-y-3">
                {dayLogs.map((log) => {
                  const color = getLogColor(log);
                  const label = getLogLabel(log);
                  const Icon = getLogIcon(log);
                  const isWork = log.logCategory === 'work';

                  return (
                    <div key={`${log.logCategory}-${log.id}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${color.bg}`}>
                          <Icon className={`w-4 h-4 ${color.text}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color.bg} ${color.text}`}>
                              {label}
                            </span>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isWork ? 'bg-blue-50 text-blue-600' : 'bg-teal-50 text-teal-600'}`}>
                              {isWork ? 'Work' : 'Transaction'}
                            </span>
                          </div>

                          {log.description && (
                            <p className="text-sm text-gray-700 mt-1.5 leading-relaxed">{log.description}</p>
                          )}

                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            {log.performedByUser?.name && (
                              <span className="flex items-center gap-1 text-xs text-gray-400">
                                <User className="w-3 h-3" />
                                {log.performedByUser.name}
                              </span>
                            )}
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <Clock className="w-3 h-3" />
                              {formatDateTime(log.createdAt)}
                            </span>
                            {isWork && log.duration && (
                              <span className="text-xs bg-sky-50 text-sky-600 font-semibold px-2 py-0.5 rounded-full">
                                ⏱ {formatDuration(log.duration)}
                              </span>
                            )}
                            {!isWork && log.amount && (
                              <span className="text-xs bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                                ₹{Number(log.amount).toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>

                          {/* Close button for open work logs */}
                          {isWork && !log.endTime && (
                            <button
                              onClick={() => openCloseModal(log)}
                              className="mt-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors"
                            >
                              <StopCircle className="w-3.5 h-3.5" />
                              Close Log
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Close Work Log Modal ── */}
      {closeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 text-base">Close Work Log</h3>
              <button onClick={() => setCloseModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Set an end time to calculate the total duration. Leave blank to use the current time.</p>
            <div className="space-y-1.5 mb-4">
              <label className="block text-sm font-semibold text-gray-700">End Time <span className="text-gray-400 font-normal">(Optional)</span></label>
              <input
                type="datetime-local"
                value={closeEndTime}
                onChange={(e) => setCloseEndTime(e.target.value)}
                max={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-[#27A395] transition-colors"
              />
              <p className="text-xs text-gray-400">Leave blank to use current time.</p>
            </div>
            {closeError && (
              <div className="mb-4 px-3 py-2 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />{closeError}
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setCloseModal(null)}
                disabled={closing}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCloseWorkLog}
                disabled={closing}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #27A395 0%, #33A8D3 100%)' }}
              >
                {closing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Closing...
                  </span>
                ) : 'Close Log'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function JourneyLogsPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-7 h-7 border-2 border-[#27A395] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <JourneyLogsPage />
    </Suspense>
  );
}
