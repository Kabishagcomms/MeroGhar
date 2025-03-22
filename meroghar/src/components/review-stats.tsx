"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Users, Star, ShoppingBag, Award } from "lucide-react"

// Animation component for counting up numbers
const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
}: {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)

      // Easing function for a more natural animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <span className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Stat item component
const StatItem = ({
  icon,
  value,
  label,
  suffix = "+",
  prefix = "",
  delay = 0,
  color = "primary",
}: {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
  prefix?: string
  delay?: number
  color?: string
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className="flex flex-col items-center text-center p-6 transform transition-all duration-300 hover:scale-105">
      <div className={`mb-4 p-5 rounded-full bg-${color}/10 text-${color} shadow-lg`}>{icon}</div>
      <h3 className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        {isVisible ? (
          <AnimatedCounter end={value} suffix={suffix} prefix={prefix} />
        ) : (
          <span className="opacity-0">
            {value}
            {suffix}
          </span>
        )}
      </h3>
      <p className="text-lg font-medium">{label}</p>
    </div>
  )
}

export default function ReviewStats() {
  return (
    <div className="py-16 px-4 mx-auto bg-gradient-to-b from-background to-background/80">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Trusted by businesses worldwide
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust our products and services
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-primary/5 blur-xl"></div>
        <div className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-primary/5 blur-xl"></div>

        <div className="relative bg-card border-2 border-primary/10 rounded-2xl shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-60"></div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            <StatItem
              icon={<Users className="h-10 w-10" />}
              value={10}
              label="Trusted Customers"
              suffix="k+"
              delay={0}
            />
            <StatItem icon={<Star className="h-10 w-10" />} value={25} label="5-Star Reviews" suffix="k+" delay={200} />
            <StatItem
              icon={<ShoppingBag className="h-10 w-10" />}
              value={99}
              label="Satisfaction"
              suffix="%"
              delay={400}
            />
            <StatItem
              icon={<Award className="h-10 w-10" />}
              value={2}
              label="Years of Excellence"
              suffix="+"
              delay={600}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

