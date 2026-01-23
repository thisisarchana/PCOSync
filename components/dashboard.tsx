"use client"

import { useApp, type Screen } from "@/lib/app-context"
import { BlobShape, FlowerShape, StarBurst, CircleDecor, Zigzag } from "./decorative-shapes"
import { 
  FileText, 
  ClipboardCheck, 
  Utensils, 
  Dumbbell, 
  Heart, 
  BookOpen, 
  Users,
  ChevronRight,
  Sparkles,
  Zap
} from "lucide-react"

interface FeatureCard {
  id: Screen
  title: string
  description: string
  icon: typeof FileText
  color: string
  bgColor: string
}

const features: FeatureCard[] = [
  {
    id: "medical-analyzer",
    title: "Medical Report Analyzer",
    description: "Upload and understand your medical reports with AI-powered explanations",
    icon: FileText,
    color: "#FF69B4",
    bgColor: "#FFE4EC",
  },
  {
    id: "risk-assessment",
    title: "PCOS Risk Assessment",
    description: "Take a quick assessment to understand your PCOS risk level",
    icon: ClipboardCheck,
    color: "#00D9A0",
    bgColor: "#D4FFF0",
  },
  {
    id: "diet",
    title: "Diet Personalization",
    description: "Get personalized PCOS-friendly meal plans tailored for you",
    icon: Utensils,
    color: "#FFD700",
    bgColor: "#FFF9D4",
  },
  {
    id: "exercise",
    title: "Exercise Guidance",
    description: "Discover workouts designed for PCOS symptom management",
    icon: Dumbbell,
    color: "#DDA0DD",
    bgColor: "#F8E8F8",
  },
  {
    id: "mental-health",
    title: "Mental Health Support",
    description: "Track your mood and access stress-relief resources",
    icon: Heart,
    color: "#FF7F7F",
    bgColor: "#FFE8E8",
  },
  {
    id: "education",
    title: "Educational Hub",
    description: "Learn about PCOS, myths vs facts, and when to seek help",
    icon: BookOpen,
    color: "#87CEEB",
    bgColor: "#E8F6FF",
  },
  {
    id: "community",
    title: "Community",
    description: "Connect with others on their PCOS journey",
    icon: Users,
    color: "#FFAB76",
    bgColor: "#FFF0E4",
  },
]

export function Dashboard() {
  const { setCurrentScreen, userProfile } = useApp()

  return (
    <div className="min-h-screen bg-[#FFF8DC] pb-8 ml-24">
      {/* Header */}
      <div className="relative overflow-hidden px-6 pt-12 pb-8">
        <BlobShape 
          className="absolute -top-16 -right-16 w-44 h-44" 
          color="#FF69B4" 
        />
        <FlowerShape 
          className="absolute top-12 right-4 w-14 h-14" 
          color="#FFD700" 
        />
        <StarBurst 
          className="absolute top-32 right-28 w-8 h-8" 
          color="#00D9A0" 
        />
        <CircleDecor 
          className="absolute top-24 right-20 w-4 h-4" 
          color="#DDA0DD" 
        />
        
        <div className="relative">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 bg-[#FFD700] rounded-full border-[3px] border-black">
            <Sparkles className="w-4 h-4 text-black" />
            <span className="text-sm font-black text-black uppercase tracking-wide">Welcome to</span>
          </div>
          <h1 className="text-5xl font-black text-black mb-3 tracking-tight">
            PCOSync
          </h1>
          <p className="text-lg font-bold text-black/70 leading-relaxed max-w-xs">
            Your companion for PCOS care & prevention
          </p>
          
          {userProfile.riskScore && (
            <div className="mt-5 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className={`w-4 h-4 rounded-full border-2 border-black ${
                userProfile.riskScore === "low" ? "bg-[#00D9A0]" :
                userProfile.riskScore === "medium" ? "bg-[#FFD700]" : "bg-[#FF7F7F]"
              }`} />
              <span className="text-base font-black text-black">
                Risk Level: {userProfile.riskScore.charAt(0).toUpperCase() + userProfile.riskScore.slice(1)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-[#FF69B4] rounded-2xl p-4 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <p className="text-3xl font-black text-black">7</p>
            <p className="text-xs font-bold text-black/80">Day Streak</p>
          </div>
          <div className="bg-[#00D9A0] rounded-2xl p-4 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center mb-2">
              <Utensils className="w-5 h-5 text-black" />
            </div>
            <p className="text-3xl font-black text-black">12</p>
            <p className="text-xs font-bold text-black/80">Meals Logged</p>
          </div>
          <div className="bg-[#FFD700] rounded-2xl p-4 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center mb-2">
              <Dumbbell className="w-5 h-5 text-black" />
            </div>
            <p className="text-3xl font-black text-black">5</p>
            <p className="text-xs font-bold text-black/80">Workouts</p>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="px-6">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-2xl font-black text-black">Explore Features</h2>
          <Zigzag className="w-16 h-4" color="#FF69B4" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => setCurrentScreen(feature.id)}
              className="rounded-3xl p-5 text-left transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col"
              style={{ 
                backgroundColor: feature.bgColor,
                transform: index % 2 === 0 ? 'rotate(-0.5deg)' : 'rotate(0.5deg)'
              }}
            >
              <div className="absolute -right-4 -bottom-4 opacity-30">
                <feature.icon className="w-20 h-20 text-black" />
              </div>
              
              <div className="relative flex flex-col gap-3">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-[3px] border-black"
                  style={{ backgroundColor: feature.color }}
                >
                  <feature.icon className="w-6 h-6 text-black" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-black text-black mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs font-semibold text-black/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                <div className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center shrink-0 self-end">
                  <ChevronRight className="w-5 h-5 text-black" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Privacy Note */}
      <div className="px-6 mt-8">
        <div className="bg-white rounded-2xl p-4 border-[3px] border-black">
          <p className="text-xs font-bold text-black/70 text-center leading-relaxed">
            Your data is private and secure. We never share your personal health information without your explicit consent.
          </p>
        </div>
      </div>
    </div>
  )
}
