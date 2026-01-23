"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Screen = 
  | "landing"
  | "auth"
  | "dashboard"
  | "medical-analyzer"
  | "risk-assessment"
  | "diet"
  | "exercise"
  | "mental-health"
  | "education"
  | "community"

export type UserTrack = "diagnosed" | "at-risk" | null

export interface UserProfile {
  name: string
  age: number
  symptoms: string[]
  dietPreferences: string[]
  fitnessLevel: string
  riskScore: "low" | "medium" | "high" | null
}

export interface MoodEntry {
  date: string
  mood: number
  note: string
}

export interface CommunityPost {
  id: string
  author: string
  content: string
  date: string
  likes: number
}

interface AppContextType {
  currentScreen: Screen
  setCurrentScreen: (screen: Screen) => void
  userTrack: UserTrack
  setUserTrack: (track: UserTrack) => void
  isAuthenticated: boolean
  setIsAuthenticated: (auth: boolean) => void
  userProfile: UserProfile
  setUserProfile: (profile: UserProfile) => void
  moodEntries: MoodEntry[]
  addMoodEntry: (entry: MoodEntry) => void
  communityPosts: CommunityPost[]
  addCommunityPost: (post: Omit<CommunityPost, "id">) => void
}

const defaultUserProfile: UserProfile = {
  name: "",
  age: 0,
  symptoms: [],
  dietPreferences: [],
  fitnessLevel: "beginner",
  riskScore: null,
}

const defaultCommunityPosts: CommunityPost[] = [
  {
    id: "1",
    author: "Sarah M.",
    content: "Just started my PCOS-friendly diet journey! The meal plans here have been so helpful. Feeling more energetic already after 2 weeks.",
    date: "2 hours ago",
    likes: 24,
  },
  {
    id: "2",
    author: "Priya K.",
    content: "Yoga has been a game-changer for my symptoms. Started with the gentle routines suggested here and now I do it daily!",
    date: "5 hours ago",
    likes: 18,
  },
  {
    id: "3",
    author: "Emma L.",
    content: "Finally got my test results explained in a way I could understand. The medical analyzer feature is amazing for breaking down complex reports.",
    date: "1 day ago",
    likes: 42,
  },
  {
    id: "4",
    author: "Aisha R.",
    content: "The mental health support section helped me realize I'm not alone in this journey. Thank you, PCOSync community!",
    date: "2 days ago",
    likes: 56,
  },
]

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing")
  const [userTrack, setUserTrack] = useState<UserTrack>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile)
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(defaultCommunityPosts)

  const addMoodEntry = (entry: MoodEntry) => {
    setMoodEntries((prev) => [entry, ...prev])
  }

  const addCommunityPost = (post: Omit<CommunityPost, "id">) => {
    const newPost: CommunityPost = {
      ...post,
      id: Date.now().toString(),
    }
    setCommunityPosts((prev) => [newPost, ...prev])
  }

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        userTrack,
        setUserTrack,
        isAuthenticated,
        setIsAuthenticated,
        userProfile,
        setUserProfile,
        moodEntries,
        addMoodEntry,
        communityPosts,
        addCommunityPost,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
