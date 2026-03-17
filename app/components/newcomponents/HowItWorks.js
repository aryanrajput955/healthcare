"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileUp, 
  Stethoscope, 
  ShieldCheck, 
  Banknote, 
  Settings2, 
  SearchCode, 
  ClipboardCheck, 
  BarChart3, 
  ArrowRight 
} from 'lucide-react'

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('individuals')

  const individualSteps = [
    {
      id: 1,
      title: "Secure Upload",
      description: "Easily upload your medical documents and bills. Our system performs an immediate proactive validation check.",
      icon: FileUp,
    },
    {
      id: 2,
      title: "Expert Verification",
      description: "Our team of healthcare experts reviews your claim for accuracy, ensuring it meets all policy requirements.",
      icon: Stethoscope,
    },
    {
      id: 3,
      title: "Proactive Filing",
      description: "We file your fully validated claim with the insurance provider using optimized methods for the fastest processing.",
      icon: ShieldCheck,
    },
    {
      id: 4,
      title: "Payout/Settlement",
      description: "Receive your reimbursement quickly and directly. We track the process until settlement is complete.",
      icon: Banknote,
    }
  ]

  const hospitalSteps = [
    {
      id: 1,
      title: "Seamless Integration",
      description: "Connect our platform with your HMS for automated data synchronization and real-time status tracking.",
      icon: Settings2,
    },
    {
      id: 2,
      title: "Automated Scrubbing",
      description: "Our AI engine scrubs claims for coding errors and missing documentation before submission.",
      icon: SearchCode,
    },
    {
      id: 3,
      title: "Fast Pre-auth",
      description: "Expedite pre-authorization approvals with our integrated network, reducing patient wait times.",
      icon: ClipboardCheck,
    },
    {
      id: 4,
      title: "Revenue Optimization",
      description: "Reduce aging AR and minimize claim denials through proactive follow-ups and expert handling.",
      icon: BarChart3,
    }
  ]

  const steps = activeTab === 'individuals' ? individualSteps : hospitalSteps

  return (
    <section className="py-12 md:py-20 bg-[#0B1221] overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#33A8D3]/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#27A395]/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[900] text-white tracking-tight mb-6">
            How <span className="text-[#33A8D3]">ClaimTrue</span> Works
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
            Our streamlined process ensures your claims are handled with precision, speed, and absolute transparency.
          </p>
          
          {/* Custom Toggle Switch */}
          <div className="inline-flex p-1.5 bg-[#151D2C] border border-slate-800 rounded-2xl md:rounded-full mt-10 shadow-2xl relative">
            <button
              onClick={() => setActiveTab('individuals')}
              className={`relative z-10 px-6 sm:px-10 py-3.5 rounded-xl md:rounded-full text-xs sm:text-sm font-bold transition-colors duration-500 ${
                activeTab === 'individuals' ? 'text-white' : 'text-slate-400 hover:text-[#27A395]'
              }`}
            >
              For Individuals
            </button>
            <button
              onClick={() => setActiveTab('hospitals')}
              className={`relative z-10 px-6 sm:px-10 py-3.5 rounded-xl md:rounded-full text-xs sm:text-sm font-bold transition-colors duration-500 ${
                activeTab === 'hospitals' ? 'text-white' : 'text-slate-400 hover:text-[#27A395]'
              }`}
            >
              For Hospitals
            </button>
            
            <motion.div
              className="absolute top-1.5 left-1.5 h-[calc(100%-12px)] bg-gradient-to-r from-[#27A395] to-[#33A8D3] rounded-xl md:rounded-full z-0 shadow-lg"
              animate={{
                left: activeTab === 'individuals' ? '6px' : '50%',
                width: 'calc(50% - 6px)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </div>
        </motion.div>

        {/* Steps Grid */}
        <div className="relative min-h-[300px]">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[64px] left-[12%] right-[12%] h-1 bg-slate-800 rounded-full z-0 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#27A395] to-[#33A8D3]"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "circOut" }}
            />
          </div>

          {/* Vertical Connector Line (Mobile) */}
          <div className="lg:hidden absolute top-[64px] bottom-[100px] left-[44px] sm:left-[50%] w-0.5 bg-slate-800 z-0">
            <motion.div 
              className="w-full bg-gradient-to-b from-[#27A395] to-[#33A8D3]"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "circOut" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 lg:gap-x-12 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="contents" // This ensures the grid structure is preserved
              >
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      type: "spring", 
                      stiffness: 100, 
                      damping: 15 
                    }}
                    className="flex flex-row lg:flex-col items-center lg:items-center text-left lg:text-center group"
                  >
                    <div className="relative mb-0 lg:mb-10 mr-8 lg:mr-0 flex-shrink-0">
                      {/* Icon Container */}
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl lg:rounded-full bg-[#151D2C] shadow-2xl flex items-center justify-center p-3 relative z-10 border border-slate-800"
                      >
                        <div className="w-full h-full rounded-2xl lg:rounded-full bg-gradient-to-br from-[#1A2436] to-[#0B1221] flex items-center justify-center text-[#27A395] group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-[#27A395] group-hover:to-[#33A8D3] transition-all duration-500 shadow-inner">
                          <step.icon className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                        </div>
                      </motion.div>
                      
                      {/* Step Number Dot */}
                      <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-9 sm:h-9 bg-[#1A2436] rounded-full flex items-center justify-center shadow-lg z-20 border-2 border-slate-800">
                        <span className="text-[10px] sm:text-xs font-black text-white">{step.id}</span>
                      </div>

                      {/* Pulse Effect on Hover */}
                      <div className="absolute inset-4 bg-[#27A395]/20 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 active:scale-150" />
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-lg sm:text-xl font-[900] text-white mb-2 sm:mb-4 tracking-tight group-hover:text-[#27A395] transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-[280px]">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
