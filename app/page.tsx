"use client"

import { AppProvider, useApp } from "@/lib/app-context"
import { Dashboard } from "@/components/dashboard"
import { MedicalAnalyzer } from "@/components/medical-analyzer"
import { RiskAssessment } from "@/components/risk-assessment"
import { DietPersonalization } from "@/components/diet-personalization"
import { ExerciseGuidance } from "@/components/exercise-guidance"
import { MentalHealth } from "@/components/mental-health"
import { EducationalHub } from "@/components/educational-hub"
import { Community } from "@/components/community"
import { BottomNavigation } from "@/components/bottom-navigation"

function AppContent() {
  const { currentScreen } = useApp()

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return <Dashboard />
      case "medical-analyzer":
        return <MedicalAnalyzer />
      case "risk-assessment":
        return <RiskAssessment />
      case "diet":
        return <DietPersonalization />
      case "exercise":
        return <ExerciseGuidance />
      case "mental-health":
        return <MentalHealth />
      case "education":
        return <EducationalHub />
      case "community":
        return <Community />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-[#FEF9E7]">
      <main className="max-w-md mx-auto relative">
        {renderScreen()}
        <BottomNavigation />
      </main>
    </div>
  )
}

export default function PCOSyncApp() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
