"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { BlobShape, StarBurst, CircleDecor } from "./decorative-shapes"
import { 
  ArrowLeft, 
  Users, 
  Heart,
  MessageCircle,
  Send,
  User,
  Sparkles
} from "lucide-react"

const guidelines = [
  "Be kind and supportive to fellow members",
  "Share experiences, not medical advice",
  "Respect privacy - no personal health details of others",
  "Report any harmful content to moderators",
]

export function Community() {
  const { setCurrentScreen, communityPosts, addCommunityPost } = useApp()
  const [newPost, setNewPost] = useState("")
  const [showGuidelines, setShowGuidelines] = useState(true)

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      addCommunityPost({
        author: "You",
        content: newPost.trim(),
        date: "Just now",
        likes: 0,
      })
      setNewPost("")
    }
  }

  const avatarColors = ["#FF69B4", "#00D9A0", "#FFD700", "#87CEEB", "#DDA0DD", "#FFAB76"]

  return (
    <div className="min-h-screen bg-[#FFF8DC] pb-28">
      {/* Header */}
      <div className="relative overflow-hidden px-6 pt-12 pb-6">
        <BlobShape 
          className="absolute -top-16 -right-16 w-40 h-40" 
          color="#FFAB76" 
        />
        <StarBurst 
          className="absolute top-16 right-8 w-10 h-10" 
          color="#00D9A0" 
        />
        <CircleDecor 
          className="absolute top-28 right-24 w-5 h-5" 
          color="#FF69B4" 
        />
        
        <button
          onClick={() => setCurrentScreen("dashboard")}
          className="relative inline-flex items-center gap-2 px-4 py-2 mb-4 bg-white rounded-full border-[3px] border-black font-black text-black hover:bg-[#FFD700] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-[#FFAB76] border-[3px] border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <Users className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-black text-black mb-2">
            Community
          </h1>
          <p className="text-base font-bold text-black/70 leading-relaxed">
            Connect with others on their PCOS journey
          </p>
        </div>
      </div>

      <div className="px-6">
        {/* Community Guidelines */}
        {showGuidelines && (
          <div className="bg-[#F8E8F8] rounded-3xl p-5 mb-6 border-[3px] border-black" style={{ transform: 'rotate(-0.5deg)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#DDA0DD] border-2 border-black flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-black" />
                </div>
                <span className="font-black text-black">Community Guidelines</span>
              </div>
              <button 
                onClick={() => setShowGuidelines(false)}
                className="text-xs font-bold px-3 py-1 rounded-full bg-white border-2 border-black hover:bg-[#FFD700] transition-colors"
              >
                Dismiss
              </button>
            </div>
            <ul className="space-y-2">
              {guidelines.map((guideline, index) => (
                <li key={index} className="flex items-start gap-2 text-sm font-bold text-black/70">
                  <div className="w-2 h-2 rounded-full bg-[#DDA0DD] border border-black mt-1.5 shrink-0" />
                  {guideline}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Create Post */}
        <div className="bg-white rounded-3xl p-5 mb-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-[#FF69B4] border-[3px] border-black flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-black" />
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your experience or words of encouragement..."
                className="w-full p-4 rounded-2xl bg-[#FFF8DC] border-2 border-black resize-none text-sm font-bold text-black placeholder:text-black/40 focus:ring-0 outline-none"
                rows={3}
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleSubmitPost}
                  disabled={!newPost.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#FFAB76] text-black font-black flex items-center gap-2 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#FF69B4] rounded-2xl p-4 text-center border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-2xl font-black text-black">2.5K</p>
            <p className="text-xs font-bold text-black/80">Members</p>
          </div>
          <div className="bg-[#00D9A0] rounded-2xl p-4 text-center border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-2xl font-black text-black">156</p>
            <p className="text-xs font-bold text-black/80">Posts Today</p>
          </div>
          <div className="bg-[#FFD700] rounded-2xl p-4 text-center border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-2xl font-black text-black">24/7</p>
            <p className="text-xs font-bold text-black/80">Support</p>
          </div>
        </div>

        {/* Posts Feed */}
        <h3 className="font-black text-black mb-4 text-lg">Recent Experiences</h3>
        <div className="space-y-4">
          {communityPosts.map((post, index) => (
            <div 
              key={post.id} 
              className="bg-white rounded-3xl p-5 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              style={{ transform: index % 2 === 0 ? 'rotate(-0.3deg)' : 'rotate(0.3deg)' }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div 
                  className="w-12 h-12 rounded-full border-[3px] border-black flex items-center justify-center shrink-0"
                  style={{ backgroundColor: avatarColors[index % avatarColors.length] }}
                >
                  <User className="w-6 h-6 text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-black">{post.author}</h4>
                    <span className="text-xs font-bold text-black/60">{post.date}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm font-bold text-black/70 leading-relaxed mb-4">
                {post.content}
              </p>
              
              <div className="flex items-center gap-4 pt-3 border-t-2 border-black">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold text-black bg-[#FFE4EC] border-2 border-black hover:bg-[#FF69B4] transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold text-black bg-[#E8F6FF] border-2 border-black hover:bg-[#87CEEB] transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Support Note */}
        <div className="bg-white rounded-2xl p-4 border-[3px] border-black mt-8">
          <p className="text-xs font-bold text-black/70 text-center leading-relaxed">
            This is a moderated community. All posts are reviewed to ensure a safe and supportive environment for everyone.
          </p>
        </div>
      </div>
    </div>
  )
}
