"use client"

import { useApp, type Screen } from "@/lib/app-context"
import { 
  Home, 
  FileText, 
  Heart, 
  BookOpen, 
  Users 
} from "lucide-react"

interface NavItem {
  id: Screen
  label: string
  icon: typeof Home
  color: string
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Home", icon: Home, color: "#FFD700" },
  { id: "medical-analyzer", label: "Reports", icon: FileText, color: "#FF69B4" },
  { id: "mental-health", label: "Wellness", icon: Heart, color: "#FF7F7F" },
  { id: "education", label: "Learn", icon: BookOpen, color: "#87CEEB" },
  { id: "community", label: "Community", icon: Users, color: "#00D9A0" },
]

export function BottomNavigation() {
  const { currentScreen, setCurrentScreen } = useApp()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-[3px] border-black px-2 py-2 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id
          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                isActive 
                  ? "border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" 
                  : "border-[3px] border-transparent"
              }`}
              style={{ backgroundColor: isActive ? item.color : "transparent" }}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-black" : "text-black/50"}`} />
              <span className={`text-[10px] ${isActive ? "font-black text-black" : "font-bold text-black/50"}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
