"use client"

import { useApp, type Screen } from "@/lib/app-context"
import { 
  Home, 
  FileText, 
  Heart, 
  BookOpen, 
  Users,
  ClipboardCheck,
  Utensils,
  Dumbbell,
  LogOut,
  Settings
} from "lucide-react"

interface NavItem {
  id: Screen
  label: string
  icon: typeof Home
  color: string
}

const mainNavItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home, color: "bg-pcos-yellow" },
  { id: "medical-analyzer", label: "Medical Reports", icon: FileText, color: "bg-pcos-pink" },
  { id: "risk-assessment", label: "Risk Assessment", icon: ClipboardCheck, color: "bg-pcos-mint" },
  { id: "diet", label: "Diet Plans", icon: Utensils, color: "bg-pcos-peach" },
  { id: "exercise", label: "Exercise", icon: Dumbbell, color: "bg-pcos-lavender" },
]

const secondaryNavItems: NavItem[] = [
  { id: "mental-health", label: "Mental Health", icon: Heart, color: "bg-pcos-coral" },
  { id: "education", label: "Learn", icon: BookOpen, color: "bg-pcos-sky" },
  { id: "community", label: "Community", icon: Users, color: "bg-pcos-mint" },
]

export function BottomNavigation() {
  const { currentScreen, setCurrentScreen, setIsAuthenticated } = useApp()

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentScreen("landing")
  }

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pcos-pink flex items-center justify-center">
            <Heart className="w-5 h-5 text-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">PCOSync</span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
          Main
        </p>
        {mainNavItems.map((item) => {
          const isActive = currentScreen === item.id
          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left ${
                isActive 
                  ? "bg-pcos-pink/20 text-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center`}>
                <item.icon className="w-4 h-4 text-foreground" />
              </div>
              <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>
                {item.label}
              </span>
            </button>
          )
        })}

        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3 mt-6">
          Wellness
        </p>
        {secondaryNavItems.map((item) => {
          const isActive = currentScreen === item.id
          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left ${
                isActive 
                  ? "bg-pcos-pink/20 text-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center`}>
                <item.icon className="w-4 h-4 text-foreground" />
              </div>
              <span className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border space-y-1">
        <button
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
            <Settings className="w-4 h-4 text-foreground" />
          </div>
          <span className="text-sm font-medium">Settings</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center">
            <LogOut className="w-4 h-4 text-destructive" />
          </div>
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </nav>
  )
}
