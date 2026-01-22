"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { BlobShape, StarBurst, CircleDecor } from "./decorative-shapes"
import { 
  ArrowLeft, 
  Heart, 
  Smile,
  Meh,
  Frown,
  Sun,
  Cloud,
  Sparkles,
  Wind,
  Music,
  BookOpen,
  Coffee
} from "lucide-react"

interface MoodOption {
  value: number
  label: string
  icon: typeof Smile
  color: string
}

interface SelfCareTip {
  id: string
  title: string
  description: string
  icon: typeof Wind
  duration: string
  color: string
}

const moodOptions: MoodOption[] = [
  { value: 5, label: "Great", icon: Sun, color: "#00D9A0" },
  { value: 4, label: "Good", icon: Smile, color: "#87CEEB" },
  { value: 3, label: "Okay", icon: Cloud, color: "#FFD700" },
  { value: 2, label: "Low", icon: Meh, color: "#FFAB76" },
  { value: 1, label: "Struggling", icon: Frown, color: "#FF7F7F" },
]

const selfCareTips: SelfCareTip[] = [
  {
    id: "breathing",
    title: "Deep Breathing",
    description: "Practice 4-7-8 breathing: Inhale for 4 seconds, hold for 7, exhale for 8. Repeat 4 times.",
    icon: Wind,
    duration: "5 min",
    color: "#87CEEB",
  },
  {
    id: "journaling",
    title: "Gratitude Journaling",
    description: "Write down 3 things you are grateful for today. Focus on small moments of joy.",
    icon: BookOpen,
    duration: "10 min",
    color: "#FFD700",
  },
  {
    id: "music",
    title: "Mood-Lifting Playlist",
    description: "Listen to uplifting music. Music can significantly impact your mood and reduce stress.",
    icon: Music,
    duration: "15 min",
    color: "#FF69B4",
  },
  {
    id: "tea",
    title: "Calming Tea Ritual",
    description: "Brew a cup of chamomile or green tea. Take time to enjoy each sip mindfully.",
    icon: Coffee,
    duration: "10 min",
    color: "#00D9A0",
  },
  {
    id: "stretch",
    title: "Gentle Stretching",
    description: "Do some light stretches to release tension. Focus on your neck, shoulders, and back.",
    icon: Sparkles,
    duration: "10 min",
    color: "#DDA0DD",
  },
]

const affirmations = [
  "I am doing my best, and that is enough.",
  "My body is working hard for me every day.",
  "I deserve compassion and kindness from myself.",
  "Progress, not perfection, is my goal.",
  "I am more than my diagnosis.",
  "Today I choose to focus on what I can control.",
]

export function MentalHealth() {
  const { setCurrentScreen, moodEntries, addMoodEntry } = useApp()
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [moodNote, setMoodNote] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [currentAffirmation] = useState(() => 
    affirmations[Math.floor(Math.random() * affirmations.length)]
  )

  const handleMoodSubmit = () => {
    if (selectedMood !== null) {
      addMoodEntry({
        date: new Date().toLocaleDateString(),
        mood: selectedMood,
        note: moodNote,
      })
      setShowConfirmation(true)
      setTimeout(() => {
        setShowConfirmation(false)
        setSelectedMood(null)
        setMoodNote("")
      }, 2000)
    }
  }

  const getMoodTrend = () => {
    if (moodEntries.length < 2) return "neutral"
    const recent = moodEntries.slice(0, 3)
    const avg = recent.reduce((a, b) => a + b.mood, 0) / recent.length
    if (avg >= 4) return "up"
    if (avg <= 2) return "down"
    return "neutral"
  }

  return (
    <div className="min-h-screen bg-[#FFF8DC] pb-28">
      {/* Header */}
      <div className="relative overflow-hidden px-6 pt-12 pb-6">
        <BlobShape 
          className="absolute -top-16 -right-16 w-40 h-40" 
          color="#FF7F7F" 
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
          <div className="w-16 h-16 rounded-2xl bg-[#FF7F7F] border-[3px] border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Heart className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-black text-black mb-2">
            Mental Health Support
          </h1>
          <p className="text-base font-bold text-black/70 leading-relaxed">
            Your emotional well-being matters. Track your mood and find comfort.
          </p>
        </div>
      </div>

      <div className="px-6">
        {/* Daily Affirmation */}
        <div className="bg-[#FFE4EC] rounded-3xl p-5 mb-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style={{ transform: 'rotate(-0.5deg)' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#FF69B4] border-2 border-black flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <span className="text-sm font-black text-black uppercase">Daily Affirmation</span>
          </div>
          <p className="text-xl font-black text-black leading-relaxed">
            &quot;{currentAffirmation}&quot;
          </p>
        </div>

        {/* Mood Tracker */}
        <div className="bg-white rounded-3xl p-6 mb-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-xl font-black text-black mb-2">How are you feeling?</h3>
          <p className="text-sm font-bold text-black/60 mb-4">Tap to log your current mood</p>
          
          {showConfirmation ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#00D9A0] border-[3px] border-black flex items-center justify-center mb-4">
                <Heart className="w-10 h-10 text-black" />
              </div>
              <p className="text-xl font-black text-black">Mood logged!</p>
              <p className="text-sm font-bold text-black/60">Thank you for checking in with yourself.</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between mb-6">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all border-2 ${
                      selectedMood === mood.value 
                        ? "border-black scale-110 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" 
                        : "border-transparent hover:border-black/30"
                    }`}
                    style={{ backgroundColor: selectedMood === mood.value ? mood.color : "transparent" }}
                  >
                    <mood.icon 
                      className="w-9 h-9 text-black" 
                    />
                    <span className="text-xs font-black text-black">{mood.label}</span>
                  </button>
                ))}
              </div>

              {selectedMood !== null && (
                <div className="space-y-4">
                  <textarea
                    value={moodNote}
                    onChange={(e) => setMoodNote(e.target.value)}
                    placeholder="Add a note about how you are feeling (optional)..."
                    className="w-full p-4 rounded-2xl bg-[#FFF8DC] border-2 border-black resize-none text-sm font-bold text-black placeholder:text-black/40 focus:ring-0 outline-none"
                    rows={3}
                  />
                  <button
                    onClick={handleMoodSubmit}
                    className="w-full py-4 rounded-2xl bg-[#FF7F7F] text-black font-black text-lg border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    Log My Mood
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Mood History */}
        {moodEntries.length > 0 && (
          <div className="bg-white rounded-3xl p-6 mb-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-black">Recent Mood History</h3>
              <span className="text-sm font-bold px-3 py-1 rounded-full border-2 border-black" style={{ backgroundColor: getMoodTrend() === "up" ? "#00D9A0" : getMoodTrend() === "down" ? "#FF7F7F" : "#FFD700" }}>
                {getMoodTrend() === "up" ? "Improving" : getMoodTrend() === "down" ? "Needs attention" : "Stable"}
              </span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {moodEntries.slice(0, 7).map((entry, index) => {
                const moodOption = moodOptions.find((m) => m.value === entry.mood)
                return (
                  <div 
                    key={index}
                    className="flex-shrink-0 w-14 h-14 rounded-xl border-2 border-black flex items-center justify-center"
                    style={{ backgroundColor: moodOption?.color || "#FFF8DC" }}
                  >
                    {moodOption && <moodOption.icon className="w-7 h-7 text-black" />}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Self-Care Tips */}
        <h3 className="font-black text-black mb-4 text-lg">Self-Care Activities</h3>
        <div className="space-y-4">
          {selfCareTips.map((tip, index) => (
            <div 
              key={tip.id}
              className="bg-white rounded-3xl p-5 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              style={{ transform: index % 2 === 0 ? 'rotate(-0.3deg)' : 'rotate(0.3deg)' }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-14 h-14 rounded-xl border-[3px] border-black flex items-center justify-center shrink-0"
                  style={{ backgroundColor: tip.color }}
                >
                  <tip.icon className="w-7 h-7 text-black" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-black text-black text-lg">{tip.title}</h4>
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-black text-white">{tip.duration}</span>
                  </div>
                  <p className="text-sm font-semibold text-black/70 leading-relaxed">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support Note */}
        <div className="bg-white rounded-2xl p-4 border-[3px] border-black mt-8">
          <p className="text-xs font-bold text-black/70 text-center leading-relaxed">
            If you are experiencing severe anxiety or depression, please reach out to a mental health professional. You are not alone in this journey.
          </p>
        </div>
      </div>
    </div>
  )
}
