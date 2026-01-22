"use client"

import React from "react"

export function BlobShape({ className, color }: { className?: string; color: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill={color}
        stroke="#000000"
        strokeWidth="3"
        d="M47.5,-57.2C59.8,-46.3,67.1,-29.8,69.8,-12.6C72.5,4.6,70.6,22.5,62.1,36.4C53.6,50.3,38.5,60.2,22.1,65.4C5.7,70.6,-12,71.1,-27.8,65.3C-43.6,59.5,-57.5,47.5,-65.8,32.2C-74.1,16.9,-76.8,-1.7,-72.1,-18.3C-67.4,-34.9,-55.3,-49.5,-41.1,-60.1C-26.9,-70.7,-10.6,-77.3,3.9,-82C18.4,-86.7,35.2,-68.1,47.5,-57.2Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

export function StarBurst({ className, color }: { className?: string; color: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <polygon 
        points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
        fill={color}
        stroke="#000000"
        strokeWidth="2"
      />
    </svg>
  )
}

export function WaveShape({ className, color }: { className?: string; color: string }) {
  return (
    <svg
      viewBox="0 0 1440 320"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        stroke="#000000"
        strokeWidth="4"
        d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
  )
}

export function CircleDecor({ className, color }: { className?: string; color: string }) {
  return (
    <div
      className={`rounded-full border-[3px] border-black ${className}`}
      style={{ backgroundColor: color }}
    />
  )
}

export function SquiggleLine({ className, color }: { className?: string; color: string }) {
  return (
    <svg
      viewBox="0 0 200 50"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        d="M10,25 Q30,5 50,25 T90,25 T130,25 T170,25 T190,25"
      />
    </svg>
  )
}

export function FlowerShape({ className, color }: { className?: string; color: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="30" r="15" fill={color} stroke="#000" strokeWidth="2" />
      <circle cx="30" cy="50" r="15" fill={color} stroke="#000" strokeWidth="2" />
      <circle cx="70" cy="50" r="15" fill={color} stroke="#000" strokeWidth="2" />
      <circle cx="50" cy="70" r="15" fill={color} stroke="#000" strokeWidth="2" />
      <circle cx="50" cy="50" r="12" fill="#FFD700" stroke="#000" strokeWidth="2" />
    </svg>
  )
}

export function StickyNote({ className, color, children }: { className?: string; color: string; children?: React.ReactNode }) {
  return (
    <div 
      className={`relative ${className}`}
      style={{ backgroundColor: color }}
    >
      <div className="absolute inset-0 border-[3px] border-black rounded-lg" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-black/20 rounded-br-lg" />
      {children}
    </div>
  )
}

export function PillButton({ className, color, children }: { className?: string; color: string; children?: React.ReactNode }) {
  return (
    <div 
      className={`rounded-full border-[3px] border-black px-4 py-2 font-black text-black ${className}`}
      style={{ backgroundColor: color }}
    >
      {children}
    </div>
  )
}

export function IllustrativeCard({ className, color, rotate = 0 }: { className?: string; color: string; rotate?: number }) {
  return (
    <div 
      className={`rounded-3xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}
      style={{ 
        backgroundColor: color,
        transform: `rotate(${rotate}deg)`
      }}
    />
  )
}

export function DottedLine({ className }: { className?: string }) {
  return (
    <div className={`border-t-[3px] border-dashed border-black ${className}`} />
  )
}

export function Zigzag({ className, color }: { className?: string; color: string }) {
  return (
    <svg viewBox="0 0 120 30" className={className} xmlns="http://www.w3.org/2000/svg">
      <polyline 
        points="0,15 20,5 40,25 60,5 80,25 100,5 120,15"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
