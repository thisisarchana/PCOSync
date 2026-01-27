"use client"

import React from "react"

import { useState, useRef } from "react"
import { useApp } from "@/lib/app-context"
import { BlobShape, StarBurst, CircleDecor } from "./decorative-shapes"
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Info,
  Sparkles,
  X
} from "lucide-react"

interface AnalysisResult {
  parameter: string
  value: string
  status: "normal" | "attention" | "elevated"
  explanation: string
}

interface AnalysisFeedback {
  overallAssessment: string
  keyFindings: string[]
  recommendations: string[]
  whenToSeeDoctors: string[]
}

const mockAnalysisResults: AnalysisResult[] = [
  { parameter: "LH", value: "10.5", status: "normal", explanation: "Luteinizing hormone is within normal range." },
  { parameter: "FSH", value: "15.2", status: "attention", explanation: "Follicle-stimulating hormone is slightly elevated." },
  { parameter: "Testosterone", value: "0.8", status: "elevated", explanation: "Testosterone levels are elevated, which may indicate polycystic ovary syndrome." },
  { parameter: "Blood Sugar", value: "95", status: "normal", explanation: "Blood sugar levels are within normal range." },
  { parameter: "Insulin", value: "12", status: "attention", explanation: "Insulin levels are slightly elevated." }
]

const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"]
const ALLOWED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png"]

export function MedicalAnalyzer() {
  const { setCurrentScreen } = useApp()
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState("pcos")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([])
  const [reportType, setReportType] = useState<string>("")
  const [feedback, setFeedback] = useState<AnalysisFeedback | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setUploadError("File type not supported. Please upload PDF, JPG, or PNG.")
      return false
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File is too large. Please upload a file under 10MB.")
      return false
    }
    return true
  }

  const handleFileSelect = (file: File) => {
    setUploadError(null)
    if (validateFile(file)) {
      setUploadedFile(file)
      handleUpload(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    try {
      // Convert file to base64
      const reader = new FileReader()
      reader.onload = async () => {
        const base64String = (reader.result as string).split(',')[1]
        const fileType = file.type === 'application/pdf' ? 'pdf' : 'image'

        setIsUploading(false)
        setIsAnalyzing(true)

        try {
          const response = await fetch('/api/analyze-report', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              base64Data: base64String,
              fileType: fileType,
            }),
          })

          if (!response.ok) {
            throw new Error('Analysis failed')
          }

          const data = await response.json()
          console.log("[v0] Analysis result:", data)

          if (data.parameters && data.parameters.length > 0) {
            setAnalysisResults(data.parameters)
            setReportType(data.reportType || 'Medical Report')
            setFeedback(data.feedback || null)
            setShowResults(true)
          } else {
            setUploadError('No medical parameters could be extracted from this image. Please upload a clear medical report.')
            setIsAnalyzing(false)
          }
        } catch (error) {
          console.error("[v0] API error:", error)
          setUploadError('Failed to analyze the report. Please try again with a clearer image.')
          setIsAnalyzing(false)
        }
      }

      reader.onerror = () => {
        setIsUploading(false)
        setUploadError('Failed to read the file.')
      }

      reader.readAsDataURL(file)
    } catch (error) {
      console.error("[v0] Error:", error)
      setIsUploading(false)
      setUploadError('An error occurred while processing your file.')
    }
  }

  const handleClearFile = () => {
    setUploadedFile(null)
    setUploadError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
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
            Upload and understand your PCOS medical reports
          </p>
        </div>
      </div>

      <div className="px-6">
        {!showResults ? (
          <>
            {/* Upload Area */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              onChange={handleInputChange}
              className="hidden"
              aria-label="Upload medical report"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              type="button"
              className={`w-full rounded-3xl p-8 border-[3px] border-dashed transition-all cursor-pointer mb-6 ${
                isDragging
                  ? "bg-[#FFE4EC] border-black border-solid"
                  : "bg-white border-black hover:bg-[#FFE4EC]"
              }`}
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
              ) : uploadedFile ? (
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#FFD700] border-[3px] border-black flex items-center justify-center">
                    <FileText className="w-10 h-10 text-black" />
                  </div>
                  <p className="text-lg font-black text-black mb-2 break-words max-w-xs mx-auto">
                    {uploadedFile.name}
                  </p>
                  <p className="text-xs font-bold text-black/60 mb-3">
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleClearFile()
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#FF69B4] border-2 border-black rounded-full text-xs font-bold text-black hover:bg-[#FF5199]"
                  >
                    <X className="w-3 h-3" />
                    Choose Different File
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#FFE4EC] border-[3px] border-black flex items-center justify-center">
                    <Upload className="w-10 h-10 text-black" />
                  </div>
                  <p className="text-xl font-black text-black mb-2">
                    Tap to upload your PCOS report
                  </p>
                  <p className="text-sm font-bold text-black/60 mb-3">
                    or drag and drop your file here
                  </p>
                  <p className="text-xs font-bold text-black/50">
                    Supports PDF, JPG, PNG (up to 10MB)
                  </p>
                </div>
              )}
            </button>

            {/* Error Message */}
            {uploadError && (
              <div className="mb-6 p-4 rounded-2xl bg-[#FFB6C1] border-[3px] border-black flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-black flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-black text-black text-sm">{uploadError}</p>
                </div>
              </div>
            )}

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
            {/* Results Header */}
            <div className="bg-[#FFE4EC] rounded-3xl p-6 mb-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl border-[3px] border-black flex items-center justify-center bg-[#FF69B4]">
                  <CheckCircle className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-black text-black text-lg">Analysis Complete - {reportType}</h3>
                  <p className="text-xs font-bold text-black/70">{analysisResults.length} parameters analyzed</p>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-white border-2 border-black">
                <p className="text-sm font-bold text-black leading-relaxed">
                  Your analysis shows hormonal patterns. Remember, these findings help guide lifestyle choices and conversations with your doctor.
                </p>
              </div>
            </div>

            {/* Feedback Section */}
            {feedback && (
              <div className="space-y-6 mb-6">
                {/* Overall Assessment */}
                <div className="bg-gradient-to-br from-[#FFE4EC] to-[#FFD700] rounded-3xl p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-lg font-black text-black mb-3 flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    Overall Assessment
                  </h3>
                  <p className="text-base font-bold text-black leading-relaxed">
                    {feedback.overallAssessment}
                  </p>
                </div>

                {/* Key Findings */}
                <div className="bg-white rounded-3xl p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-lg font-black text-black mb-4 flex items-center gap-2">
                    <span className="text-2xl">📋</span>
                    Key Findings
                  </h3>
                  <div className="space-y-3">
                    {feedback.keyFindings.map((finding, idx) => (
                      <div key={idx} className="flex gap-3 items-start p-3 rounded-xl bg-[#D4FFF0] border-2 border-black">
                        <span className="text-lg font-black text-black flex-shrink-0 pt-0.5">→</span>
                        <p className="text-sm font-bold text-black leading-relaxed">{finding}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-3xl p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-lg font-black text-black mb-4 flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    Recommendations
                  </h3>
                  <div className="space-y-3">
                    {feedback.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex gap-3 items-start p-3 rounded-xl bg-[#FFFACD] border-2 border-black">
                        <span className="text-lg font-black text-black flex-shrink-0 pt-0.5">✓</span>
                        <p className="text-sm font-bold text-black leading-relaxed">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* When to See Doctor */}
                <div className="bg-white rounded-3xl p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-lg font-black text-black mb-4 flex items-center gap-2">
                    <span className="text-2xl">👨‍⚕️</span>
                    When to See Your Doctor
                  </h3>
                  <div className="space-y-3">
                    {feedback.whenToSeeDoctors.map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-start p-3 rounded-xl bg-[#FFE4EC] border-2 border-black">
                        <span className="text-lg font-black text-black flex-shrink-0 pt-0.5">⚠️</span>
                        <p className="text-sm font-bold text-black leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Parameter Cards */}
            {analysisResults.length > 0 ? (
              <div className="space-y-4">
                {analysisResults.map((result, index) => {
                  const statusStyle = getStatusColor(result.status)
                  const StatusIcon = statusStyle.icon
                  
                  return (
                    <div key={index} className="bg-white rounded-3xl p-5 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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
            ) : (
              <div className="bg-white rounded-3xl p-6 border-[3px] border-black text-center">
                <AlertTriangle className="w-12 h-12 text-[#FFD700] mx-auto mb-3" />
                <p className="font-black text-black mb-2">No Parameters Found</p>
                <p className="text-sm font-bold text-black/70">The AI could not extract medical parameters from this report. Please ensure the image is clear and contains medical data.</p>
              </div>
            )}

            {/* Reset Button */}
            <button
              onClick={() => {
                setShowResults(false)
                setAnalysisResults([])
                setFeedback(null)
                setUploadedFile(null)
                if (fileInputRef.current) {
                  fileInputRef.current.value = ""
                }
              }}
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
