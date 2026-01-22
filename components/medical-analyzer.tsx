"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { BlobShape, StarBurst, CircleDecor } from "./decorative-shapes"
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Info,
  Sparkles
} from "lucide-react"

interface AnalysisResult {
  parameter: string
  value: string
  status: "normal" | "attention" | "elevated"
  explanation: string
}

const mockAnalysisResults: AnalysisResult[] = [
  {
    parameter: "LH/FSH Ratio",
    value: "2.8",
    status: "elevated",
    explanation: "Your LH to FSH ratio is slightly higher than typical. In PCOS, this ratio is often above 2:1. This doesn't mean anything is wrong, but it's something your doctor might want to monitor.",
  },
  {
    parameter: "Testosterone",
    value: "52 ng/dL",
    status: "attention",
    explanation: "Your testosterone level is at the upper end of normal. Slightly elevated androgens are common in PCOS and can contribute to symptoms like acne or hair changes.",
  },
  {
    parameter: "Fasting Glucose",
    value: "95 mg/dL",
    status: "normal",
    explanation: "Great news! Your fasting glucose is within the healthy range. Maintaining stable blood sugar through diet and exercise helps manage PCOS symptoms.",
  },
  {
    parameter: "Insulin",
    value: "12 mIU/L",
    status: "normal",
    explanation: "Your insulin levels look good! This suggests your body is handling insulin well, which is positive for PCOS management.",
  },
  {
    parameter: "AMH",
    value: "6.2 ng/mL",
    status: "elevated",
    explanation: "AMH (Anti-Mullerian Hormone) is higher than average. In PCOS, this can indicate more follicles in the ovaries, which is one of the diagnostic criteria.",
  },
]

export function MedicalAnalyzer() {
  const { setCurrentScreen } = useApp()
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setIsAnalyzing(true)
      setTimeout(() => {
        setIsAnalyzing(false)
        setShowResults(true)
      }, 2000)
    }, 1500)
  }

  const getStatusColor = (status: AnalysisResult["status"]) => {
    switch (status) {
      case "normal":
        return { bg: "#00D9A0", icon: CheckCircle, label: "Normal" }
      case "attention":
        return { bg: "#FFD700", icon: AlertTriangle, label: "Attention" }
      case "elevated":
        return { bg: "#FF69B4", icon: Info, label: "Elevated" }
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF8DC] pb-28">
      {/* Header */}
      <div className="relative overflow-hidden px-6 pt-12 pb-6">
        <BlobShape 
          className="absolute -top-16 -right-16 w-40 h-40" 
          color="#FF69B4" 
        />
        <StarBurst 
          className="absolute top-16 right-8 w-10 h-10" 
          color="#FFD700" 
        />
        <CircleDecor 
          className="absolute top-28 right-24 w-5 h-5" 
          color="#00D9A0" 
        />
        
        <button
          onClick={() => setCurrentScreen("dashboard")}
          className="relative inline-flex items-center gap-2 px-4 py-2 mb-4 bg-white rounded-full border-[3px] border-black font-black text-black hover:bg-[#FFD700] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-[#FF69B4] border-[3px] border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <FileText className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-black text-black mb-2">
            Medical Report Analyzer
          </h1>
          <p className="text-base font-bold text-black/70 leading-relaxed">
            Upload your medical reports and get AI-powered explanations in simple, friendly language
          </p>
        </div>
      </div>

      <div className="px-6">
        {!showResults ? (
          <>
            {/* Upload Area */}
            <button
              onClick={handleUpload}
              type="button"
              className="w-full bg-white rounded-3xl p-8 border-[3px] border-dashed border-black hover:border-solid hover:bg-[#FFE4EC] transition-all cursor-pointer mb-6"
            >
              {isUploading ? (
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#FF69B4] border-[3px] border-black flex items-center justify-center animate-pulse">
                    <Upload className="w-10 h-10 text-black" />
                  </div>
                  <p className="text-xl font-black text-black">Uploading...</p>
                </div>
              ) : isAnalyzing ? (
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#00D9A0] border-[3px] border-black flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-black animate-spin" />
                  </div>
                  <p className="text-xl font-black text-black">Analyzing your report...</p>
                  <p className="text-sm font-bold text-black/70 mt-2">Our AI is reading and simplifying your results</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#FFE4EC] border-[3px] border-black flex items-center justify-center">
                    <Upload className="w-10 h-10 text-black" />
                  </div>
                  <p className="text-xl font-black text-black mb-2">
                    Tap to upload your report
                  </p>
                  <p className="text-sm font-bold text-black/60">
                    Supports PDF, JPG, PNG files
                  </p>
                </div>
              )}
            </button>

            {/* Supported Reports */}
            <div className="bg-white rounded-3xl p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-xl font-black text-black mb-4">Supported Reports</h3>
              <div className="space-y-3">
                {["Hormone Panel (LH, FSH, Testosterone)", "Blood Sugar & Insulin Tests", "Thyroid Function Tests", "Lipid Profile", "Ultrasound Reports"].map((report) => (
                  <div key={report} className="flex items-center gap-3 p-3 rounded-xl bg-[#D4FFF0] border-2 border-black">
                    <CheckCircle className="w-5 h-5 text-black" />
                    <span className="text-sm font-bold text-black">{report}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Results */}
            <div className="bg-[#D4FFF0] rounded-3xl p-6 mb-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#00D9A0] border-[3px] border-black flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-black text-black text-lg">Analysis Complete</h3>
                  <p className="text-xs font-bold text-black/70">5 parameters analyzed</p>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-white border-2 border-black">
                <p className="text-sm font-bold text-black leading-relaxed">
                  Overall, your results show some patterns common in PCOS. Remember, these findings help guide lifestyle choices and conversations with your doctor - they are not a diagnosis.
                </p>
              </div>
            </div>

            {/* Parameter Cards */}
            <div className="space-y-4">
              {mockAnalysisResults.map((result) => {
                const statusStyle = getStatusColor(result.status)
                const StatusIcon = statusStyle.icon
                
                return (
                  <div key={result.parameter} className="bg-white rounded-3xl p-5 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-black text-black">{result.parameter}</h4>
                        <p className="text-2xl font-black text-black">{result.value}</p>
                      </div>
                      <div 
                        className="px-3 py-1.5 rounded-full flex items-center gap-1.5 border-2 border-black"
                        style={{ backgroundColor: statusStyle.bg }}
                      >
                        <StatusIcon className="w-4 h-4 text-black" />
                        <span className="text-xs font-black text-black">
                          {statusStyle.label}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-black/70 leading-relaxed">
                      {result.explanation}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Reset Button */}
            <button
              onClick={() => setShowResults(false)}
              className="w-full mt-6 py-4 rounded-2xl bg-[#FF69B4] text-black font-black text-lg border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Analyze Another Report
            </button>
          </>
        )}
      </div>

      {/* Privacy Note */}
      <div className="px-6 mt-8">
        <div className="bg-white rounded-2xl p-4 border-[3px] border-black">
          <p className="text-xs font-bold text-black/70 text-center leading-relaxed">
            Your medical data is processed securely and never stored permanently. We respect your privacy.
          </p>
        </div>
      </div>
    </div>
  )
}
