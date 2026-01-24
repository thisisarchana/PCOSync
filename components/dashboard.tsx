import { useApp, type Screen } from "@/lib/app-context"
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
  Zap,
  TrendingUp,
  Calendar
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureCard {
  id: Screen
  title: string
  description: string
  icon: typeof FileText
  color: string
  bgColor: string
}

const features: FeatureCard[] = [
  {
    id: "medical-analyzer",
    title: "Medical Report Analyzer",
    description: "Upload and understand your medical reports with AI-powered explanations",
    icon: FileText,
    color: "bg-pcos-pink",
    bgColor: "bg-pcos-pink/10",
  },
  {
    id: "risk-assessment",
    title: "PCOS Risk Assessment",
    description: "Take a quick assessment to understand your PCOS risk level",
    icon: ClipboardCheck,
    color: "bg-pcos-mint",
    bgColor: "bg-pcos-mint/10",
  },
  {
    id: "diet",
    title: "Diet Personalization",
    description: "Get personalized PCOS-friendly meal plans tailored for you",
    icon: Utensils,
    color: "bg-pcos-peach",
    bgColor: "bg-pcos-peach/10",
  },
  {
    id: "exercise",
    title: "Exercise Guidance",
    description: "Discover workouts designed for PCOS symptom management",
    icon: Dumbbell,
    color: "bg-pcos-lavender",
    bgColor: "bg-pcos-lavender/10",
  },
  {
    id: "mental-health",
    title: "Mental Health Support",
    description: "Track your mood and access stress-relief resources",
    icon: Heart,
    color: "bg-pcos-coral",
    bgColor: "bg-pcos-coral/10",
  },
  {
    id: "education",
    title: "Educational Hub",
    description: "Learn about PCOS, myths vs facts, and when to seek help",
    icon: BookOpen,
    color: "bg-pcos-sky",
    bgColor: "bg-pcos-sky/10",
  },
]

export function Dashboard() {
  const { setCurrentScreen, userProfile } = useApp()

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 bg-pcos-lavender/30 rounded-full">
                <Sparkles className="w-4 h-4 text-foreground" />
                <span className="text-sm font-medium text-foreground">Welcome back</span>
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Your PCOS Dashboard
              </h1>
              <p className="text-lg text-muted-foreground">
                Track your progress and manage your wellness journey
              </p>
            </div>
            
            {userProfile.riskScore && (
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-card border border-border shadow-sm">
                <div className={`w-4 h-4 rounded-full ${
                  userProfile.riskScore === "low" ? "bg-pcos-mint" :
                  userProfile.riskScore === "medium" ? "bg-pcos-yellow" : "bg-pcos-coral"
                }`} />
                <span className="font-semibold text-foreground">
                  Risk Level: {userProfile.riskScore.charAt(0).toUpperCase() + userProfile.riskScore.slice(1)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          <Card className="border-0 shadow-sm bg-card rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-pcos-pink/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-pcos-pink" />
                </div>
                <TrendingUp className="w-5 h-5 text-pcos-mint" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">7</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-card rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-pcos-mint/20 flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-pcos-mint" />
                </div>
                <TrendingUp className="w-5 h-5 text-pcos-mint" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">12</p>
              <p className="text-sm text-muted-foreground">Meals Logged</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-card rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-pcos-lavender/20 flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-pcos-lavender" />
                </div>
                <TrendingUp className="w-5 h-5 text-pcos-mint" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">5</p>
              <p className="text-sm text-muted-foreground">Workouts</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-card rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-pcos-peach/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-pcos-peach" />
                </div>
                <span className="text-xs font-medium text-pcos-mint bg-pcos-mint/10 px-2 py-1 rounded-full">On Track</span>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">85%</p>
              <p className="text-sm text-muted-foreground">Goals Met</p>
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Explore Features</h2>
          <div className="grid grid-cols-3 gap-6">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setCurrentScreen(feature.id)}
                className={`rounded-2xl p-6 text-left transition-all hover:shadow-lg hover:-translate-y-1 relative overflow-hidden border border-border bg-card group`}
              >
                <div className={`absolute -right-6 -bottom-6 opacity-10 group-hover:opacity-20 transition-opacity`}>
                  <feature.icon className="w-32 h-32 text-foreground" />
                </div>
                
                <div className="relative">
                  <div 
                    className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4`}
                  >
                    <feature.icon className="w-7 h-7 text-foreground" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-medium text-pcos-pink">
                    Explore
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Community Card */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-pcos-pink/20 via-pcos-lavender/20 to-pcos-mint/20 rounded-2xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-pcos-mint flex items-center justify-center">
                  <Users className="w-8 h-8 text-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    Join the Community
                  </h3>
                  <p className="text-muted-foreground">
                    Connect with others on their PCOS journey, share experiences, and find support.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCurrentScreen("community")}
                className="px-6 py-3 bg-pcos-pink hover:bg-pcos-pink/90 text-foreground font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                Explore Community
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Your data is private and secure. We never share your personal health information without your explicit consent.
          </p>
        </div>
      </div>
    </div>
  )
}
