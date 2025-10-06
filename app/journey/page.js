'use client';

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle, Clock, AlertCircle, User, Calendar, ArrowRight, TrendingUp, FileText, Shield, ChevronRight } from 'lucide-react';

const UserJourneyTimeline = () => {
  const [userJourneys, setUserJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState('journeys');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const fetchUserJourneys = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = 'mock-jwt-token';
        const response = await fetch('http://localhost:3010/user-journey/user/1', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        setUserJourneys(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserJourneys();
  }, [isClient]);

  // Process userJourneys to determine completion status with more detailed info
  const processedJourneys = useMemo(() => {
    return userJourneys.map((uj) => {
      const formCount = uj.formResponses?.length || 0;
      const completedActions = uj.actionResponses?.filter(ar => ar.response?.completed === true).length || 0;
      const totalActions = uj.actionResponses?.length || 0;
      const progress = totalActions > 0 ? (completedActions / totalActions) * 100 : formCount > 0 ? 100 : 0;
      
      return {
        ...uj,
        isCompleted: progress === 100,
        progress,
        formCount,
        completedActions,
        totalActions,
        lastUpdated: uj.updatedAt || uj.createdAt
      };
    });
  }, [userJourneys]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = processedJourneys.length;
    const completed = processedJourneys.filter(j => j.isCompleted).length;
    const inProgress = total - completed;
    const averageProgress = total > 0 ? processedJourneys.reduce((sum, j) => sum + j.progress, 0) / total : 0;

    return { total, completed, inProgress, averageProgress };
  }, [processedJourneys]);

  // Cashless Claim Journey Data from PDF
  const cashlessJourneySteps = [
    {
      step: 1,
      title: "Medical Emergency/Planned Treatment",
      description: "Patient experiences medical need and recognizes need for medical attention",
      timeline: "Immediate",
      who: "Patient",
      icon: AlertCircle,
      color: "bg-[#27A395]",
      gradient: "from-[#27A395] to-[#2BB9A8]"
    },
    {
      step: 2,
      title: "Select Network Hospital",
      description: "Patient must choose from insurer's approved network hospitals for cashless facility",
      timeline: "Immediate",
      who: "Patient",
      icon: Shield,
      color: "bg-[#33A8D3]",
      gradient: "from-[#33A8D3] to-[#3BB6E3]"
    },
    {
      step: 3,
      title: "Hospital Admission",
      description: "Patient admission process begins, insurance card and documents verified",
      timeline: "Immediate upon arrival",
      who: "Patient and Hospital staff",
      icon: User,
      color: "bg-[#354B62]",
      gradient: "from-[#354B62] to-[#405875]"
    },
    {
      step: 4,
      title: "Intimation to Insurer/TPA",
      description: "Formal notification to insurance company/TPA about admission",
      timeline: "Within 24 hours for emergency, 48 hours before planned admission",
      who: "Hospital staff or patient",
      icon: FileText,
      color: "bg-[#27A395]",
      gradient: "from-[#27A395] to-[#2BB9A8]"
    },
    {
      step: 5,
      title: "Pre-Authorization Request",
      description: "Hospital submits formal pre-authorization request to TPA",
      timeline: "Within 6 hours of admission",
      who: "Hospital insurance desk",
      icon: Clock,
      color: "bg-[#33A8D3]",
      gradient: "from-[#33A8D3] to-[#3BB6E3]"
    },
    {
      step: 6,
      title: "Document Submission",
      description: "Hospital and patient submit required documents with pre-authorization request",
      timeline: "Along with pre-authorization request",
      who: "Hospital and Patient together",
      icon: FileText,
      color: "bg-[#354B62]",
      gradient: "from-[#354B62] to-[#405875]"
    },
    {
      step: 7,
      title: "TPA/Insurer Review",
      description: "Medical necessity review, policy coverage verification, cost analysis",
      timeline: "1-4 hours for emergency cases, 1-2 days for planned procedures",
      who: "TPA medical team and claim processors",
      icon: Shield,
      color: "bg-[#27A395]",
      gradient: "from-[#27A395] to-[#2BB9A8]"
    },
    {
      step: 8,
      title: "Pre-Authorization Decision",
      description: "Approval, rejection, or query raised based on review",
      timeline: "After completion of review",
      who: "TPA/Insurer authority",
      icon: CheckCircle,
      color: "bg-[#33A8D3]",
      gradient: "from-[#33A8D3] to-[#3BB6E3]"
    },
    {
      step: 9,
      title: "Treatment Begins (if approved)",
      description: "Hospital medical team begins treatment as per approved procedures and amounts",
      timeline: "Immediately after approval confirmation",
      who: "Hospital medical team",
      icon: User,
      color: "bg-[#354B62]",
      gradient: "from-[#354B62] to-[#405875]"
    },
    {
      step: 10,
      title: "Treatment Completion",
      description: "Medical team completes treatment and records all details for final billing",
      timeline: "As per medical requirements",
      who: "Medical team",
      icon: CheckCircle,
      color: "bg-[#27A395]",
      gradient: "from-[#27A395] to-[#2BB9A8]"
    },
    {
      step: 11,
      title: "Final Bill Generation",
      description: "Comprehensive bill preparation including all charges, matched against pre-authorized amounts",
      timeline: "At the time of discharge",
      who: "Hospital billing department",
      icon: FileText,
      color: "bg-[#33A8D3]",
      gradient: "from-[#33A8D3] to-[#3BB6E3]"
    },
    {
      step: 12,
      title: "Final Settlement with TPA",
      description: "Direct settlement between hospital and insurance company with bill verification",
      timeline: "24-48 hours post-discharge",
      who: "Hospital billing team and TPA",
      icon: TrendingUp,
      color: "bg-[#354B62]",
      gradient: "from-[#354B62] to-[#405875]"
    },
    {
      step: 13,
      title: "Patient Discharge",
      description: "Patient leaves hospital after settlement completion, paying only co-payment and non-covered items",
      timeline: "After settlement completion",
      who: "Patient",
      icon: User,
      color: "bg-[#27A395]",
      gradient: "from-[#27A395] to-[#2BB9A8]"
    }
  ];

  // Loading State
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

  // Error State
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
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Cashless User Journey</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
            Track your insurance claims and understand the complete cashless claim process
          </p>
        </div>

        {/* Stats Overview */}
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
                <p className="text-xl sm:text-2xl font-bold text-purple-600 mt-1">{stats.averageProgress.toFixed(1)}%</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white rounded-xl p-1.5 shadow-md border border-gray-100 mb-6 max-w-full">
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

        {/* Content based on active tab */}
        {activeTab === 'journeys' ? (
          /* Your Journeys Data Section */
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Your Claim Journeys</h2>
              <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {processedJourneys.length} items
              </span>
            </div>

            {processedJourneys.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Journeys Found</h3>
                <p className="text-sm text-gray-600 mb-4">You don't have any active insurance claim journeys yet.</p>
                <button className="bg-[#27A395] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#229b87] transition-colors inline-flex items-center">
                  Start New Claim
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {processedJourneys.map((journey) => (
                  <div
                    key={journey.id}
                    className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                            {journey.journey?.title || 'Untitled Journey'}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {journey.journey?.description || 'No description available'}
                          </p>
                          
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
                        
                        <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ml-3 flex-shrink-0 ${
                          journey.isCompleted ? 'bg-green-500' : 'bg-orange-500'
                        }`} />
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>{journey.progress.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                          <div
                            className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                              journey.isCompleted 
                                ? 'bg-green-500' 
                                : 'bg-gradient-to-r from-[#27A395] to-[#33A8D3]'
                            }`}
                            style={{ width: `${journey.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                          journey.isCompleted
                            ? 'bg-green-100 text-green-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
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
          /* Cashless Claim Process Section */
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
                {cashlessJourneySteps.map((step) => (
                  <div
                    key={step.step}
                    className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-gray-50/50"
                  >
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-lg ${step.color} flex items-center justify-center text-white shadow-md`}>
                        <step.icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                        <div className="flex items-start space-x-2 mb-2 sm:mb-0">
                          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            Step {step.step}
                          </span>
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
                      
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Process Summary */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Process Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-[#27A395] to-[#2BB9A8] rounded-xl text-white shadow-md">
                    <Clock className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-lg font-bold mb-1">Immediate Start</div>
                    <div className="text-sm text-white/80">Quick initiation process</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-[#33A8D3] to-[#3BB6E3] rounded-xl text-white shadow-md">
                    <FileText className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-lg font-bold mb-1">24-48 Hours</div>
                    <div className="text-sm text-white/80">Final settlement time</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-[#354B62] to-[#405875] rounded-xl text-white shadow-md">
                    <Shield className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-lg font-bold mb-1">Network Hospitals</div>
                    <div className="text-sm text-white/80">Approved providers only</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserJourneyTimeline;