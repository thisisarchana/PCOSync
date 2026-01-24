"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
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
  TrendingUp,
  Calendar,
  Activity,
  AlertCircle,
  BarChart3,
  LogOut,
  Menu
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const sidebarItems = [
  { id: "health-overview", label: "Health Overview", icon: Activity, color: "text-pcos-coral" },
  { id: "medical-analyzer", label: "Medical Reports", icon: FileText, color: "text-pcos-yellow" },
  { id: "diet", label: "Diet Plans", icon: Utensils, color: "text-pcos-lavender" },
  { id: "exercise", label: "Exercise", icon: Dumbbell, color: "text-pcos-peach" },
  { id: "mental-health", label: "Mental Health", icon: Heart, color: "text-pcos-pink" },
  { id: "community", label: "Community", icon: Users, color: "text-pcos-mint" },
]

interface FeatureCard {
  title: string
  description: string
  icon: typeof FileText
  action: string
}

const managementFeatures: FeatureCard[] = [
  {
    title: "Health Overview",
    description: "Symptom trends and cycle irregularity status",
    icon: Activity,
    action: "health-overview",
  },
  {
    title: "Medical Report Analyzer",
    description: "Upload and analyze your hormone reports",
    icon: FileText,
    action: "medical-analyzer",
  },
  {
    title: "Diet Personalization",
    description: "PCOS-friendly meal plans and food swaps",
    icon: Utensils,
    action: "diet",
  },
  {
    title: "Exercise & Lifestyle",
    description: "Low-impact workouts and stress routines",
    icon: Dumbbell,
    action: "exercise",
  },
  {
    title: "Mental Health Support",
    description: "Mood tracking and breathing exercises",
    icon: Heart,
    action: "mental-health",
  },
  {
    title: "Community Support",
    description: "Share experiences and get support",
    icon: Users,
    action: "community",
  },
]

export function DashboardManagement() {
  const { setCurrentScreen, userProfile } = useApp()
  const [activeSection, setActiveSection] = useState("health-overview")
  const [sidebarOpen, setSidebarOpen] = useState(true)

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
            {sidebarOpen && <h2 className="font-bold text-foreground">PCOS Management</h2>}
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
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-10">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                PCOS Management Dashboard
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Long-term care, symptom tracking, and emotional support
              </p>

              {/* Monthly Health Summary */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-6">Monthly Health Summary</h2>
                <div className="grid grid-cols-4 gap-6">
                  <Card className="border-0 shadow-sm bg-card rounded-2xl">
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground mb-2">Cycle Days</p>
                      <p className="text-4xl font-bold text-foreground">28</p>
                      <p className="text-xs text-muted-foreground mt-2">Days this month</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-sm bg-card rounded-2xl">
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground mb-2">Symptoms Logged</p>
                      <p className="text-4xl font-bold text-foreground">15</p>
                      <p className="text-xs text-muted-foreground mt-2">Out of 30 days</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-sm bg-card rounded-2xl">
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground mb-2">Workouts</p>
                      <p className="text-4xl font-bold text-foreground">12</p>
                      <p className="text-xs text-muted-foreground mt-2">This month</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-sm bg-card rounded-2xl">
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground mb-2">Health Score</p>
                      <p className="text-4xl font-bold text-pcos-mint">78%</p>
                      <p className="text-xs text-muted-foreground mt-2">Very Good</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Status Cards */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-6">Current Status</h2>
                <div className="grid grid-cols-3 gap-6">
                  <Card className="border-0 shadow-sm bg-card rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-foreground">Cycle Status</h3>
                        <AlertCircle className="w-5 h-5 text-pcos-coral" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Status: <span className="font-semibold text-foreground">Irregular</span>
                      </p>
                      <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-pcos-coral rounded-full"></div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm bg-card rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-foreground">Symptom Severity</h3>
                        <BarChart3 className="w-5 h-5 text-pcos-lavender" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Acne: <span className="font-semibold text-foreground">Moderate</span>
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Hair Growth: <span className="font-semibold text-foreground">Mild</span>
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm bg-card rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-foreground">Hormone Levels</h3>
                        <TrendingUp className="w-5 h-5 text-pcos-mint" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Last Test: <span className="font-semibold text-foreground">2 weeks ago</span>
                      </p>
                      <button 
                        onClick={() => setCurrentScreen("medical-analyzer")}
                        className="mt-3 text-sm font-medium text-pcos-pink hover:text-pcos-pink/80 transition-colors"
                      >
                        View Report →
                      </button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Management Features */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Management Tools</h2>
                <div className="grid grid-cols-2 gap-6">
                  {managementFeatures.map((feature) => (
                    <button
                      key={feature.action}
                      onClick={() => handleNavigate(feature.action)}
                      className="group p-6 rounded-2xl border border-border hover:border-pcos-pink hover:bg-muted transition-all text-left bg-card"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <feature.icon className="w-8 h-8 text-pcos-coral group-hover:text-pcos-pink transition-colors" />
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-pcos-pink transition-colors" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-pcos-pink transition-colors">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
