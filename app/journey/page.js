'use client';

import { useEffect, useMemo, useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import JourneyDetailView from './JourneyDetailView';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Calendar,
  TrendingUp,
  FileText,
  Shield,
  ChevronRight,
  Plus,
  ChevronDown,
  Upload,
  FileImage,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL, API_ENDPOINTS } from '../lib/constants';
// useSearchParams + Suspense wrapper is handled in Page() below
import useAuthStore from '../lib/authstore';
import { generateUserCode } from '../lib/userCode';

// ==================== File Upload Component with Progress Bar ====================
const FileUploadAction = ({ userJourneyId, actionId, actionResponses, onUploadSuccess, token }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const isCompleted = actionResponses.some(
    (ar) => ar.actionId === actionId && ar.userJourneyId === userJourneyId
  );

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const pdfFiles = files.filter((f) => f.type === 'application/pdf');
    const imageFiles = files.filter((f) => f.type === 'image/jpeg' || f.type === 'image/png');

    if (pdfFiles.length > 1 || imageFiles.length + pdfFiles.length !== files.length) {
      setError('Only JPG/PNG images (multiple allowed) and one PDF are permitted.');
      return;
    }

    setUploading(true);
    setProgress(0);
    setError('');
    setUploadStatus(`Uploading ${files.length} file${files.length > 1 ? 's' : ''}...`);

    const formData = new FormData();
    formData.append('actionId', actionId);
    formData.append('userJourneyId', userJourneyId);
    formData.append('response', JSON.stringify({}));

    files.forEach((file) => formData.append('file', file));

    // Simulate smooth progress 
    const startTime = Date.now();
    const duration = 4000; // average expected upload time

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const simulated = Math.min((elapsed / duration) * 100, 90);
      setProgress(simulated);
    }, 100);

    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ACTION_RESPONSE}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);
      setUploadStatus('Upload complete!');

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Upload failed');
      }

      setTimeout(() => onUploadSuccess(), 800);
    } catch (err) {
      clearInterval(progressInterval);
      setProgress(0);
      setUploadStatus('');
      setError(err.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (isCompleted) {
    return (
      <div className="flex items-center gap-3 text-green-600 font-medium mt-4">
        <CheckCircle className="w-6 h-6" />
        <span>Documents Uploaded Successfully</span>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      <label
        htmlFor={`upload-${userJourneyId}-${actionId}`}
        className="cursor-pointer inline-flex items-center gap-2 bg-[#27A395] hover:bg-[#229b87] text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm"
      >
        <Upload className="w-5 h-5" />
        Upload Documents
      </label>

      <input
        id={`upload-${userJourneyId}-${actionId}`}
        type="file"
        multiple
        accept="image/jpeg,image/png,application/pdf"
        ref={fileInputRef}
        onChange={handleUpload}
        className="hidden"
        disabled={uploading}
      />

      <p className="text-sm text-gray-500">
        You can upload multiple images (JPG/PNG) and one PDF
      </p>

      {/* Progress Section */}
      {uploading && (
        <>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#27A395] to-[#33A8D3] transition-all duration-500 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <p className="text-[#27A395] font-medium">{uploadStatus}</p>
            <p className="text-gray-800 font-bold">{Math.round(progress)}%</p>
          </div>
        </>
      )}

      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
};

// ==================== Main UserJourneyTimeline Component ====================
const UserJourneyTimeline = () => {
  const [userJourneys, setUserJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState('journeys');
  const [showJourneyMenu, setShowJourneyMenu] = useState(false);
  const [creating, setCreating] = useState(false);

  const { user, token, initializeAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isClient || !user?.id) return;

    const fetchUserJourneys = async () => {
      setLoading(true);
      setError(null);
      try {
        const authToken = token || 'mock-jwt-token';
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USER_JOURNEY_BY_USER_ID(user.id)}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 500) {
          const text = await response.text();
          if (text.includes('No journeys found')) {
            setUserJourneys([]);
            setLoading(false);
            return;
          }
        }

        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        const data = await response.json();
        setUserJourneys(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserJourneys();
  }, [isClient, user?.id, token]);

  const createNewJourney = async (journeyCode) => {
    if (!user?.id) return;
    setCreating(true);
    try {
      const authToken = token || 'mock-jwt-token';
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USER_JOURNEY}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id, journeyCode }),
      });
      if (!res.ok) throw new Error(await res.text());
      window.location.reload();
    } catch (err) {
      alert(err.message || 'Failed to create journey');
    } finally {
      setCreating(false);
    }
  };

  const processedJourneys = useMemo(() => {
    return userJourneys
      .map((uj) => {
        const processedSteps = (uj.steps || []).map((step) => {
          const formCompleted = step.formId
            ? uj.formResponses?.some(
              (fr) => fr.formId === step.formId && (fr.journeyId === uj.id || fr.userJourneyId === uj.id)
            )
            : false;

          const actionCompleted = step.actionId
            ? uj.actionResponses?.some((ar) => ar.actionId === step.actionId)
            : false;

          return {
            ...step,
            isCompleted: formCompleted || actionCompleted,
            isAction: !!step.actionId,
            isForm: !!step.formId,
          };
        });

        const nextIncompleteStep = processedSteps.find((s) => !s.isCompleted) || null;
        const sortedSteps = processedSteps.sort((a, b) => {
          if (nextIncompleteStep && a.id === nextIncompleteStep.id) return -1;
          if (nextIncompleteStep && b.id === nextIncompleteStep.id) return 1;
          return a.sequentialOrder - b.sequentialOrder;
        });

        const completedCount = processedSteps.filter((s) => s.isCompleted).length;
        const progress = processedSteps.length > 0
          ? Math.round((completedCount / processedSteps.length) * 100)
          : 0;

        return {
          ...uj,
          progress,
          sortedSteps,
          nextIncompleteStep,
          isCompleted: progress === 100,
        };
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [userJourneys]);

  const stats = useMemo(() => {
    const total = processedJourneys.length;
    const completed = processedJourneys.filter((j) => j.isCompleted).length;
    const inProgress = total - completed;
    const averageProgress = total > 0 ? processedJourneys.reduce((s, j) => s + j.progress, 0) / total : 0;
    const cashless = processedJourneys.filter((j) => j.journeyCode === 'CASHLESS').length;
    const reimbursement = processedJourneys.filter((j) => j.journeyCode === 'REIMBURSEMENT').length;
    return { total, completed, inProgress, averageProgress, cashless, reimbursement };
  }, [processedJourneys]);

  const handleFormClick = (userJourneyId, formId) => {
    if (formId) router.push(`/forms/${formId}?journeyId=${userJourneyId}`);
  };

  const cashlessJourneySteps = [
    { step: 1, title: 'Medical Emergency/Planned Treatment', description: 'Patient experiences medical need...', timeline: 'Immediate', who: 'Patient', icon: AlertCircle, color: 'bg-[#27A395]' },
    { step: 2, title: 'Select Network Hospital', description: "Patient must choose from insurer's approved...", timeline: 'Immediate', who: 'Patient', icon: Shield, color: 'bg-[#33A8D3]' },
    { step: 3, title: 'Hospital Admission', description: 'Patient admission process begins...', timeline: 'Immediate upon arrival', who: 'Patient and Hospital staff', icon: User, color: 'bg-[#354B62]' },
    { step: 4, title: 'Intimation to Insurer/TPA', description: 'Formal notification to insurance company...', timeline: 'Within 24 hours...', who: 'Hospital staff or patient', icon: FileText, color: 'bg-[#27A395]' },
    { step: 5, title: 'Pre-Authorization Request', description: 'Hospital submits formal pre-authorization...', timeline: 'Within 6 hours...', who: 'Hospital insurance desk', icon: Clock, color: 'bg-[#33A8D3]' },
    { step: 6, title: 'Document Submission', description: 'Hospital and patient submit required...', timeline: 'Along with pre-authorization...', who: 'Hospital and Patient', icon: FileText, color: 'bg-[#354B62]' },
    { step: 7, title: 'TPA/Insurer Review', description: 'Medical necessity review...', timeline: '1-4 hours...', who: 'TPA medical team', icon: Shield, color: 'bg-[#27A395]' },
    { step: 8, title: 'Pre-Authorization Decision', description: 'Approval, rejection, or query...', timeline: 'After completion of review', who: 'TPA/Insurer', icon: CheckCircle, color: 'bg-[#33A8D3]' },
    { step: 9, title: 'Treatment Begins (if approved)', description: 'Hospital medical team begins...', timeline: 'Immediately after approval', who: 'Hospital medical team', icon: User, color: 'bg-[#354B62]' },
    { step: 10, title: 'Treatment Completion', description: 'Medical team completes treatment...', timeline: 'As per medical requirements', who: 'Medical team', icon: CheckCircle, color: 'bg-[#27A395]' },
    { step: 11, title: 'Final Bill Generation', description: 'Comprehensive bill preparation...', timeline: 'At the time of discharge', who: 'Hospital billing', icon: FileText, color: 'bg-[#33A8D3]' },
    { step: 12, title: 'Final Settlement with TPA', description: 'Direct settlement between hospital...', timeline: '24-48 hours post-discharge', who: 'Hospital & TPA', icon: TrendingUp, color: 'bg-[#354B62]' },
    { step: 13, title: 'Patient Discharge', description: 'Patient leaves hospital after settlement...', timeline: 'After settlement', who: 'Patient', icon: User, color: 'bg-[#27A395]' },
  ];

  if (loading) return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center"><div className="text-center"><div className="w-12 h-12 border-4 border-[#27A395] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><h3 className="text-lg font-semibold">Loading Journeys...</h3></div></div>;

  if (error) return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center"><div className="text-center"><AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" /><h3 className="text-xl font-bold">Error</h3><p className="text-gray-600">{error}</p><button onClick={() => window.location.reload()} className="mt-4 bg-[#27A395] text-white px-6 py-2 rounded-lg">Retry</button></div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Cashless User Journey</h1>
          <p className="text-lg text-gray-600">Track your insurance claims and understand the complete process</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md border"><p className="text-xs text-gray-500 mb-1">Total</p><p className="text-2xl font-bold text-gray-900">{stats.total}</p></div>
          <div className="bg-white rounded-xl p-4 shadow-md border"><p className="text-xs text-gray-500 mb-1">Completed</p><p className="text-2xl font-bold text-green-600">{stats.completed}</p></div>
          <div className="bg-white rounded-xl p-4 shadow-md border"><p className="text-xs text-gray-500 mb-1">In Progress</p><p className="text-2xl font-bold text-orange-500">{stats.inProgress}</p></div>
          <div className="bg-white rounded-xl p-4 shadow-md border"><p className="text-xs text-gray-500 mb-1">Cashless</p><p className="text-2xl font-bold text-teal-600">{stats.cashless}</p></div>
          <div className="bg-white rounded-xl p-4 shadow-md border"><p className="text-xs text-gray-500 mb-1">Reimbursement</p><p className="text-2xl font-bold text-amber-600">{stats.reimbursement}</p></div>
          <div className="bg-white rounded-xl p-4 shadow-md border"><p className="text-xs text-gray-500 mb-1">Avg Progress</p><p className="text-2xl font-bold text-purple-600">{stats.averageProgress.toFixed(0)}%</p></div>
        </div>

        <div className="flex space-x-1 bg-white rounded-xl p-1.5 shadow-md mb-6">
          <button onClick={() => setActiveTab('journeys')} className={`flex-1 py-2 px-4 rounded-lg font-bold ${activeTab === 'journeys' ? 'bg-[#27A395] text-white' : 'text-gray-600'}`}>Your Journeys</button>
          <button onClick={() => setActiveTab('process')} className={`flex-1 py-2 px-4 rounded-lg font-bold ${activeTab === 'process' ? 'bg-[#27A395] text-white' : 'text-gray-600'}`}>Claim Process</button>
        </div>

        <div className="flex justify-end mb-6">
          <div className="relative">
            <button onClick={() => setShowJourneyMenu(v => !v)} disabled={creating} className="bg-[#27A395] text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2">
              {creating ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Plus className="w-5 h-5" />}
              Start New Journey <ChevronDown className={`w-5 h-5 transition-transform ${showJourneyMenu ? 'rotate-180' : ''}`} />
            </button>
            {showJourneyMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border z-10">
                <button onClick={() => { createNewJourney('CASHLESS'); setShowJourneyMenu(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3"><Shield className="w-5 h-5 text-[#27A395]" /> Cashless Claim</button>
                <button onClick={() => { createNewJourney('REIMBURSEMENT'); setShowJourneyMenu(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 border-t"><FileText className="w-5 h-5 text-[#33A8D3]" /> Reimbursement Claim</button>
              </div>
            )}
          </div>
        </div>

        {activeTab === 'journeys' ? (
          processedJourneys.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-md"><FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" /><h3 className="text-xl font-bold">No Journeys Started</h3><p className="text-gray-600">Begin your claim using the button above.</p></div>
          ) : (
            <div className="space-y-6">
              {processedJourneys.map(journey => (
                <div key={journey.id} className="bg-white rounded-xl shadow-lg border overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${journey.journeyCode === 'CASHLESS' ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'}`}>
                            {journey.journeyCode}
                          </span>
                          <span className="font-mono text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{generateUserCode(journey.userId)}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{journey.metadata?.patientName ? `${journey.metadata.patientName}'s ${journey.journeyCode === 'CASHLESS' ? 'Cashless' : 'Reimbursement'} Claim` : journey.journeyCode === 'CASHLESS' ? 'Cashless Claim Journey' : 'Reimbursement Claim Journey'}</h3>
                        {journey.metadata?.diagnosis && <p className="text-sm text-gray-500 mt-0.5 truncate">{journey.metadata.diagnosis}</p>}
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-3 flex-shrink-0">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold capitalize ${{ completed: 'bg-green-100 text-green-700', in_progress: 'bg-cyan-100 text-cyan-700', intimation: 'bg-blue-100 text-blue-700', approved: 'bg-emerald-100 text-emerald-700', declined: 'bg-red-100 text-red-700' }[journey.status?.toLowerCase()] || 'bg-gray-100 text-gray-600'}`}>{journey.status?.replace(/_/g, ' ') || 'Unknown'}</span>
                        <button onClick={() => router.push(`/journey?id=${journey.id}`)} className="text-xs font-semibold text-[#27A395] hover:text-[#229584] flex items-center gap-1 transition-colors">
                          View Details <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2"><span>Progress</span><span>{journey.progress}%</span></div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-[#27A395] to-[#33A8D3] h-3 rounded-full transition-all" style={{ width: `${journey.progress}%` }} />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {journey.sortedSteps.map(step => {
                        const isActionCompleted = step.actionId ? journey.actionResponses?.some(ar => ar.actionId === step.actionId) : false;

                        return (
                          <div key={step.id} className={`flex gap-4 p-5 rounded-lg border ${step.isCompleted || isActionCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'} ${step.isForm && !step.isCompleted ? 'cursor-pointer hover:shadow' : ''}`}
                            onClick={() => step.isForm && !step.isCompleted && handleFormClick(journey.id, step.formId)}>
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold shadow-md ${step.isCompleted || isActionCompleted ? 'bg-green-500' : 'bg-[#27A395]'}`}>
                              {step.isCompleted || isActionCompleted ? <CheckCircle className="w-7 h-7" /> : step.sequentialOrder}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="text-lg font-semibold">{step.title}</h4>
                                <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full">{step.action ? 'Action' : 'Form'}</span>
                              </div>
                              <p className="text-gray-600">{step.description}</p>

                              {step.action && step.action.type === 'notification' && (
                                <FileUploadAction
                                  userJourneyId={journey.id}
                                  actionId={step.actionId}
                                  actionResponses={journey.actionResponses || []}
                                  onUploadSuccess={() => window.location.reload()}
                                  token={token || ''}
                                />
                              )}

                              {isActionCompleted && journey.actionResponses?.filter(ar => ar.actionId === step.actionId).map((ar, i) => (
                                <div key={i} className="mt-3 inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded text-sm">
                                  {ar.response.mimeType?.startsWith('image/') ? <FileImage className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                                  {ar.response.fileName}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
            <div className="bg-gradient-to-r from-[#354B62] to-[#27A395] p-8 text-white">
              <h2 className="text-3xl font-bold">Cashless Claim Process</h2>
              <p className="mt-2 opacity-90">Complete step-by-step guide</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {cashlessJourneySteps.map(s => (
                  <div key={s.step} className="flex gap-5 p-5 rounded-lg border bg-gradient-to-r from-white to-gray-50 hover:shadow transition">
                    <div className={`${s.color} w-14 h-14 rounded-lg flex items-center justify-center text-white shadow-lg`}>
                      <s.icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <h3 className="text-xl font-bold">Step {s.step}: {s.title}</h3>
                        <div className="flex gap-3 text-sm">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{s.timeline}</span>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">{s.who}</span>
                        </div>
                      </div>
                      <p className="text-gray-600">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function JourneyPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  if (id) return <JourneyDetailView id={id} />;
  return <UserJourneyTimeline />;
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#27A395] border-t-transparent rounded-full animate-spin" /></div>}>
      <JourneyPage />
    </Suspense>
  );
}