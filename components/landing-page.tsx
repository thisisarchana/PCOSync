"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  FileText,
  Utensils,
  Dumbbell,
  Heart,
  Users,
  Activity,
  Salad,
  BookOpen,
  Sparkles,
  Shield,
  ArrowRight,
} from "lucide-react"

interface LandingPageProps {
  onGetStarted: () => void
  onLogin: () => void
  onSelectTrack: (track: "diagnosed" | "at-risk") => void
}

export function LandingPage({ onGetStarted, onLogin, onSelectTrack }: LandingPageProps) {
  const diagnosedFeatures = [
    { icon: FileText, text: "AI-powered medical report analyzer" },
    { icon: Utensils, text: "Personalized diet plans based on symptoms" },
    { icon: Dumbbell, text: "PCOS-friendly exercise guidance" },
    { icon: Heart, text: "Mental health and emotional wellbeing support" },
    { icon: Users, text: "Community insights and peer sharing" },
  ]

  const atRiskFeatures = [
    { icon: Activity, text: "Symptom and lifestyle-based risk assessment" },
    { icon: Salad, text: "Preventive diet and exercise suggestions" },
    { icon: BookOpen, text: "Early awareness programs" },
    { icon: Sparkles, text: "Habit correction and proactive health tools" },
  ]

  const steps = [
    { number: "1", title: "Choose your path", description: "Diagnosed or At Risk" },
    { number: "2", title: "Create your account", description: "Or log in if returning" },
    { number: "3", title: "Get personalized insights", description: "And guidance tailored to you" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pcos-pink flex items-center justify-center">
              <Heart className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">PCOSync</span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost"
              onClick={onLogin}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Log In
            </Button>
            <Button 
              onClick={onGetStarted}
              className="px-6 py-2 text-sm font-semibold bg-pcos-pink hover:bg-pcos-pink/90 text-foreground rounded-xl"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pcos-lavender/30 rounded-full">
              <Sparkles className="w-4 h-4 text-foreground" />
              <span className="text-sm font-medium text-foreground">PCOS Care & Prevention Platform</span>
            </div>
            
            <h1 className="text-5xl font-bold text-foreground leading-tight text-balance">
              Personalized PCOS Care, From Awareness to Wellness
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-lg">
              Whether you're diagnosed with PCOS or looking to prevent it, we support you with AI-driven insights, lifestyle guidance, and community care.
            </p>

            <div className="flex items-center gap-4">
              <Button 
                onClick={onGetStarted}
                className="px-8 py-6 text-base font-semibold bg-pcos-pink hover:bg-pcos-pink/90 text-foreground rounded-2xl"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline"
                onClick={onLogin}
                className="px-8 py-6 text-base font-semibold border-border text-foreground rounded-2xl hover:bg-pcos-lavender/30 bg-transparent"
              >
                Log In
              </Button>
            </div>
          </div>

          {/* Decorative Illustration */}
          <div className="flex justify-center">
            <div className="w-full max-w-md h-80 rounded-3xl bg-gradient-to-br from-pcos-lavender/50 via-pcos-pink/30 to-pcos-mint/40 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="flex justify-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-pcos-mint/60 flex items-center justify-center">
                    <Salad className="w-8 h-8 text-foreground" />
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-pcos-pink/60 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-foreground" />
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-pcos-lavender/60 flex items-center justify-center">
                    <Dumbbell className="w-8 h-8 text-foreground" />
                  </div>
                </div>
                <p className="text-muted-foreground font-medium">Your Wellness Journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-pcos-pink mb-2">116M+</p>
              <p className="text-muted-foreground">Women affected by PCOS worldwide</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-pcos-mint mb-2">1 in 10</p>
              <p className="text-muted-foreground">Women of reproductive age have PCOS</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-pcos-lavender mb-2">70%</p>
              <p className="text-muted-foreground">Of cases remain undiagnosed globally</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-pcos-peach mb-2">50%</p>
              <p className="text-muted-foreground">Can be managed with lifestyle changes</p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How PCOSync Helps You
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine AI-powered insights with evidence-based care to provide comprehensive support for your PCOS journey.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <Card className="border-0 shadow-md bg-pcos-pink/10 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-pcos-pink/40 flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Understand Your Reports</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your medical reports and explains hormone levels, ultrasound findings, and test results in simple terms you can understand.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-pcos-mint/10 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-pcos-mint/40 flex items-center justify-center mx-auto mb-6">
                  <Utensils className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Personalized Nutrition</h3>
                <p className="text-muted-foreground">
                  Get customized diet plans based on your specific symptoms, insulin resistance levels, and food preferences to help manage PCOS naturally.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-pcos-lavender/10 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-pcos-lavender/40 flex items-center justify-center mx-auto mb-6">
                  <Dumbbell className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Tailored Exercise Plans</h3>
                <p className="text-muted-foreground">
                  Access PCOS-friendly workout routines designed to improve insulin sensitivity, manage weight, and boost your energy levels safely.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-pcos-peach/10 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-pcos-peach/40 flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Mental Wellness Support</h3>
                <p className="text-muted-foreground">
                  Track your mood, access guided meditations, and get coping strategies to manage the emotional challenges that often accompany PCOS.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-pcos-sky/10 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-pcos-sky/40 flex items-center justify-center mx-auto mb-6">
                  <Activity className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Risk Assessment</h3>
                <p className="text-muted-foreground">
                  Take our comprehensive assessment to understand your risk factors, track symptoms over time, and catch early warning signs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-pcos-coral/10 rounded-3xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-pcos-coral/40 flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Community Support</h3>
                <p className="text-muted-foreground">
                  Connect with others on the same journey. Share experiences, get advice, and find encouragement from a supportive community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* User Track Section */}
      <section className="bg-pcos-lavender/20 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Choose Your Path
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer tailored experiences based on your needs. Select the path that best describes your situation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Diagnosed Card */}
            <Card className="border-0 shadow-lg bg-card rounded-3xl overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-pcos-pink/40 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">For Diagnosed PCOS Patients</h3>
                </div>

                <ul className="space-y-4 mb-8">
                  {diagnosedFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-pcos-mint/30 flex items-center justify-center shrink-0">
                        <feature.icon className="w-5 h-5 text-foreground" />
                      </div>
                      <span className="text-muted-foreground">{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => onSelectTrack("diagnosed")}
                  className="w-full py-6 text-base font-semibold bg-pcos-pink hover:bg-pcos-pink/90 text-foreground rounded-2xl"
                >
                  Continue as Diagnosed User
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* At Risk Card */}
            <Card className="border-0 shadow-lg bg-card rounded-3xl overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-pcos-mint/40 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">For At-Risk Individuals</h3>
                </div>

                <ul className="space-y-4 mb-8">
                  {atRiskFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-pcos-lavender/40 flex items-center justify-center shrink-0">
                        <feature.icon className="w-5 h-5 text-foreground" />
                      </div>
                      <span className="text-muted-foreground">{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => onSelectTrack("at-risk")}
                  className="w-full py-6 text-base font-semibold bg-pcos-mint hover:bg-pcos-mint/90 text-foreground rounded-2xl"
                >
                  Check My Risk
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Getting started is simple. Here's how to begin your wellness journey.
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-pcos-peach/50 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-foreground">{step.number}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-muted-foreground shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pcos-cream border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pcos-pink flex items-center justify-center">
                <Heart className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">PCOSync</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Your health data is private and secure.
              </p>
            </div>

            <div className="flex gap-8 text-sm">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Use
              </button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Made with care for the PCOS community
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
