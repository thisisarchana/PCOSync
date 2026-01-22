"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { BlobShape, StarBurst, CircleDecor } from "./decorative-shapes"
import { 
  ArrowLeft, 
  BookOpen, 
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Sparkles
} from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface MythFact {
  myth: string
  fact: string
}

const pcosVsPcod: FAQItem[] = [
  {
    question: "What is PCOS?",
    answer: "Polycystic Ovary Syndrome (PCOS) is a hormonal disorder affecting women of reproductive age. It involves metabolic and reproductive issues, including irregular periods, excess androgen levels, and polycystic ovaries. PCOS is a syndrome, meaning it's a collection of symptoms.",
  },
  {
    question: "What is PCOD?",
    answer: "Polycystic Ovarian Disease (PCOD) is a condition where the ovaries release many immature or partially mature eggs, which eventually turn into cysts. It's generally considered a milder condition than PCOS and is more common.",
  },
  {
    question: "Key differences",
    answer: "PCOS is a metabolic disorder with more severe symptoms and potential complications like diabetes and heart disease. PCOD is primarily an ovarian issue that can often be managed with lifestyle changes. PCOS affects about 10% of women, while PCOD affects up to 30%.",
  },
  {
    question: "Treatment approaches",
    answer: "Both conditions benefit from lifestyle modifications including diet, exercise, and stress management. PCOS may require more intensive medical intervention, including medications for insulin resistance or fertility. PCOD often responds well to dietary changes and regular exercise.",
  },
]

const mythsVsFacts: MythFact[] = [
  {
    myth: "PCOS only affects overweight women",
    fact: "PCOS can affect women of any weight. While obesity can worsen symptoms, many women with PCOS are of normal weight or even underweight. It's a hormonal condition, not just a weight issue.",
  },
  {
    myth: "You cannot get pregnant with PCOS",
    fact: "Many women with PCOS conceive naturally or with medical assistance. While PCOS is a leading cause of infertility, it's very treatable. Lifestyle changes and medications can help regulate ovulation.",
  },
  {
    myth: "PCOS symptoms are the same for everyone",
    fact: "PCOS manifests differently in each person. Some may have irregular periods, others excess hair growth, acne, or weight gain. Not everyone has all symptoms, and severity varies widely.",
  },
  {
    myth: "Birth control pills cure PCOS",
    fact: "Birth control pills can help manage symptoms like irregular periods and acne, but they don't cure PCOS. They mask symptoms rather than address the underlying hormonal imbalance.",
  },
  {
    myth: "Only older women get PCOS",
    fact: "PCOS often begins during puberty, though symptoms may worsen with age. Many teens have PCOS. Early detection and management can prevent long-term complications.",
  },
  {
    myth: "Diet and exercise do not help PCOS",
    fact: "Lifestyle modifications are often the first-line treatment for PCOS. Regular exercise and a balanced diet can significantly improve insulin sensitivity, regulate periods, and reduce symptoms.",
  },
]

const warningSignsToSeeDoctor = [
  "Missed periods for 3+ months without pregnancy",
  "Very heavy or painful periods",
  "Difficulty getting pregnant after 12 months of trying",
  "Sudden or unexplained weight gain",
  "Excessive hair growth on face, chest, or back",
  "Severe acne that does not respond to treatment",
  "Dark patches of skin (acanthosis nigricans)",
  "Symptoms of depression or anxiety",
  "Signs of diabetes (excessive thirst, frequent urination)",
]

export function EducationalHub() {
  const { setCurrentScreen } = useApp()
  const [activeTab, setActiveTab] = useState<"pcos-pcod" | "myths" | "doctor">("pcos-pcod")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const [expandedMyth, setExpandedMyth] = useState<number | null>(null)

  const tabColors: Record<string, string> = {
    "pcos-pcod": "#87CEEB",
    "myths": "#FFD700",
    "doctor": "#FF69B4",
  }

  return (
    <div className="min-h-screen bg-[#FFF8DC] pb-28">
      {/* Header */}
      <div className="relative overflow-hidden px-6 pt-12 pb-6">
        <BlobShape 
          className="absolute -top-16 -right-16 w-40 h-40" 
          color="#87CEEB" 
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
          <div className="w-16 h-16 rounded-2xl bg-[#87CEEB] border-[3px] border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <BookOpen className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-black text-black mb-2">
            Educational Hub
          </h1>
          <p className="text-base font-bold text-black/70 leading-relaxed">
            Learn about PCOS with evidence-based information
          </p>
        </div>
      </div>

      <div className="px-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: "pcos-pcod", label: "PCOS vs PCOD" },
            { id: "myths", label: "Myths vs Facts" },
            { id: "doctor", label: "When to See a Doctor" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2.5 rounded-full whitespace-nowrap text-sm font-black transition-all border-[3px] ${
                activeTab === tab.id 
                  ? "border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" 
                  : "border-transparent hover:border-black/30"
              }`}
              style={{ backgroundColor: activeTab === tab.id ? tabColors[tab.id] : "white" }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* PCOS vs PCOD */}
        {activeTab === "pcos-pcod" && (
          <div className="space-y-4">
            <div className="bg-[#E8F6FF] rounded-3xl p-5 border-[3px] border-black mb-6" style={{ transform: 'rotate(-0.5deg)' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#87CEEB] border-2 border-black flex items-center justify-center">
                  <Info className="w-4 h-4 text-black" />
                </div>
                <span className="font-black text-black">Understanding the Difference</span>
              </div>
              <p className="text-sm font-bold text-black/70 leading-relaxed">
                While often used interchangeably, PCOS and PCOD are different conditions with distinct characteristics and treatment approaches.
              </p>
            </div>

            {pcosVsPcod.map((item, index) => (
              <div key={index} className="bg-white rounded-3xl overflow-hidden border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between"
                >
                  <h4 className="font-black text-black pr-4 text-lg">{item.question}</h4>
                  <div className="w-10 h-10 rounded-full bg-[#87CEEB] border-2 border-black flex items-center justify-center shrink-0">
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-black" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-black" />
                    )}
                  </div>
                </button>
                {expandedFaq === index && (
                  <div className="px-5 pb-5 border-t-2 border-black">
                    <p className="text-sm font-bold text-black/70 leading-relaxed pt-4">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Myths vs Facts */}
        {activeTab === "myths" && (
          <div className="space-y-4">
            <div className="bg-[#FFF9D4] rounded-3xl p-5 border-[3px] border-black mb-6" style={{ transform: 'rotate(0.5deg)' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#FFD700] border-2 border-black flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-black" />
                </div>
                <span className="font-black text-black">Separating Fact from Fiction</span>
              </div>
              <p className="text-sm font-bold text-black/70 leading-relaxed">
                There is a lot of misinformation about PCOS. Here is the truth behind common myths.
              </p>
            </div>

            {mythsVsFacts.map((item, index) => (
              <div key={index} className="bg-white rounded-3xl overflow-hidden border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <button
                  onClick={() => setExpandedMyth(expandedMyth === index ? null : index)}
                  className="w-full p-5 text-left"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#FF7F7F] border-2 border-black flex items-center justify-center shrink-0">
                      <XCircle className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-black bg-[#FF7F7F] px-2 py-0.5 rounded border border-black">MYTH</span>
                      <p className="font-black text-black mt-1">{item.myth}</p>
                    </div>
                  </div>
                  {expandedMyth === index && (
                    <div className="flex items-start gap-3 mt-4 pt-4 border-t-2 border-black">
                      <div className="w-8 h-8 rounded-full bg-[#00D9A0] border-2 border-black flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-black" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-black bg-[#00D9A0] px-2 py-0.5 rounded border border-black">FACT</span>
                        <p className="text-sm font-bold text-black/70 leading-relaxed mt-1">{item.fact}</p>
                      </div>
                    </div>
                  )}
                  {expandedMyth !== index && (
                    <p className="text-xs font-bold text-[#87CEEB] mt-2 ml-11">Tap to reveal the truth</p>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* When to See a Doctor */}
        {activeTab === "doctor" && (
          <div className="space-y-4">
            <div className="bg-[#FFE4EC] rounded-3xl p-5 border-[3px] border-black mb-6" style={{ transform: 'rotate(-0.3deg)' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#FF69B4] border-2 border-black flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-black" />
                </div>
                <span className="font-black text-black">Know the Warning Signs</span>
              </div>
              <p className="text-sm font-bold text-black/70 leading-relaxed">
                While lifestyle changes help manage PCOS, some symptoms require professional evaluation. Consider seeing a doctor if you experience:
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="space-y-3">
                {warningSignsToSeeDoctor.map((sign, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-[#FFF8DC] border-2 border-black"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#FF69B4] border-2 border-black flex items-center justify-center shrink-0">
                      <span className="text-xs font-black text-black">{index + 1}</span>
                    </div>
                    <span className="text-sm font-bold text-black leading-relaxed">{sign}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="font-black text-black mb-4 text-lg">What to Expect at Your Appointment</h4>
              <ul className="space-y-3 text-sm font-bold text-black/70">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#87CEEB] border border-black mt-1.5 shrink-0" />
                  Discussion of your symptoms and medical history
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#87CEEB] border border-black mt-1.5 shrink-0" />
                  Physical examination
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#87CEEB] border border-black mt-1.5 shrink-0" />
                  Blood tests to check hormone levels
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#87CEEB] border border-black mt-1.5 shrink-0" />
                  Possibly an ultrasound to examine your ovaries
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#87CEEB] border border-black mt-1.5 shrink-0" />
                  Discussion of treatment options based on your goals
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
