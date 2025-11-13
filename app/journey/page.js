'use client';
import { useEffect, useMemo, useState } from 'react';
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
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../lib/authstore';

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
        const response = await fetch(`https://api.indiem.tech/user-journey/user/${user.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

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
      const payload = { userId: user.id, journeyCode };
      const response = await fetch('https://api.indiem.tech/user-journey', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to create journey');
      const newJourney = await response.json();
      setUserJourneys(prev => [...prev, newJourney]);
      setShowJourneyMenu(false);
    } catch (err) {
      console.error(err);
      alert('Could not create journey.');
    } finally {
      setCreating(false);
    }
  };

  const processedJourneys = useMemo(() => {
    const processed = userJourneys.map((uj) => {
      const formCount = uj.formResponses?.length || 0;
      const completedActions = uj.actionResponses?.filter(ar => ar.response?.completed === true).length || 0;
      const totalActions = uj.actionResponses?.length || 0;
      const progress = totalActions > 0
        ? (completedActions / totalActions) * 100
        : formCount > 0 ? 100 : 0;

      const processedSteps = uj.steps?.map((step) => {
        const isCompleted = step.formId
          ? uj.formResponses?.some((fr) =>
              fr.formId === step.formId &&
              (fr.journeyId === uj.id || fr.userJourneyId === uj.id)
            )
          : false;

        return {
          ...step,
          isCompleted,
          isAction: !!step.actionId,
          isForm: !!step.formId,
        };
      }) || [];

      const nextIncompleteStep = processedSteps.find(s => !s.isCompleted) || null;

      const sortedSteps = processedSteps.sort((a, b) => {
        if (nextIncompleteStep && a.id === nextIncompleteStep.id) return -1;
        if (nextIncompleteStep && b.id === nextIncompleteStep.id) return 1;
        return a.sequentialOrder - b.sequentialOrder;
      });

      return {
        ...uj,
        isCompleted: progress === 100,
        progress,
        formCount,
        completedActions,
        totalActions,
        lastUpdated: uj.updatedAt || uj.createdAt,
        sortedSteps,
        nextIncompleteStep,
      };
    });

    return processed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [userJourneys]);

  const stats = useMemo(() => {
    const total = processedJourneys.length;
    const completed = processedJourneys.filter(j => j.isCompleted).length;
    const inProgress = total - completed;
    const averageProgress = total > 0 ? processedJourneys.reduce((s, j) => s + j.progress, 0) / total : 0;
    return { total, completed, inProgress, averageProgress };
  }, [processedJourneys]);

  const handleFormClick = (userJourneyId, formId) => {
    if (formId) {
      router.push(`/forms/${formId}?journeyId=${userJourneyId}`);
    }
  };

  const cashlessJourneySteps = [
    { step: 1, title: "Medical Emergency/Planned Treatment", description: "Patient experiences medical need...", timeline: "Immediate", who: "Patient", icon: AlertCircle, color: "bg-[#27A395]" },
    { step: 2, title: "Select Network Hospital", description: "Patient must choose from insurer's approved...", timeline: "Immediate", who: "Patient", icon: Shield, color: "bg-[#33A8D3]" },
    { step: 3, title: "Hospital Admission", description: "Patient admission process begins...", timeline: "Immediate upon arrival", who: "Patient and Hospital staff", icon: User, color: "bg-[#354B62]" },
    { step: 4, title: "Intimation to Insurer/TPA", description: "Formal notification to insurance company...", timeline: "Within 24 hours...", who: "Hospital staff or patient", icon: FileText, color: "bg-[#27A395]" },
    { step: 5, title: "Pre-Authorization Request", description: "Hospital submits formal pre-authorization...", timeline: "Within 6 hours...", who: "Hospital insurance desk", icon: Clock, color: "bg-[#33A8D3]" },
    { step: 6, title: "Document Submission", description: "Hospital and patient submit required...", timeline: "Along with pre-authorization...", who: "Hospital and Patient", icon: FileText, color: "bg-[#354B62]" },
    { step: 7, title: "TPA/Insurer Review", description: "Medical necessity review...", timeline: "1-4 hours...", who: "TPA medical team", icon: Shield, color: "bg-[#27A395]" },
    { step: 8, title: "Pre-Authorization Decision", description: "Approval, rejection, or query...", timeline: "After completion of review", who: "TPA/Insurer", icon: CheckCircle, color: "bg-[#33A8D3]" },
    { step: 9, title: "Treatment Begins (if approved)", description: "Hospital medical team begins...", timeline: "Immediately after approval", who: "Hospital medical TCM", icon: User, color: "bg-[#354B62]" },
    { step: 10, title: "Treatment Completion", description: "Medical team completes treatment...", timeline: "As per medical requirements", who: "Medical team", icon: CheckCircle, color: "bg-[#27A395]" },
    { step: 11, title: "Final Bill Generation", description: "Comprehensive bill preparation...", timeline: "At the time of discharge", who: "Hospital billing", icon: FileText, color: "bg-[#33A8D3]" },
    { step: 12, title: "Final Settlement with TPA", description: "Direct settlement between hospital...", timeline: "24-48 hours post-discharge", who: "Hospital & TPA", icon: TrendingUp, color: "bg-[#354B62]" },
    { step: 13, title: "Patient Discharge", description: "Patient leaves hospital after settlement...", timeline: "After settlement", who: "Patient", icon: User, color: "bg-[#27A395]" },
  ].map(s => ({ ...s, gradient: `${s.color} to-[#2BB9A8]` }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#27A395] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-base font-semibold text-gray-700">Loading Your Journeys</h3>
          <p className="text-sm text-gray-500 mt-2">Fetching your latest data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center max-w-sm mx-auto p-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Data</h3>
          <p className="text-sm text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#27A395] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#229b87] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Cashless User Journey</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
            Track your insurance claims and understand the complete cashless claim process
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Total Journeys</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Completed</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1">{stats.completed}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">In Progress</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-600 mt-1">{stats.inProgress}</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Avg Progress</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600 mt-1">
                  {stats.averageProgress.toFixed(1)}%
                </p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-1 bg-white rounded-xl p-1.5 shadow-md border border-gray-100 mb-6">
          <button
            onClick={() => setActiveTab('journeys')}
            className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm sm:text-base transition-all ${
              activeTab === 'journeys'
                ? 'bg-[#27A395] text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Your Journeys
          </button>
          <button
            onClick={() => setActiveTab('process')}
            className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm sm:text-base transition-all ${
              activeTab === 'process'
                ? 'bg-[#27A395] text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Claim Process
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <div className="relative">
            <button
              onClick={() => setShowJourneyMenu(v => !v)}
              disabled={creating}
              className="bg-[#27A395] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#229b87] transition-colors inline-flex items-center gap-2"
            >
              {creating ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Start New Journey
              <ChevronDown className={`w-4 h-4 transition-transform ${showJourneyMenu ? 'rotate-180' : ''}`} />
            </button>

            {showJourneyMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10">
                <button
                  onClick={() => createNewJourney('CASHLESS')}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 text-[#27A395]" />
                  Cashless Claim
                </button>
                <button
                  onClick={() => createNewJourney('REIMBURSEMENT')}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 border-t border-gray-200"
                >
                  <FileText className="w-4 h-4 text-[#33A8D3]" />
                  Reimbursement Claim
                </button>
              </div>
            )}
          </div>
        </div>

        {activeTab === 'journeys' ? (
          <div>
            {processedJourneys.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
                <p className="text-sm text-gray-600 mb-6">You haven't started any claim journeys yet.</p>
                <div className="relative inline-block">
                  <button
                    onClick={() => setShowJourneyMenu(v => !v)}
                    disabled={creating}
                    className="bg-[#27A395] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#229b87] transition-colors inline-flex items-center gap-2"
                  >
                    {creating ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                    Start New Journey
                    <ChevronDown className={`w-4 h-4 transition-transform ${showJourneyMenu ? 'rotate-180' : ''}`} />
                  </button>
                  {showJourneyMenu && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10">
                      <button
                        onClick={() => createNewJourney('CASHLESS')}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Shield className="w-4 h-4 text-[#27A395]" />
                        Cashless Claim
                      </button>
                      <button
                        onClick={() => createNewJourney('REIMBURSEMENT')}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 border-t border-gray-200"
                      >
                        <FileText className="w-4 h-4 text-[#33A8D3]" />
                        Reimbursement Claim
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {processedJourneys.map(journey => (
                  <div key={journey.id} className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                              {journey.journeyCode === 'CASHLESS' ? 'Cashless Claim Journey' : 'Reimbursement Claim Journey'}
                            </h3>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${journey.journeyCode === 'CASHLESS' ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'}`}>
                              {journey.journeyCode}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{journey.sortedSteps[0]?.title || 'Begin your claim process'}</p>
                          <div className="flex flex-wrap gap-3 mb-3">
                            <div className="flex items-center text-xs sm:text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              Created: {new Date(journey.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-xs sm:text-sm text-gray-500">
                              <FileText className="w-4 h-4 mr-1" />
                              {journey.formCount} forms
                            </div>
                            <div className="flex items-center text-xs sm:text-sm text-gray-500">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              {journey.completedActions}/{journey.totalActions} actions
                            </div>
                          </div>
                        </div>
                        <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ml-3 flex-shrink-0 ${journey.isCompleted ? 'bg-green-500' : 'bg-orange-500'}`} />
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>{journey.progress.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                          <div
                            className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${journey.isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-[#27A395] to-[#33A8D3]'}`}
                            style={{ width: `${journey.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Steps</h4>
                        <div className="grid gap-3">
                          {journey.sortedSteps.map(step => (
                            <div
                              key={step.id}
                              className={`flex flex-col sm:flex-row gap-3 p-3 rounded-lg border border-gray-200 bg-gradient-to-r from-white to-gray-50/50 ${step.isForm && !step.isCompleted ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
                              onClick={() => step.isForm && !step.isCompleted && handleFormClick(journey.id, step.formId)}
                            >
                              <div className="flex-shrink-0">
                                <div className={`w-10 h-10 rounded-lg ${step.isCompleted ? 'bg-green-500' : 'bg-[#27A395]'} flex items-center justify-center text-white shadow-md`}>
                                  {step.isCompleted ? <CheckCircle className="w-5 h-5" /> : <span className="text-sm font-bold">{step.sequentialOrder}</span>}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                                  <div className="flex items-start space-x-2 mb-2 sm:mb-0">
                                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                      Step {step.sequentialOrder}
                                      {journey.nextIncompleteStep?.id === step.id && ' (Next)'}
                                    </span>
                                    <h5 className="text-base font-semibold text-gray-900">{step.title}</h5>
                                  </div>
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {step.isAction ? 'Action' : 'Form'}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${journey.isCompleted ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                          {journey.isCompleted ? 'Completed' : 'In Progress'}
                        </span>
                        <button className="text-[#27A395] hover:text-[#229b87] font-semibold text-xs sm:text-sm inline-flex items-center">
                          View Details
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#354B62] to-[#27A395] p-5 sm:p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">Cashless Claim Process</h2>
                  <p className="text-white/90 text-sm sm:text-base">Complete step-by-step guide for hassle-free cashless claims</p>
                </div>
                <div className="sm:flex hidden">
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="text-lg sm:text-xl font-bold">13 Steps</div>
                    <div className="text-xs sm:text-sm opacity-90">To Complete</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="grid gap-4">
                {cashlessJourneySteps.map(step => (
                  <div key={step.step} className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-gray-50/50">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-lg ${step.color} flex items-center justify-center text-white shadow-md`}>
                        <step.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                        <div className="flex items-start space-x-2 mb-2 sm:mb-0">
                          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">Step {step.step}</span>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{step.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <Clock className="w-3 h-3 mr-1" />
                            {step.timeline}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <User className="w-3 h-3 mr-1" />
                            {step.who}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
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

export default UserJourneyTimeline;