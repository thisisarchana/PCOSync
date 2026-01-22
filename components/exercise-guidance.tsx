"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { BlobShape, StarBurst, CircleDecor } from "./decorative-shapes"
import { 
  ArrowLeft, 
  Dumbbell, 
  Play,
  Clock,
  Flame,
  Heart,
  ChevronRight,
  Check
} from "lucide-react"

interface Workout {
  id: string
  name: string
  duration: string
  calories: string
  level: string
  benefits: string[]
  exercises: string[]
  color: string
}

interface WeeklyPlan {
  day: string
  activity: string
  type: "rest" | "active" | "light"
}

const fitnessLevels = [
  { id: "beginner", label: "Beginner", description: "New to exercise or returning after a break", color: "#00D9A0" },
  { id: "intermediate", label: "Intermediate", description: "Exercise regularly, 2-3 times per week", color: "#FFD700" },
  { id: "advanced", label: "Advanced", description: "Consistent exercise routine, 4+ times per week", color: "#FF69B4" },
]

const symptoms = [
  "Fatigue",
  "Weight management",
  "Mood swings",
  "Stress/Anxiety",
  "Insulin resistance",
  "Inflammation",
]

const workouts: Record<string, Workout[]> = {
  beginner: [
    {
      id: "gentle-yoga",
      name: "Gentle PCOS Yoga",
      duration: "20 min",
      calories: "80-100",
      level: "Beginner",
      benefits: ["Hormone balance", "Stress relief", "Flexibility"],
      exercises: ["Cat-Cow Stretch", "Butterfly Pose", "Child's Pose", "Legs Up the Wall", "Gentle Twists"],
      color: "#DDA0DD",
    },
    {
      id: "walking",
      name: "Mindful Walking",
      duration: "30 min",
      calories: "120-150",
      level: "Beginner",
      benefits: ["Insulin sensitivity", "Mood boost", "Low impact"],
      exercises: ["Warm-up stroll", "Brisk walking intervals", "Cool-down stretches"],
      color: "#00D9A0",
    },
    {
      id: "stretching",
      name: "Morning Stretch Routine",
      duration: "15 min",
      calories: "50-70",
      level: "Beginner",
      benefits: ["Energy boost", "Circulation", "Flexibility"],
      exercises: ["Neck rolls", "Shoulder stretches", "Hip openers", "Hamstring stretch", "Side bends"],
      color: "#FFD700",
    },
  ],
  intermediate: [
    {
      id: "strength",
      name: "PCOS Strength Training",
      duration: "30 min",
      calories: "180-220",
      level: "Intermediate",
      benefits: ["Muscle building", "Metabolism boost", "Insulin sensitivity"],
      exercises: ["Squats", "Lunges", "Deadlifts", "Push-ups", "Planks", "Rows"],
      color: "#FF69B4",
    },
    {
      id: "hiit-low",
      name: "Low-Impact HIIT",
      duration: "25 min",
      calories: "200-250",
      level: "Intermediate",
      benefits: ["Fat burning", "Cardiovascular health", "Time efficient"],
      exercises: ["March in place", "Step touches", "Low squat pulses", "Modified burpees", "Plank variations"],
      color: "#FFAB76",
    },
    {
      id: "dance",
      name: "Dance Cardio",
      duration: "30 min",
      calories: "180-220",
      level: "Intermediate",
      benefits: ["Fun workout", "Endorphin release", "Full body"],
      exercises: ["Warm-up groove", "Choreography segments", "Freestyle", "Cool-down stretches"],
      color: "#87CEEB",
    },
  ],
  advanced: [
    {
      id: "circuit",
      name: "Full Body Circuit",
      duration: "40 min",
      calories: "300-350",
      level: "Advanced",
      benefits: ["Muscle endurance", "Metabolic boost", "Strength gains"],
      exercises: ["Burpees", "Jump squats", "Mountain climbers", "Kettlebell swings", "Box jumps", "Plank to push-up"],
      color: "#FF7F7F",
    },
  ],
}

const weeklyPlan: WeeklyPlan[] = [
  { day: "Mon", activity: "Yoga", type: "light" },
  { day: "Tue", activity: "Strength", type: "active" },
  { day: "Wed", activity: "Walking", type: "light" },
  { day: "Thu", activity: "Rest", type: "rest" },
  { day: "Fri", activity: "HIIT", type: "active" },
  { day: "Sat", activity: "Dance", type: "active" },
  { day: "Sun", activity: "Rest", type: "rest" },
]

export function ExerciseGuidance() {
  const { setCurrentScreen } = useApp()
  const [step, setStep] = useState<"level" | "symptoms" | "workouts">("level")
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null)

  const handleLevelSelect = (id: string) => {
    setSelectedLevel(id)
    setStep("symptoms")
  }

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    )
  }

  const currentWorkouts = selectedLevel ? workouts[selectedLevel] || workouts.beginner : workouts.beginner

  return (
    <div className="min-h-screen bg-[#FFF8DC] pb-28">
      {/* Header */}
      <div className="relative overflow-hidden px-6 pt-12 pb-6">
        <BlobShape 
          className="absolute -top-16 -right-16 w-40 h-40" 
          color="#DDA0DD" 
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
          onClick={() => {
            if (step === "level") setCurrentScreen("dashboard")
            else if (step === "symptoms") setStep("level")
            else setStep("symptoms")
          }}
          className="relative inline-flex items-center gap-2 px-4 py-2 mb-4 bg-white rounded-full border-[3px] border-black font-black text-black hover:bg-[#FFD700] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-[#DDA0DD] border-[3px] border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Dumbbell className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-black text-black mb-2">
            Exercise Guidance
          </h1>
          <p className="text-base font-bold text-black/70 leading-relaxed">
            {step === "level" 
              ? "Select your fitness level to get personalized workouts"
              : step === "symptoms"
              ? "What symptoms are you looking to address?"
              : "Your personalized workout recommendations"}
          </p>
        </div>
      </div>

      <div className="px-6">
        {step === "level" && (
          <div className="space-y-4">
            {fitnessLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => handleLevelSelect(level.id)}
                className="w-full bg-white rounded-3xl p-5 text-left border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl border-[3px] border-black flex items-center justify-center"
                      style={{ backgroundColor: level.color }}
                    >
                      <Dumbbell className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-black mb-1">{level.label}</h3>
                      <p className="text-sm font-bold text-black/60">{level.description}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center">
                    <ChevronRight className="w-5 h-5 text-black" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {step === "symptoms" && (
          <>
            <div className="bg-white rounded-3xl p-6 mb-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-xl font-black text-black mb-4">Select your symptoms</h3>
              <p className="text-sm font-bold text-black/60 mb-4">We will tailor exercises to help with these</p>
              
              <div className="grid grid-cols-2 gap-3">
                {symptoms.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => handleSymptomToggle(symptom)}
                    className={`p-4 rounded-2xl text-sm font-black transition-all border-2 border-black ${
                      selectedSymptoms.includes(symptom) 
                        ? "bg-[#DDA0DD]" 
                        : "bg-[#FFF8DC] hover:bg-[#F8E8F8]"
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep("workouts")}
              className="w-full py-4 rounded-2xl bg-[#DDA0DD] text-black font-black text-lg border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2"
            >
              Show My Workouts
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {step === "workouts" && (
          <>
            {/* Weekly Plan */}
            <div className="bg-white rounded-3xl p-5 mb-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-black text-black mb-4 text-lg">Your Weekly Plan</h3>
              <div className="flex justify-between">
                {weeklyPlan.map((day) => (
                  <div key={day.day} className="text-center">
                    <span className="text-xs font-black text-black/60 block mb-2">{day.day}</span>
                    <div className={`w-11 h-11 rounded-xl border-2 border-black flex items-center justify-center ${
                      day.type === "rest" 
                        ? "bg-[#FF7F7F]" 
                        : day.type === "light" 
                        ? "bg-[#00D9A0]" 
                        : "bg-[#DDA0DD]"
                    }`}>
                      {day.type === "rest" ? (
                        <Heart className="w-5 h-5 text-black" />
                      ) : (
                        <Dumbbell className="w-5 h-5 text-black" />
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-black/60 block mt-1">{day.activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Workout Cards */}
            <h3 className="font-black text-black mb-4 text-lg">Recommended Workouts</h3>
            <div className="space-y-4">
              {currentWorkouts.map((workout) => (
                <div 
                  key={workout.id} 
                  className="bg-white rounded-3xl overflow-hidden border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <button
                    onClick={() => setExpandedWorkout(expandedWorkout === workout.id ? null : workout.id)}
                    className="w-full p-5 text-left"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-xl font-black text-black mb-2">{workout.name}</h4>
                        <div className="flex items-center gap-4 text-sm font-bold text-black/70">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {workout.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-4 h-4" />
                            {workout.calories} cal
                          </span>
                        </div>
                      </div>
                      <div 
                        className="w-14 h-14 rounded-xl border-[3px] border-black flex items-center justify-center"
                        style={{ backgroundColor: workout.color }}
                      >
                        <Play className="w-7 h-7 text-black" />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {workout.benefits.map((benefit) => (
                        <span 
                          key={benefit}
                          className="px-3 py-1 rounded-full text-xs font-bold text-black border-2 border-black"
                          style={{ backgroundColor: workout.color }}
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </button>
                  
                  {expandedWorkout === workout.id && (
                    <div className="px-5 pb-5 border-t-2 border-black">
                      <h5 className="font-black text-black mt-4 mb-3">Exercises included:</h5>
                      <div className="space-y-2">
                        {workout.exercises.map((exercise, index) => (
                          <div key={exercise} className="flex items-center gap-3 p-3 rounded-xl bg-[#FFF8DC] border-2 border-black">
                            <div 
                              className="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center"
                              style={{ backgroundColor: workout.color }}
                            >
                              <span className="text-xs font-black text-black">{index + 1}</span>
                            </div>
                            <span className="text-sm font-bold text-black">{exercise}</span>
                          </div>
                        ))}
                      </div>
                      <button 
                        className="w-full mt-4 py-3 rounded-xl text-black font-black border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2"
                        style={{ backgroundColor: workout.color }}
                      >
                        <Play className="w-5 h-5" />
                        Start Workout
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tips */}
            <div className="bg-[#FFE4EC] rounded-3xl p-5 mt-6 border-[3px] border-black">
              <h4 className="font-black text-black mb-3 text-lg">Exercise Tips for PCOS</h4>
              <ul className="space-y-2 text-sm font-bold text-black/80">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#FF69B4] border-2 border-black flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  Consistency matters more than intensity
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#FF69B4] border-2 border-black flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  Listen to your body and rest when needed
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#FF69B4] border-2 border-black flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  Combine cardio with strength training
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
