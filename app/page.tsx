"use client"

import { AppProvider, useApp } from "@/lib/app-context"
import { LandingPage } from "@/components/landing-page"
import { AuthPage } from "@/components/auth-page"
import { Dashboard } from "@/components/dashboard"
import { DashboardManagement } from "@/components/dashboard-management"
import { DashboardPrevention } from "@/components/dashboard-prevention"
import { MedicalAnalyzer } from "@/components/medical-analyzer"
import { RiskAssessment } from "@/components/risk-assessment"
import { DietPersonalization } from "@/components/diet-personalization"
import { ExerciseGuidance } from "@/components/exercise-guidance"
import { MentalHealth } from "@/components/mental-health"
import { EducationalHub } from "@/components/educational-hub"
import { Community } from "@/components/community"
import { BottomNavigation } from "@/components/bottom-navigation"

function AppContent() {
  const { currentScreen, setCurrentScreen, setUserTrack, isAuthenticated, userTrack } = useApp()

  const handleGetStarted = () => {
    setCurrentScreen("auth")
  }

  const handleLogin = () => {
    setCurrentScreen("auth")
  }

  const handleSelectTrack = (track: "diagnosed" | "at-risk") => {
    setUserTrack(track)
    setCurrentScreen("auth")
  }

  const handleAuthSuccess = () => {
    setCurrentScreen("dashboard")
  }

  const handleBackToLanding = () => {
    setCurrentScreen("landing")
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "landing":
        return (
          <LandingPage 
            onGetStarted={handleGetStarted}
            onLogin={handleLogin}
            onSelectTrack={handleSelectTrack}
          />
        )
      case "auth":
        return (
          <AuthPage 
            onBack={handleBackToLanding}
            onSuccess={handleAuthSuccess}
          />
        )
<<<<<<< Updated upstream
      case "dashboard":
        return userTrack === "diagnosed" ? <DashboardManagement /> : <DashboardPrevention />
=======
      case "dashboard": {
  return (
    userTrack === "diagnosed"
      ? <DashboardManagement />
      : <DashboardPrevention />
  );
}
>>>>>>> Stashed changes
      case "dashboard-management":
        return <DashboardManagement />
      case "dashboard-prevention":
        return <DashboardPrevention />
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
        return (
          <LandingPage 
            onGetStarted={handleGetStarted}
            onLogin={handleLogin}
            onSelectTrack={handleSelectTrack}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="w-full">
        {renderScreen()}
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
