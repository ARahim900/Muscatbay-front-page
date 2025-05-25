"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  BarChart3,
  Zap,
  Recycle,
  ArrowRight,
  Building2,
  Users,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react"

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const systems = [
    {
      id: "contractor-tracker",
      title: "Contractor Tracker",
      description:
        "Monitor contractor performance, track project progress, and manage workforce analytics with real-time insights.",
      icon: <BarChart3 className="w-8 h-8" />,
      href: "/contractor-tracker",
      color: "from-blue-500 to-blue-600",
      stats: { projects: "24", contractors: "156", completion: "94%" },
      features: ["Real-time tracking", "Performance analytics", "Progress monitoring"],
    },
    {
      id: "electricity-system",
      title: "Electricity System",
      description:
        "Comprehensive electrical infrastructure monitoring with smart meter analytics and consumption tracking.",
      icon: <Zap className="w-8 h-8" />,
      href: "/electricity-system",
      color: "from-yellow-500 to-orange-500",
      stats: { meters: "342", consumption: "2.4MW", efficiency: "96%" },
      features: ["Smart metering", "Load balancing", "Energy optimization"],
    },
    {
      id: "stp-plant",
      title: "STP Plant Management",
      description:
        "Sewage treatment plant operations with equipment monitoring, performance tracking, and maintenance scheduling.",
      icon: <Recycle className="w-8 h-8" />,
      href: "/stp-plant",
      color: "from-green-500 to-emerald-600",
      stats: { capacity: "500m³", efficiency: "98%", uptime: "99.2%" },
      features: ["Equipment monitoring", "Quality control", "Predictive maintenance"],
    },
  ]

  const features = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Infrastructure Management",
      description: "Comprehensive monitoring and control of all facility systems",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Workforce Analytics",
      description: "Track contractor performance and project progress in real-time",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Performance Insights",
      description: "Advanced analytics and reporting for data-driven decisions",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime guarantee",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-time Monitoring",
      description: "Live data updates and instant alerts for critical events",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Quality Assurance",
      description: "Automated quality checks and compliance monitoring",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12">
                <Image src="/images/muscat-bay-logo-mark.png" alt="Muscat Bay Logo" fill className="object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Muscat Bay</h1>
                <p className="text-sm text-gray-600">Infrastructure Management Portal</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex space-x-6">
                <a href="#systems" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Systems
                </a>
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </a>
                <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Smart Infrastructure
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Management Platform
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Comprehensive monitoring and analytics for contractor tracking, electrical systems, and sewage treatment
              operations. Built for efficiency, designed for excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#systems"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Explore Systems
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:shadow-md transition-all duration-200"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Systems Grid */}
      <section id="systems" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Management Systems</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Integrated solutions for comprehensive infrastructure management and operational excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systems.map((system) => (
              <Link
                key={system.id}
                href={system.href}
                className="group block"
                onMouseEnter={() => setHoveredCard(system.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`
                  relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl 
                  transform transition-all duration-300 hover:scale-105 border border-gray-100
                  ${hoveredCard === system.id ? "shadow-2xl scale-105" : ""}
                `}
                >
                  {/* Gradient Header */}
                  <div className={`h-32 bg-gradient-to-r ${system.color} relative`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative p-6 h-full flex items-center justify-between">
                      <div className="text-white">{system.icon}</div>
                      <div className="text-right">
                        <ArrowRight className="w-6 h-6 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {system.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{system.description}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                      {Object.entries(system.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-gray-900">{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {system.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced capabilities designed to streamline operations and enhance decision-making
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Muscat Bay</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Muscat Bay represents the pinnacle of modern infrastructure management, combining cutting-edge technology
              with operational excellence. Our integrated platform provides real-time insights, predictive analytics,
              and comprehensive monitoring capabilities to ensure optimal performance across all facility systems.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
                <div className="text-gray-600">System Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                <div className="text-gray-600">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-gray-600">Data Points</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative w-8 h-8">
                  <Image
                    src="/images/muscat-bay-logo-mark.png"
                    alt="Muscat Bay Logo"
                    fill
                    className="object-contain brightness-0 invert"
                  />
                </div>
                <span className="text-xl font-bold">Muscat Bay</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Advanced infrastructure management platform delivering operational excellence through intelligent
                monitoring and analytics.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Systems</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/contractor-tracker" className="hover:text-white transition-colors">
                    Contractor Tracker
                  </Link>
                </li>
                <li>
                  <Link href="/electricity-system" className="hover:text-white transition-colors">
                    Electricity System
                  </Link>
                </li>
                <li>
                  <Link href="/stp-plant" className="hover:text-white transition-colors">
                    STP Plant
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Muscat Bay Infrastructure Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
