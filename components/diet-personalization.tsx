"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { BlobShape, StarBurst, CircleDecor } from "./decorative-shapes"
import { 
  ArrowLeft, 
  Utensils, 
  Check,
  Leaf,
  Fish,
  Egg,
  Wheat,
  Coffee,
  Apple,
  ChevronRight,
  Clock,
  Flame
} from "lucide-react"

interface DietPreference {
  id: string
  label: string
  icon: typeof Leaf
  color: string
}

interface MealPlan {
  time: string
  meal: string
  description: string
  calories: number
  benefits: string[]
}

const dietPreferences: DietPreference[] = [
  { id: "vegetarian", label: "Vegetarian", icon: Leaf, color: "#00D9A0" },
  { id: "non-veg", label: "Non-Vegetarian", icon: Fish, color: "#87CEEB" },
  { id: "vegan", label: "Vegan", icon: Apple, color: "#FF7F7F" },
  { id: "egg", label: "Eggetarian", icon: Egg, color: "#FFD700" },
  { id: "gluten-free", label: "Gluten-Free", icon: Wheat, color: "#DDA0DD" },
  { id: "dairy-free", label: "Dairy-Free", icon: Coffee, color: "#FFAB76" },
]

const goals = [
  "Manage insulin resistance",
  "Reduce inflammation",
  "Support hormone balance",
  "Weight management",
  "Improve energy levels",
]

const sampleMealPlans: Record<string, MealPlan[]> = {
  vegetarian: [
    {
      time: "Breakfast (8 AM)",
      meal: "Overnight Oats with Berries",
      description: "Steel-cut oats with chia seeds, fresh berries, walnuts, and a drizzle of honey",
      calories: 350,
      benefits: ["High fiber", "Low GI", "Anti-inflammatory"],
    },
    {
      time: "Lunch (1 PM)",
      meal: "Rainbow Buddha Bowl",
      description: "Quinoa, roasted chickpeas, avocado, roasted vegetables, and tahini dressing",
      calories: 450,
      benefits: ["Complete protein", "Healthy fats", "Hormone support"],
    },
    {
      time: "Snack (4 PM)",
      meal: "Greek Yogurt Parfait",
      description: "Greek yogurt with pumpkin seeds, cinnamon, and sliced almonds",
      calories: 200,
      benefits: ["Probiotics", "Protein-rich", "Blood sugar stable"],
    },
    {
      time: "Dinner (7 PM)",
      meal: "Lentil Vegetable Curry",
      description: "Red lentils with spinach, tomatoes, and anti-inflammatory spices served with brown rice",
      calories: 400,
      benefits: ["Plant protein", "Iron-rich", "Turmeric benefits"],
    },
  ],
  "non-veg": [
    {
      time: "Breakfast (8 AM)",
      meal: "Spinach & Egg White Scramble",
      description: "Fluffy egg whites with spinach, tomatoes, and avocado on whole grain toast",
      calories: 320,
      benefits: ["High protein", "Folate-rich", "Healthy fats"],
    },
    {
      time: "Lunch (1 PM)",
      meal: "Grilled Salmon Salad",
      description: "Wild-caught salmon over mixed greens with olive oil dressing and seeds",
      calories: 480,
      benefits: ["Omega-3 fatty acids", "Anti-inflammatory", "Vitamin D"],
    },
    {
      time: "Snack (4 PM)",
      meal: "Turkey Roll-Ups",
      description: "Lean turkey slices with hummus, cucumber, and bell peppers",
      calories: 180,
      benefits: ["Lean protein", "Low carb", "Satisfying"],
    },
    {
      time: "Dinner (7 PM)",
      meal: "Herb-Crusted Chicken",
      description: "Baked chicken breast with roasted vegetables and quinoa",
      calories: 420,
      benefits: ["Complete protein", "B vitamins", "Fiber-rich sides"],
    },
  ],
}

export function DietPersonalization() {
  const { setCurrentScreen } = useApp()
  const [step, setStep] = useState<"preferences" | "goals" | "plan">("preferences")
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null)
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])

  const handleDietSelect = (id: string) => {
    setSelectedDiet(id)
    setStep("goals")
  }

  const handleGoalToggle = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    )
  }

  const handleGeneratePlan = () => {
    setStep("plan")
  }

  const currentMealPlan = selectedDiet === "non-veg" ? sampleMealPlans["non-veg"] : sampleMealPlans.vegetarian

  return (
    <div className="min-h-screen bg-[#FFF8DC] pb-28">
      {/* Header */}
      <div className="relative overflow-hidden px-6 pt-12 pb-6">
        <BlobShape 
          className="absolute -top-16 -right-16 w-40 h-40" 
          color="#FFD700" 
        />
        <StarBurst 
          className="absolute top-16 right-8 w-10 h-10" 
          color="#00D9A0" 
        />
        <CircleDecor 
          className="absolute top-28 right-24 w-5 h-5" 
          color="#FF69B4" 
        />
        
        <button
          onClick={() => {
            if (step === "preferences") setCurrentScreen("dashboard")
            else if (step === "goals") setStep("preferences")
            else setStep("goals")
          }}
          className="relative inline-flex items-center gap-2 px-4 py-2 mb-4 bg-white rounded-full border-[3px] border-black font-black text-black hover:bg-[#FFD700] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-[#FFD700] border-[3px] border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Utensils className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-black text-black mb-2">
            Diet Personalization
          </h1>
          <p className="text-base font-bold text-black/70 leading-relaxed">
            {step === "preferences" 
              ? "Choose your dietary preference to get started"
              : step === "goals"
              ? "Select your health goals for personalized recommendations"
              : "Your personalized PCOS-friendly meal plan"}
          </p>
        </div>
      </div>

      <div className="px-6">
        {step === "preferences" && (
          <div className="grid grid-cols-2 gap-4">
            {dietPreferences.map((pref) => (
              <button
                key={pref.id}
                onClick={() => handleDietSelect(pref.id)}
                className={`bg-white rounded-3xl p-5 text-center border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${
                  selectedDiet === pref.id ? "ring-4 ring-[#FFD700]" : ""
                }`}
              >
                <div 
                  className="w-14 h-14 mx-auto rounded-2xl border-[3px] border-black flex items-center justify-center mb-3"
                  style={{ backgroundColor: pref.color }}
                >
                  <pref.icon className="w-7 h-7 text-black" />
                </div>
                <h3 className="font-black text-black">{pref.label}</h3>
              </button>
            ))}
          </div>
        )}

        {step === "goals" && (
          <>
            <div className="bg-white rounded-3xl p-6 mb-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-xl font-black text-black mb-4">What are your health goals?</h3>
              <p className="text-sm font-bold text-black/60 mb-4">Select all that apply</p>
              
              <div className="space-y-3">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => handleGoalToggle(goal)}
                    className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all border-2 border-black ${
                      selectedGoals.includes(goal) 
                        ? "bg-[#FFD700]" 
                        : "bg-[#FFF8DC] hover:bg-[#FFF9D4]"
                    }`}
                  >
                    <span className="font-bold text-black">{goal}</span>
                    {selectedGoals.includes(goal) && (
                      <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGeneratePlan}
              disabled={selectedGoals.length === 0}
              className="w-full py-4 rounded-2xl bg-[#FFD700] text-black font-black text-lg border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Generate My Meal Plan
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {step === "plan" && (
          <>
            {/* Diet Summary */}
            <div className="bg-white rounded-3xl p-5 mb-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-[#FFD700] border-[3px] border-black flex items-center justify-center">
                  <Apple className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h3 className="font-black text-black text-lg">Your Daily Plan</h3>
                  <p className="text-sm font-bold text-black/60">~1,400 calories | Balanced macros</p>
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {selectedGoals.slice(0, 3).map((goal) => (
                  <span 
                    key={goal}
                    className="px-3 py-1.5 rounded-full bg-[#FFD700] text-xs font-black text-black border-2 border-black"
                  >
                    {goal.split(" ")[0]}
                  </span>
                ))}
              </div>
            </div>

            {/* Meal Cards */}
            <div className="space-y-4">
              {currentMealPlan.map((meal, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-3xl p-5 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  style={{ transform: index % 2 === 0 ? 'rotate(-0.5deg)' : 'rotate(0.5deg)' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-black/70">
                      <Clock className="w-4 h-4" />
                      {meal.time}
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFAB76] border-2 border-black">
                      <Flame className="w-4 h-4 text-black" />
                      <span className="text-xs font-black text-black">{meal.calories} cal</span>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-black text-black mb-2">{meal.meal}</h4>
                  <p className="text-sm font-semibold text-black/70 mb-4 leading-relaxed">{meal.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {meal.benefits.map((benefit) => (
                      <span 
                        key={benefit}
                        className="px-3 py-1 rounded-full bg-[#D4FFF0] text-xs font-bold text-black border-2 border-black"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div className="bg-[#D4FFF0] rounded-3xl p-5 mt-6 border-[3px] border-black">
              <h4 className="font-black text-black mb-3 text-lg">PCOS Diet Tips</h4>
              <ul className="space-y-2 text-sm font-bold text-black/80">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#00D9A0] border-2 border-black flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  Eat slowly and mindfully to improve digestion
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#00D9A0] border-2 border-black flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  Stay hydrated with 8+ glasses of water daily
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#00D9A0] border-2 border-black flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  Avoid processed foods and added sugars
                </li>
              </ul>
            </div>

            {/* Regenerate Button */}
            <button
              onClick={() => setStep("preferences")}
              className="w-full mt-6 py-4 rounded-2xl bg-[#FFD700] text-black font-black text-lg border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Customize My Plan
            </button>
          </>
        )}
      </div>
    </div>
  )
}
