"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, ArrowLeft, Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { useApp, type UserTrack } from "@/lib/app-context"

interface AuthPageProps {
  onBack: () => void
  onSuccess: () => void
  initialTrack?: UserTrack
}

export function AuthPage({ onBack, onSuccess, initialTrack }: AuthPageProps) {
  const { setUserTrack, setIsAuthenticated, userTrack } = useApp()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState<UserTrack>(initialTrack || userTrack)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedTrack) {
      setUserTrack(selectedTrack)
    }
    setIsAuthenticated(true)
    onSuccess()
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-pcos-lavender/50 via-pcos-pink/30 to-pcos-mint/40 items-center justify-center p-12">
        <div className="max-w-md text-center space-y-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-pcos-pink flex items-center justify-center">
              <Heart className="w-7 h-7 text-foreground" />
            </div>
            <span className="text-3xl font-bold text-foreground">PCOSync</span>
          </div>
          
          <h2 className="text-3xl font-bold text-foreground leading-tight">
            Your personalized PCOS care journey starts here
          </h2>
          
          <p className="text-muted-foreground text-lg leading-relaxed">
            Get AI-driven insights, personalized diet and exercise plans, and connect with a supportive community.
          </p>

          <div className="flex justify-center gap-6 pt-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-pcos-mint/60 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-foreground">AI</span>
              </div>
              <p className="text-sm text-muted-foreground">Smart Insights</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-pcos-pink/60 flex items-center justify-center mx-auto mb-2">
                <Heart className="w-6 h-6 text-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Wellness Focus</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-pcos-lavender/60 flex items-center justify-center mx-auto mb-2">
                <User className="w-6 h-6 text-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Community</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="px-8 pt-6 pb-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Home</span>
          </button>
        </header>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
              <div className="w-10 h-10 rounded-xl bg-pcos-pink flex items-center justify-center">
                <Heart className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">PCOSync</span>
            </div>

            {/* Auth Card */}
            <Card className="border-0 shadow-lg bg-card rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                {/* Toggle */}
                <div className="flex bg-muted rounded-2xl p-1 mb-8">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${
                      isLogin 
                        ? "bg-card text-foreground shadow-sm" 
                        : "text-muted-foreground"
                    }`}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${
                      !isLogin 
                        ? "bg-card text-foreground shadow-sm" 
                        : "text-muted-foreground"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {isLogin ? "Welcome back" : "Create your account"}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {isLogin 
                    ? "Continue your wellness journey" 
                    : "Start your personalized PCOS care journey"
                  }
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name field (signup only) */}
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-foreground">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="pl-12 py-6 rounded-xl border-border bg-input text-base"
                        />
                      </div>
                    </div>
                  )}

                  {/* Email field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-12 py-6 rounded-xl border-border bg-input text-base"
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-foreground">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-12 pr-12 py-6 rounded-xl border-border bg-input text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* User Track Selection (signup only) */}
                  {!isLogin && (
                    <div className="space-y-3 pt-2">
                      <Label className="text-sm font-medium text-foreground">
                        Select your path
                      </Label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setSelectedTrack("diagnosed")}
                          className={`p-5 rounded-xl border-2 text-left transition-all ${
                            selectedTrack === "diagnosed"
                              ? "border-pcos-pink bg-pcos-pink/10"
                              : "border-border hover:border-pcos-pink/50"
                          }`}
                        >
                          <span className="font-semibold text-foreground block">Diagnosed</span>
                          <span className="text-sm text-muted-foreground">PCOS patient</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedTrack("at-risk")}
                          className={`p-5 rounded-xl border-2 text-left transition-all ${
                            selectedTrack === "at-risk"
                              ? "border-pcos-mint bg-pcos-mint/10"
                              : "border-border hover:border-pcos-mint/50"
                          }`}
                        >
                          <span className="font-semibold text-foreground block">At Risk</span>
                          <span className="text-sm text-muted-foreground">Prevention focus</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button 
                    type="submit"
                    className="w-full py-6 text-base font-semibold bg-pcos-pink hover:bg-pcos-pink/90 text-foreground rounded-2xl mt-4"
                  >
                    {isLogin ? "Log In" : "Create Account"}
                  </Button>
                </form>

                {/* Forgot Password (login only) */}
                {isLogin && (
                  <button className="w-full text-center text-sm text-muted-foreground hover:text-foreground mt-6 transition-colors">
                    Forgot your password?
                  </button>
                )}
              </CardContent>
            </Card>

            {/* Privacy note */}
            <p className="text-sm text-center text-muted-foreground mt-6">
              By continuing, you agree to our Terms of Service and Privacy Policy. Your health data is encrypted and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
