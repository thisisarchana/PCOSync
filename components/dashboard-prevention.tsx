"use client"

import { useApp } from "@/lib/app-context"
import { 
  AlertTriangle,
  BookOpen,
  Utensils,
  Dumbbell,
  Heart,
  CheckCircle,
  ChevronRight,
  Clock,
  Users,
  BarChart3,
  LogOut,
  Menu,
  Stethoscope,
  Lightbulb
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

const sidebarItems = [
  { id: "risk-assessment", label: "Risk Assessment", icon: BarChart3, color: "text-pcos-coral" },
  { id: "diet", label: "Diet Plans", icon: Utensils, color: "text-pcos-yellow" },
  { id: "exercise", label: "Exercise", icon: Dumbbell, color: "text-pcos-lavender" },
  { id: "education", label: "Learn", icon: BookOpen, color: "text-pcos-sky" },
  { id: "community", label: "Community", icon: Users, color: "text-pcos-mint" },
]

export function DashboardPrevention() {
  const { setCurrentScreen, userProfile } = useApp()
  const [activeSection, setActiveSection] = useState("risk-assessment")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const riskLevel = userProfile.riskScore || "medium"
  
  const getRiskColor = () => {
    switch(riskLevel) {
      case "low": return "bg-pcos-mint"
      case "medium": return "bg-pcos-yellow"
      default: return "bg-pcos-coral"
    }
  }

  const getRiskBgColor = () => {
    switch(riskLevel) {
      case "low": return "bg-pcos-mint/10"
      case "medium": return "bg-pcos-yellow/10"
      default: return "bg-pcos-coral/10"
    }
  }

  const handleNavigate = (screenId: string) => {
    setActiveSection(screenId)
    setCurrentScreen(screenId as any)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen bg-card border-r border-border transition-all duration-300 z-40 ${
        sidebarOpen ? "w-64" : "w-20"
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            {sidebarOpen && <h2 className="font-bold text-foreground">PCOS Guide</h2>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === item.id
                    ? "bg-muted text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-border">
            <button
              onClick={() => setCurrentScreen("auth")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted transition-all ${
                !sidebarOpen ? "justify-center" : ""
              }`}
            >
              <LogOut className="w-5 h-5" />
              {sidebarOpen && <span className="text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Top Navigation Bar */}
        <div className="border-b border-border bg-card sticky top-0 z-30">
          <div className="px-8 py-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">PCOS Risk & Prevention</h1>
              <p className="text-sm text-muted-foreground">Early detection & awareness</p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-5xl mx-auto px-8 py-8">
          
          {/* Monthly Health Summary */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-6">Monthly Health Summary</h2>
            <Card className="border-0 shadow-sm bg-card rounded-2xl">
              <CardContent className="p-8">
                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Cycle Days</p>
                    <p className="text-3xl font-bold text-foreground">28</p>
                    <p className="text-xs text-muted-foreground mt-1">Days this month</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Symptoms Logged</p>
                    <p className="text-3xl font-bold text-foreground">15</p>
                    <p className="text-xs text-muted-foreground mt-1">Out of 30 days</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Workouts</p>
                    <p className="text-3xl font-bold text-foreground">12</p>
                    <p className="text-xs text-muted-foreground mt-1">This month</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Health Score</p>
                    <p className="text-3xl font-bold text-pcos-mint">78%</p>
                    <p className="text-xs text-muted-foreground mt-1">Very Good</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Risk Score Section */}
          <div className={`rounded-2xl p-8 mb-10 ${getRiskBgColor()} border border-border`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Your PCOD Risk Score</h2>
                <p className="text-muted-foreground">Based on your current health indicators</p>
              </div>
              <div className={`w-24 h-24 rounded-2xl ${getRiskColor()} flex items-center justify-center flex-col`}>
                <span className="text-3xl font-bold text-foreground">65%</span>
                <span className="text-xs font-medium text-foreground mt-1">
                  {riskLevel === "low" ? "Low" : riskLevel === "medium" ? "Medium" : "High"}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              {riskLevel === "low" && "Your current lifestyle choices are protective. Continue maintaining healthy habits to minimize risk."}
              {riskLevel === "medium" && "You show some risk factors. Lifestyle modifications can significantly reduce your PCOD risk."}
              {riskLevel === "high" && "Early intervention is recommended. Take action now to prevent PCOD development."}
            </p>
          </div>

          {/* Early Warning Signs */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-6">Early Warning Signs to Monitor</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm bg-card rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-pcos-coral/20 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-pcos-coral" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Irregular Cycles</h3>
                      <p className="text-sm text-muted-foreground">Periods more than 35 days apart or skipped months</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-card rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-pcos-peach/20 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-pcos-peach" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Unexpected Hair Growth</h3>
                      <p className="text-sm text-muted-foreground">Facial or body hair development</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-card rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-pcos-pink/20 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-pcos-pink" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Unexplained Weight Changes</h3>
                      <p className="text-sm text-muted-foreground">Difficulty losing weight or sudden gain</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-card rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-pcos-lavender/20 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-pcos-lavender" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Skin Issues</h3>
                      <p className="text-sm text-muted-foreground">Persistent acne or dark patches on skin</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Prevention & Education */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-6">Prevention & Education</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => setCurrentScreen("diet")}
                className="rounded-2xl p-6 text-left border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-pcos-mint/20 flex items-center justify-center">
                    <Utensils className="w-6 h-6 text-pcos-mint" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Preventive Diet Tips</h3>
                <p className="text-sm text-muted-foreground">Beginner-friendly nutrition habits to reduce risk</p>
              </button>

              <button
                onClick={() => setCurrentScreen("exercise")}
                className="rounded-2xl p-6 text-left border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-pcos-peach/20 flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-pcos-peach" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Exercise & Lifestyle</h3>
                <p className="text-sm text-muted-foreground">Stress reduction and active living strategies</p>
              </button>

              <button
                onClick={() => setCurrentScreen("education")}
                className="rounded-2xl p-6 text-left border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-pcos-lavender/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-pcos-lavender" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Educational Resources</h3>
                <p className="text-sm text-muted-foreground">Learn about PCOD/PCOS, myths, and facts</p>
              </button>

              <button
                onClick={() => setCurrentScreen("mental-health")}
                className="rounded-2xl p-6 text-left border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-pcos-coral/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-pcos-coral" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Wellness & Stress</h3>
                <p className="text-sm text-muted-foreground">Mental health and stress reduction activities</p>
              </button>
            </div>
          </div>

          {/* Doctor Visit Readiness */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-6">Doctor Visit Readiness</h2>
            
            <Card className="border-0 shadow-sm bg-card rounded-2xl">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-pcos-mint/20 flex items-center justify-center">
                        <Stethoscope className="w-4 h-4 text-pcos-mint" />
                      </div>
                      <h3 className="font-semibold text-foreground">What to Prepare</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-pcos-mint flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">Document your cycle patterns</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-pcos-mint flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">List any symptoms you've noticed</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-pcos-mint flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">Note family health history</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-pcos-pink/20 flex items-center justify-center">
                        <Lightbulb className="w-4 h-4 text-pcos-pink" />
                      </div>
                      <h3 className="font-semibold text-foreground">Questions to Ask</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-pcos-pink flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">What tests would you recommend?</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-pcos-pink flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">What are my preventive options?</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-pcos-pink flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">How often should I follow up?</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-pcos-mint/10 via-pcos-lavender/10 to-pcos-sky/10 rounded-2xl mb-10">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-pcos-mint/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-8 h-8 text-pcos-mint" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">Your Next Steps</h3>
                  <p className="text-muted-foreground mb-4">
                    Focus on lifestyle changes to reduce your PCOD risk. Regular check-ups and early detection are key to prevention.
                  </p>
                  <button className="text-sm font-medium text-pcos-mint hover:text-pcos-mint/80 transition-colors">
                    Learn more about prevention →
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
