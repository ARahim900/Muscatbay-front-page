import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Droplets, Zap, Factory, ClipboardList, Package, ArrowRight } from "lucide-react"
import { muscatBayColors, gradients } from "@/lib/design-system"

export default function Home() {
  // System cards with different color schemes
  const systemCards = [
    {
      href: "/water-system",
      icon: Droplets,
      title: "Water System",
      description: "Monitor water distribution, consumption, and maintenance across the project.",
      colors: {
        bg: muscatBayColors.primary[50],
        iconBg: `${muscatBayColors.primary[500]}15`,
        iconColor: muscatBayColors.primary[500],
        text: muscatBayColors.primary[500],
        hover: muscatBayColors.primary[600]
      }
    },
    {
      href: "/electricity-system",
      icon: Zap,
      title: "Electricity System",
      description: "Track power distribution, usage patterns, and electrical infrastructure.",
      colors: {
        bg: muscatBayColors.secondary[50],
        iconBg: `${muscatBayColors.secondary[500]}15`,
        iconColor: muscatBayColors.secondary[500],
        text: muscatBayColors.secondary[500],
        hover: muscatBayColors.secondary[600]
      }
    },
    {
      href: "/stp-plant",
      icon: Factory,
      title: "STP Plant",
      description: "Manage sewage treatment operations, maintenance schedules, and performance metrics.",
      colors: {
        bg: muscatBayColors.accent[50],
        iconBg: `${muscatBayColors.accent[500]}15`,
        iconColor: muscatBayColors.accent[500],
        text: muscatBayColors.accent[500],
        hover: muscatBayColors.accent[600]
      }
    },
    {
      href: "/contractor-tracker",
      icon: ClipboardList,
      title: "Contractor Tracker",
      description: "Track contractor activities, project timelines, and performance evaluations.",
      colors: {
        bg: muscatBayColors.light[50],
        iconBg: `${muscatBayColors.light[500]}15`,
        iconColor: muscatBayColors.light[500],
        text: muscatBayColors.light[500],
        hover: muscatBayColors.light[600]
      }
    },
    {
      href: "/alm",
      icon: Package,
      title: "ALM",
      description: "Assets Lifecycle Management - Track and manage all facility assets throughout their lifecycle.",
      colors: {
        bg: muscatBayColors.neutral[50],
        iconBg: `${muscatBayColors.neutral[500]}15`,
        iconColor: muscatBayColors.neutral[500],
        text: muscatBayColors.neutral[500],
        hover: muscatBayColors.neutral[600]
      }
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Enhanced Header with brand gradient */}
      <header 
        className="sticky top-0 z-50 w-full border-b text-white shadow-lg backdrop-blur-sm"
        style={{ 
          background: `linear-gradient(90deg, ${muscatBayColors.primary[500]}95 0%, ${muscatBayColors.secondary[500]}95 50%, ${muscatBayColors.accent[500]}95 100%)`
        }}
      >
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
            <div className="relative h-10 w-10 mr-3">
              <Image
                src="/images/muscat-bay-logo-mark.png"
                alt="Muscat Bay Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-lg font-bold tracking-wide">MUSCAT BAY</span>
          </Link>
          <nav className="ml-auto flex gap-6">
            <Link href="#" className="text-sm font-medium hover:text-white/80 transition-colors sm:text-base">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-white/80 transition-colors sm:text-base">
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-white/80 transition-colors sm:text-base">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with enhanced gradient */}
        <section 
          className="w-full py-12 md:py-20 text-white relative overflow-hidden"
          style={{ background: gradients.hero }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">Muscat Bay</span>
                  </h1>
                  <p className="max-w-[600px] text-lg md:text-xl text-white/90 leading-relaxed">
                    Explore our integrated systems and track project progress through our comprehensive management portal.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href="#systems"
                    className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-semibold shadow-lg transition-all hover:bg-gray-100 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    style={{ color: muscatBayColors.primary[500] }}
                  >
                    Explore Systems
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="#about"
                    className="inline-flex h-12 items-center justify-center rounded-lg border-2 border-white bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div 
                  className="relative h-[280px] w-[280px] md:h-[320px] md:w-[320px] rounded-xl overflow-hidden flex items-center justify-center shadow-2xl"
                  style={{ background: `linear-gradient(135deg, ${muscatBayColors.primary[600]} 0%, ${muscatBayColors.accent[600]} 100%)` }}
                >
                  <Image
                    src="/images/muscat-bay-logo-mark.png"
                    alt="Muscat Bay Logo"
                    width={240}
                    height={240}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Systems Section with color palette */}
        <section id="systems" className="w-full py-16 md:py-20" style={{ backgroundColor: muscatBayColors.primary[25] }}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
              <div className="space-y-4">
                <h2 
                  className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
                  style={{ color: muscatBayColors.primary[500] }}
                >
                  Project Management Systems
                </h2>
                <p 
                  className="max-w-[900px] text-lg md:text-xl leading-relaxed"
                  style={{ color: muscatBayColors.secondary[500] }}
                >
                  Access our integrated management systems to monitor and control all aspects of the Muscat Bay project.
                </p>
              </div>
            </div>
            
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {systemCards.map((card, index) => {
                const Icon = card.icon
                return (
                  <Link
                    key={card.href}
                    href={card.href}
                    className="group relative overflow-hidden rounded-xl border-0 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                    style={{ backgroundColor: card.colors.bg }}
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div className="space-y-4">
                        <div 
                          className="inline-flex h-14 w-14 items-center justify-center rounded-xl shadow-md"
                          style={{ backgroundColor: card.colors.iconBg }}
                        >
                          <Icon className="h-7 w-7" style={{ color: card.colors.iconColor }} />
                        </div>
                        <h3 
                          className="text-xl font-bold"
                          style={{ color: card.colors.text }}
                        >
                          {card.title}
                        </h3>
                        <p 
                          className="text-sm leading-relaxed"
                          style={{ color: muscatBayColors.secondary[600] }}
                        >
                          {card.description}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center" style={{ color: card.colors.text }}>
                        <span className="text-sm font-semibold">Explore System</span>
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Enhanced About Section */}
        <section id="about" className="w-full py-16 md:py-20" style={{ backgroundColor: muscatBayColors.accent[25] }}>
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-6">
                <h2 
                  className="text-3xl font-bold tracking-tight sm:text-4xl"
                  style={{ color: muscatBayColors.primary[500] }}
                >
                  About Muscat Bay
                </h2>
                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: muscatBayColors.secondary[600] }}
                >
                  Muscat Bay is a prestigious development project that combines luxury living with sustainable
                  infrastructure. Our integrated management systems ensure efficient operation of all utilities and
                  services.
                </p>
                <div className="pt-4">
                  <Link
                    href="#"
                    className="inline-flex h-12 items-center justify-center rounded-lg px-8 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2"
                    style={{ 
                      background: `linear-gradient(135deg, ${muscatBayColors.primary[500]} 0%, ${muscatBayColors.secondary[500]} 100%)`,
                      boxShadow: `0 4px 20px ${muscatBayColors.primary[500]}30`
                    }}
                  >
                    Learn More About Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Integrated Systems",
                    description: "Our management portal provides a unified interface for all utility systems.",
                    color: muscatBayColors.primary[500]
                  },
                  {
                    title: "Real-time Monitoring",
                    description: "Access real-time data and analytics for all project components.",
                    color: muscatBayColors.accent[500]
                  },
                  {
                    title: "Contractor Management",
                    description: "Efficiently track and manage all contractor activities and performance.",
                    color: muscatBayColors.light[500]
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div 
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg shadow-md"
                      style={{ background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}80 100%)` }}
                    >
                      <ChevronRight className="h-5 w-5 text-white" />
                    </div>
                    <div className="space-y-1">
                      <h3 
                        className="text-xl font-bold"
                        style={{ color: muscatBayColors.primary[500] }}
                      >
                        {feature.title}
                      </h3>
                      <p style={{ color: muscatBayColors.secondary[600] }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="w-full py-16 md:py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <h2 
                  className="text-3xl font-bold tracking-tight sm:text-4xl"
                  style={{ color: muscatBayColors.primary[500] }}
                >
                  Get Started Today
                </h2>
                <p 
                  className="max-w-[700px] text-lg leading-relaxed"
                  style={{ color: muscatBayColors.secondary[600] }}
                >
                  Access our management systems and start monitoring your project components.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link
                  href="/login"
                  className="inline-flex h-12 items-center justify-center rounded-lg px-8 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2"
                  style={{ 
                    background: `linear-gradient(135deg, ${muscatBayColors.primary[500]} 0%, ${muscatBayColors.secondary[500]} 100%)`,
                    boxShadow: `0 4px 20px ${muscatBayColors.primary[500]}30`
                  }}
                >
                  Login to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-lg border-2 bg-transparent px-8 text-sm font-semibold shadow-sm transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2"
                  style={{ 
                    borderColor: muscatBayColors.accent[500],
                    color: muscatBayColors.accent[500]
                  }}
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Enhanced Footer */}
      <footer 
        className="w-full border-t py-8 text-white"
        style={{ background: `linear-gradient(135deg, ${muscatBayColors.primary[500]} 0%, ${muscatBayColors.secondary[500]} 100%)` }}
      >
        <div className="container flex flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8">
              <Image src="/images/muscat-bay-logo-mark.png" alt="Muscat Bay Logo" fill className="object-contain" />
            </div>
            <span className="text-sm font-bold tracking-wide">MUSCAT BAY</span>
          </div>
          <p className="text-center text-sm leading-loose text-white/80 md:text-left">
            © {new Date().getFullYear()} Muscat Bay. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm font-medium hover:text-white/80 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-white/80 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-white/80 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
