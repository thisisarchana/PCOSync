"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { BlobShape, StarBurst, CircleDecor } from "./decorative-shapes"
import { 
  ArrowLeft, 
  ClipboardCheck, 
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Sparkles
} from "lucide-react"

interface Question {
  id: string
  question: string
  options: { value: number; label: string }[]
}

const questions: Question[] = [
  {
    id: "cycle",
    question: "How regular is your menstrual cycle?",
    options: [
      { value: 0, label: "Regular (every 21-35 days)" },
      { value: 1, label: "Slightly irregular (varies by a week)" },
      { value: 2, label: "Very irregular (unpredictable)" },
      { value: 3, label: "Absent for 3+ months" },
    ],
  },
  {
    id: "weight",
    question: "Have you experienced unexplained weight gain?",
    options: [
      { value: 0, label: "No weight changes" },
      { value: 1, label: "Mild weight gain" },
      { value: 2, label: "Moderate weight gain, especially around midsection" },
      { value: 3, label: "Significant weight gain despite diet/exercise" },
    ],
  },
  {
    id: "hair",
    question: "Do you notice excess hair growth on face, chest, or back?",
    options: [
      { value: 0, label: "No excess hair" },
      { value: 1, label: "Minimal excess hair" },
      { value: 2, label: "Noticeable excess hair" },
      { value: 3, label: "Significant excess hair" },
    ],
  },
  {
    id: "acne",
    question: "How would you describe your skin condition?",
    options: [
      { value: 0, label: "Clear skin" },
      { value: 1, label: "Occasional breakouts" },
      { value: 2, label: "Persistent acne, especially on jawline" },
      { value: 3, label: "Severe, cystic acne" },
    ],
  },
  {
    id: "fatigue",
    question: "Do you experience fatigue or energy fluctuations?",
    options: [
      { value: 0, label: "Generally energetic" },
      { value: 1, label: "Occasional tiredness" },
      { value: 2, label: "Frequent fatigue" },
      { value: 3, label: "Constant exhaustion" },
    ],
  },
  {
    id: "family",
    question: "Is there a family history of PCOS or diabetes?",
    options: [
      { value: 0, label: "No family history" },
      { value: 1, label: "Distant relatives" },
      { value: 2, label: "Immediate family member" },
      { value: 3, label: "Multiple family members" },
    ],
  },
]

const preventiveSuggestions = {
  low: [
    "Continue your healthy lifestyle habits",
    "Maintain regular exercise routine",
    "Keep a balanced diet rich in whole foods",
    "Schedule routine check-ups annually",
  ],
  medium: [
    "Consider tracking your menstrual cycle",
    "Focus on anti-inflammatory foods",
    "Incorporate regular physical activity",
    "Manage stress through relaxation techniques",
    "Discuss screening with your healthcare provider",
  ],
  high: [
    "Schedule an appointment with a gynecologist or endocrinologist",
    "Request hormone panel and ultrasound tests",
    "Start a PCOS-friendly diet plan",
    "Begin a regular exercise routine",
    "Consider stress management and mental health support",
    "Join a PCOS support community",
  ],
}

export function RiskAssessment() {
  const { setCurrentScreen, setUserProfile, userProfile } = useApp()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)

  const calculateRisk = (): "low" | "medium" | "high" => {
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0)
    const maxScore = questions.length * 3
    const percentage = (totalScore / maxScore) * 100

    if (percentage <= 25) return "low"
    if (percentage <= 55) return "medium"
    return "high"
  }

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const risk = calculateRisk()
      setUserProfile({ ...userProfile, riskScore: risk })
      setShowResults(true)
    }
  }

  const risk = showResults ? calculateRisk() : null

  const getRiskStyles = (level: "low" | "medium" | "high") => {
    switch (level) {
      case "low":
        return { bg: "#00D9A0", light: "#D4FFF0" }
      case "medium":
        return { bg: "#FFD700", light: "#FFF9D4" }
      case "high":
        return { bg: "#FF69B4", light: "#FFE4EC" }
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF8DC] pb-28">
      {/* Header */}
      <div className="relative overflow-hidden px-6 pt-12 pb-6">
        <BlobShape 
          className="absolute -top-16 -right-16 w-40 h-40" 
          color="#00D9A0" 
        />
        <StarBurst 
          className="absolute top-16 right-8 w-10 h-10" 
          color="#FFD700" 
        />
        <CircleDecor 
          className="absolute top-28 right-24 w-5 h-5" 
          color="#FF69B4" 
        />
        
        <button
          onClick={() => setCurrentScreen("dashboard")}
          className="relative inline-flex items-center gap-2 px-4 py-2 mb-4 bg-white rounded-full border-[3px] border-black font-black text-black hover:bg-[#FFD700] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-[#00D9A0] border-[3px] border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <ClipboardCheck className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-black text-black mb-2">
            PCOS Risk Assessment
          </h1>
          <p className="text-base font-bold text-black/70 leading-relaxed">
            Answer a few questions to understand your risk level and get personalized recommendations
          </p>
        </div>
      </div>

      <div className="px-6">
        {!showResults ? (
          <>
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm font-bold text-black mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(((currentQuestion) / questions.length) * 100)}% complete</span>
              </div>
              <div className="h-4 bg-white rounded-full overflow-hidden border-[3px] border-black">
                <div 
                  className="h-full bg-[#00D9A0] transition-all duration-300"
                  style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl p-6 mb-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-xl font-black text-black mb-6 leading-relaxed">
                {questions[currentQuestion].question}
              </h3>
              
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full p-4 rounded-2xl bg-[#FFF8DC] text-left hover:bg-[#D4FFF0] transition-colors flex items-center justify-between border-2 border-black hover:border-[3px] group"
                  >
                    <span className="text-black font-bold">{option.label}</span>
                    <div className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center group-hover:bg-[#00D9A0] transition-colors">
                      <ChevronRight className="w-5 h-5 text-black" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : risk && (
          <>
            {/* Results Card */}
            <div 
              className="rounded-3xl p-6 mb-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              style={{ backgroundColor: getRiskStyles(risk).light }}
            >
              <div className="text-center mb-6">
                <div 
                  className="w-24 h-24 mx-auto rounded-full border-[3px] border-black flex items-center justify-center mb-4"
                  style={{ backgroundColor: getRiskStyles(risk).bg }}
                >
                  {risk === "low" ? (
                    <CheckCircle className="w-12 h-12 text-black" />
                  ) : risk === "medium" ? (
                    <AlertTriangle className="w-12 h-12 text-black" />
                  ) : (
                    <Sparkles className="w-12 h-12 text-black" />
                  )}
                </div>
                <h2 className="text-3xl font-black text-black mb-2">
                  {risk === "low" ? "Low Risk" : risk === "medium" ? "Moderate Risk" : "Higher Risk"}
                </h2>
                <p className="text-base font-bold text-black/70 leading-relaxed">
                  {risk === "low" 
                    ? "Your responses suggest a lower likelihood of PCOS. Keep up your healthy habits!"
                    : risk === "medium"
                    ? "Some of your responses indicate potential PCOS-related patterns. Consider discussing with a healthcare provider."
                    : "Your responses suggest you may benefit from a professional evaluation. This assessment is a starting point, not a diagnosis."}
                </p>
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-3xl p-6 mb-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-xl font-black text-black mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#FFD700] border-2 border-black flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-black" />
                </div>
                Personalized Suggestions
              </h3>
              <div className="space-y-3">
                {preventiveSuggestions[risk].map((suggestion, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl border-2 border-black"
                    style={{ backgroundColor: getRiskStyles(risk).light }}
                  >
                    <div 
                      className="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center shrink-0"
                      style={{ backgroundColor: getRiskStyles(risk).bg }}
                    >
                      <span className="text-xs font-black text-black">{index + 1}</span>
                    </div>
                    <span className="text-sm font-bold text-black leading-relaxed">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Retake Button */}
            <button
              onClick={() => {
                setCurrentQuestion(0)
                setAnswers({})
                setShowResults(false)
              }}
              className="w-full py-4 rounded-2xl bg-[#00D9A0] text-black font-black text-lg border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Retake Assessment
            </button>
          </>
        )}
      </div>

      {/* Disclaimer */}
      <div className="px-6 mt-8">
        <div className="bg-white rounded-2xl p-4 border-[3px] border-black">
          <p className="text-xs font-bold text-black/70 text-center leading-relaxed">
            This assessment is for educational purposes only and is not a medical diagnosis. Please consult a healthcare professional for proper evaluation.
          </p>
        </div>
      </div>
    </div>
  )
}
